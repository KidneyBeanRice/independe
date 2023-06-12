<template>
    <div class="chat">
      <div class="container-1">
      <h2>채팅</h2>
  
      <ul>
        <li v-for="room in chatRooms" :key="room.chatRoomId">
          <button @click="startChat(room.receiverId)" v-if="room.receiverId != senderId">
            {{ room.receiverNickname }}와 채팅하기
          </button>
        </li>
      </ul>
  
      </div>
      <div class="container-2">
      <div v-if="memberId">
          <ul>
            <li v-for="chat in chatHistory" :key="chat.message">
              <div class = my-wrapper>
              <div :class="{'my-message': chat.senderNickname === myNickname, 'your-message': chat.senderNickname !== myNickname}">
                <ul v-if="chat.senderNickname !== myNickname">
                  <li v-for="room in chatRooms" :key="room.chatRoomId">
                      <span v-if="room.receiverId == memberId" class="receiver-nickname">{{ room.receiverNickname }}</span>
                  </li>
               </ul>
                <span class="msg">{{ chat.message }}</span>
                <span class="message-createdDate">{{ chat.createdDate }}</span>
              </div>
              </div>
            </li>
          </ul>
          <ul>
            <li v-for="message in messages" :key="message.id">
              <div class = my-wrapper>
              <div :class="{'my-message': message.senderNickname === myNickname, 'your-message': message.senderNickname !== myNickname}">
                <ul v-if="message.senderNickname !== myNickname">
                  <li v-for="room in chatRooms" :key="room.chatRoomId">
                      <span v-if="room.receiverId == memberId" class="receiver-nickname">{{ room.receiverNickname }}</span>
                  </li>
               </ul>
                <span class="msg">{{ message.message }}</span>
                <span class="message-createdDate">{{ message.createdDate }}</span>
              </div>
              </div>
            </li>
          </ul>
           <div class="input-container">
          <input type="text" class="input-field" v-model="newMessage" placeholder="메시지 입력">
          <button @click="sendMessage" class="button">전송</button>
      </div>
      </div>
      <div v-else>
        <p>사용자를 선택하세요.</p>
      </div>
      </div>
      </div>
  </template>
  
  <style>
  .chat {
  display: flex;
  flex-direction: row;
  }
  
  .container-1 {
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
  background-color: #f1f1f1;
  }
  
  .container-2 {
  flex: 4; /* 남은 공간을 모두 차지하도록 설정 */
  
  }
  ul, ol {
  list-style-type: none;
  }
  
  .my-wrapper {
  height: auto;
  overflow-y: auto;
  padding: 10px;
  }
  .my-message {
  text-align: right;
  }
  
  .your-message {
  text-align: left;
  margin-bottom: 5px;
  }
  .receiver-nickname {
  position: relative;
  left: -45px; /* 조정할 왼쪽 위치 값 */
  }
  
  .msg {
    display: inline-block;
    border-radius: 15px;
    padding: 7px 15px;
    margin-bottom: 10px;
    margin-top: 5px;
  }
  .my-message > .msg {
    background-color: #4A8522;
    color: #fff;
  }
  .your-message > .msg {
    background-color: #f1f0f0;
  }
  
  .message-createdDate {
  font-size: 0.8rem;
  color: gray;
  }
  
  .input-container {
  position: sticky;
  bottom: 0 ;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  }
  
  .input-field {
  width: 90%;
  box-sizing: border-box;
  }
  
  .button {
  flex-shrink: 0;
  width: 10%;
  height: 50px;
  background-color: #4A8522;
  color: white;
  }
  
  
  </style>
  
  <script>
  import Stomp from 'webstomp-client'
  import SockJS from 'sockjs-client'
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        members: [],
        memberId: null,
        selectedMember: null,
        messages: [],
        newMessage: '',
        stompClient: null,
        chatRoomId: null,
        myNickname: null,
        chatHistory: [],
        chatRooms: [],
      };
    },
    computed: {
    ...mapGetters(['getToken']),
    },
    mounted() {
        this.memberId = this.$route.params.memberId;
        this.findChatRoomId();
        this.loadChatHistory();
        this.selectMember();
        this.fetchChatRooms();
    },
    methods: {
      startChat(receiverId) {
        this.$router.push('/chat/' + receiverId);
        
      },
      fetchChatRooms() {
  
        axios.get('/chat/rooms', {
          headers: {
            Authorization: this.getToken,
          },
        })
          .then(response => {
            this.chatRooms = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      findChatRoomId() {
        axios.get('/chat/room', {
          params: {
            receiverId: this.memberId,
          },
          headers: {
            Authorization: this.getToken,
          },
        })
        .then(response => {
          console.log(response.data);
          this.chatRoomId = response.data.chatRoomId;
          this.myNickname = response.data.myNickname;
        })
        .catch(error => {
          console.error(error);
        });
      },
      loadChatHistory() {
        axios.get('/chat/history', {
          params: {
            receiverId: this.memberId,
          },
          headers: {
            Authorization: this.getToken,
          },
        })
        .then(response => {
          this.chatHistory = response.data;
          
        })
        .catch(error => {
          console.error(error);
        })
      },
      selectMember(member) {
        this.selectedMember = member;
  
        // STOMP 클라이언트 초기화 및 연결
        this.initStompClient();
      },
      initStompClient() {
        const socket = new SockJS('http://localhost:8080/ws')
        this.stompClient = Stomp.over(socket)
        const header = {
          Authorization: this.getToken
        };
        this.stompClient.connect(header, () => {
          console.log('STOMP 연결 성공');
          this.subscribeToPrivateMessages();
        }, (error) => {
            console.log('STOMP 연결 실패: ', error);
        });
      },
      subscribeToPrivateMessages() {
        const destination = `/user/${this.chatRoomId}/private`;
  
        this.stompClient.subscribe(destination, (message) => {
          const receivedMessage = JSON.parse(message.body);
          this.messages.push(receivedMessage);
          console.log("receive : " + receivedMessage)
        });
      },
      sendMessage() {
        const message = {
          message: this.newMessage,
          receiverId: this.memberId,
          chatRoomId: this.chatRoomId,
          senderNickname: null,
        };
        const destination = '/pub/private-message';
        const header = {
          Authorization: this.getToken
        };
  
        
        this.stompClient.send(destination, JSON.stringify(message), header);
        // 전송 후 초기화
        this.newMessage = '';
  
  
      }
    },
    beforeUnmount() {
      // 컴포넌트 해제 시 STOMP 클라이언트 연결 해제
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    }
  };
  </script>
  