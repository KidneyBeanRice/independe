<template>
    <v-app-bar height="80" :elevation="1">
      <v-container>
        <v-row align="center">
          <v-col cols="auto">
            <router-link to="/"><v-img :width="220" src="../img/logo.png"></v-img></router-link>
          </v-col>
          <v-col cols="auto">
            <v-tabs color="#5E913B" v-model="active_tab">
              <router-link to="/" style="text-decoration: none; color:black;">
              <v-tab>
                <p class="font-weight-bold text-h6 mx-4">{{ link[0] }}</p>
              </v-tab>
            </router-link>
            <router-link to="/board/ALL/FREE" style="text-decoration: none; color:black;">
              <v-tab>
                <p class="font-weight-bold text-h6 mx-4">{{ link[1] }}</p>
              </v-tab>
            </router-link>
              <v-tab>
                <p class="font-weight-bold text-h6 mx-4">{{ link[2] }}</p>
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="3" class="ml-11">
            <v-card-text>
              <v-text-field :loading="error" density="compact" variant="outlined" label="통합검색"
                append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="onClick"></v-text-field>
            </v-card-text>
          </v-col>
          <v-col cols="1">
            <v-btn variant="flat" color="#5E913B" class="font-weight-bold">
              <div class="text-white">로그인</div>
            </v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn variant="flat" color="#5E913B" class="font-weight-bold">
              <div class="text-white">회원가입</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'IndependentView',
    data() {
      return {
        active_tab: 2,

        link: ['메인', '게시판', '자취생활'],
      }
    },
  }   
  </script>

