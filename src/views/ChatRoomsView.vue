<template>
    <div>
      <h1>Chat Rooms</h1>
      <ul>
        <li v-for="room in chatRooms" :key="room.chatRoomId">
          <router-view :key="$route.fullPath"/>
          <router-link :to="'/chat/' + room.receiverId">{{ room.receiverNickname }} 과 채팅하기 </router-link>
        </li>
      </ul>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        chatRooms: [],
      };
    },
    computed: {
    ...mapGetters(['getToken']),
    },
    mounted() {
      this.fetchChatRooms();
    },
    methods: {
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
    },
  };
  </script>
  