<template>
<v-app-bar height="80" :elevation="1">
    <v-container>
      <v-row align="center">
        <v-col cols="2">
          <router-link to="/">
            <v-img src="../img/logo.png" :style="{ 'max-height': '100px' }"></v-img>
          </router-link>
        </v-col>
        <v-col cols="5">
          <v-tabs color="#5E913B" v-model="active_tab">
            <router-link to="/" style="text-decoration: none; color:black;">
              <v-tab @click="$store.state.myGlobalVariable = 0">
                <p class="font-weight-bold text-h6 mx-4">{{ link[0] }}</p>
              </v-tab>
            </router-link>
            <router-link to="/board/ALL/FREE" style="text-decoration: none; color:black;"
              @click="$store.state.boardCheck = 0">
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-tab v-bind="props">
                    <p class="font-weight-bold text-h6 mx-4">{{ link[1] }}</p>
                  </v-tab>
                </template>
                <v-list>
                  <v-list-item align="center">
                    <router-link to="/board/ALL/FREE" style="text-decoration: none; color:black;" @click="region_all">
                      <v-list-item-title class="my-2" @click="$store.state.boardCheck = 0">자유</v-list-item-title>
                    </router-link>
                    <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                    <router-link to="/board/SEOUL/TALK" style="text-decoration: none; color:black;" @click="region_seoul">
                      <v-list-item-title class="my-2" @click="$store.state.boardCheck = 1">서울</v-list-item-title>
                    </router-link>
                    <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                    <router-link to="/board/PUSAN/TALK" style="text-decoration: none; color:black;" @click="region_busan">
                      <v-list-item-title class="my-2" @click="$store.state.boardCheck = 2">부산</v-list-item-title>
                    </router-link>
                    <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                    <router-link to="/board/ULSAN/TALK" style="text-decoration: none; color:black;" @click="region_ulsan">
                      <v-list-item-title class="my-2" @click="$store.state.boardCheck = 3">울산</v-list-item-title>
                    </router-link>
                    <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                    <router-link to="/board/KEYNONGNAM/TALK" style="text-decoration: none; color:black;"
                      @click="region_kyeongnam">
                      <v-list-item-title class="my-2" @click="$store.state.boardCheck = 4">경남</v-list-item-title>
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </router-link>
            <router-link to="/independent/CLEAN" style="text-decoration: none; color:black;"
              @click="$store.state.independentCheck = 0">
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-tab v-bind="props">
                    <p class="font-weight-bold text-h6 mx-4">{{ link[2] }}</p>
                  </v-tab>
                </template>
                <v-list>
                  <v-list-item align="center">
                    <router-link to="/independent/CLEAN" style="text-decoration: none; color:black;"
                      @click="independent_clean">
                      <v-list-item-title class="my-2" @click="$store.state.independentCheck = 0">청소</v-list-item-title>
                    </router-link>
                    <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                    <router-link to="/independent/WASH" style="text-decoration: none; color:black;"
                      @click="independent_wash">
                      <v-list-item-title class="my-2" @click="$store.state.independentCheck = 1">세탁</v-list-item-title>
                    </router-link>
                    <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                    <router-link to="/independent/COOK" style="text-decoration: none; color:black;"
                      @click="independent_cook">
                      <v-list-item-title class="my-2" @click="$store.state.independentCheck = 2">요리</v-list-item-title>
                    </router-link>
                    <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                    <router-link to="/independent/HEALTH" style="text-decoration: none; color:black;"
                      @click="independent_health">
                      <v-list-item-title class="my-2" @click="$store.state.independentCheck = 3">건강</v-list-item-title>
                    </router-link>
                    <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                    <router-link to="/independent/ETC" style="text-decoration: none; color:black;"
                      @click="independent_etc">
                      <v-list-item-title class="my-2" @click="$store.state.independentCheck = 4">기타</v-list-item-title>
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </router-link>
          </v-tabs>
        </v-col>
        <v-col cols="3">
          <v-card-text>
            <v-text-field v-model="searchText" :loading="error" density="compact" variant="outlined" label="통합검색"
              append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="totalSearch"
              @keydown.enter="totalSearch"></v-text-field>
          </v-card-text>
        </v-col>
        <v-col cols="1" v-if="!getToken">
          <router-link to="/login">
            <v-btn variant="flat" color="#5E913B" class="font-weight-bold" style="width:100%; height:40px">
              <div class="text-white">로그인</div>
            </v-btn>
          </router-link>
        </v-col>
        <v-col cols="1" v-if="!getToken">
          <router-link to="/signup">
            <v-btn variant="flat" color="#5E913B" class="font-weight-bold" style="width:100%; height:40px">
              <div class="text-white">회원가입</div>
            </v-btn>
          </router-link>
        </v-col>
        <v-col cols="2" v-if="getToken">

          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-row align="center" justify="end">
                <v-btn v-bind="props" class="font-weight-bold mr-3" variant="tonal" color="green-lighten-1">
                  <v-img :height="25" :width="25" src="../img/user.png" style="color:#2E471D"></v-img>
                  <span style="color: #5E913B;" class="font-weight-bold">{{ userNickName }}</span>
                </v-btn>
              </v-row>
            </template>
            <v-card :height="showLocationAuthentication ? 400 : 275" :width="250">
              <v-list>
                <v-list-item style="text-align: center;">
                  <v-row class="mt-1" style="cursor: pointer;">
                    <v-col cols=1></v-col>
                    <v-col cols="auto">
                      <v-img :height="25" :width="25" src="../img/infomation.png" class=""></v-img>
                    </v-col>
                    <v-col cols="2"></v-col>
                    <v-col cols="auto">
                      <v-list-item-title style="font-size:18px" class="font-weight-bold">내 정보</v-list-item-title>
                    </v-col>
                  </v-row>
                  <v-divider :thickness="1" class="border-opacity-25 my-5"></v-divider>
                  <v-row style="cursor: pointer;">
                    <v-col cols=1></v-col>
                    <v-col cols="auto">
                      <v-img :height="25" :width="25" src="../img/chatting.png" class=""></v-img>
                    </v-col>
                    <v-col cols="2"></v-col>
                    <v-col cols="auto">
                      <router-link :to="`/chatRooms`" style="text-decoration: none; color:black;">
                        <v-list-item-title style="font-size:18px" class="font-weight-bold">채팅</v-list-item-title>
                      </router-link>
                    </v-col>
                  </v-row>
                  <v-divider :thickness="1" class="border-opacity-25 my-5"></v-divider>
                  <v-row @click="showLocationAuthentication = !showLocationAuthentication" style="cursor: pointer;"
                    class="mb-3">
                    <v-col cols=1></v-col>
                    <v-col cols="auto">
                      <v-img :height="25" :width="25" src="../img/location.png" class=""></v-img>
                    </v-col>
                    <v-col cols="2"></v-col>
                    <v-col cols="auto">
                      <v-list-item-title style="font-size:18px" class="font-weight-bold">위치인증</v-list-item-title>
                    </v-col>
                  </v-row>

                  <v-row v-if="showLocationAuthentication">
                    <v-col cols="12">
                      <v-sheet>
                        <div style="text-align:center; color: gray; font-size:14px" class="font-weight-bold mb-1">현재위치불러오기
                        </div>
                        <v-row>
                          <v-col cols="auto">
                            <v-switch class="ml-3" color="success" v-model="boolAuthentication"
                              @change="toggleLocationAuthentication"></v-switch>
                          </v-col>
                          <v-col cols="auto" align="end" justify="end">
                            <div v-if="$store.state.locationAuthentication">
                              <div class="mt-4 font-weight-bold">현재위치 : <span style="color: #5E913B">{{
                                $store.state.currentLocation }}</span></div>
                            </div>
                            <div v-else>
                              <div class="mt-4 font-weight-bold">현재위치 : <span style="color: #5E913B">인증필요</span></div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-sheet>
                    </v-col>
                  </v-row>

                  <v-divider :thickness="1" class="border-opacity-25 mb-5"></v-divider>
                  <v-row style="cursor: pointer;">
                    <v-col cols=1></v-col>
                    <v-col cols="auto">
                      <v-img :height="25" :width="25" src="../img/logout.png" class=""></v-img>
                    </v-col>
                    <v-col cols="2"></v-col>
                    <v-col cols="auto">
                      <v-list-item-title @click="handleLogout" style="font-size:18px"
                        class="font-weight-bold">로그아웃</v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

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
                <span class="message-createdDate">{{ $filter.formatYear(chat.createdDate) }}-{{ $filter.formatDate(chat.createdDate) }} {{ $filter.formatTime(chat.createdDate) }}</span>
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
        active_tab: 0,
      link: ['메인', '게시판', '자취생활'],

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
  