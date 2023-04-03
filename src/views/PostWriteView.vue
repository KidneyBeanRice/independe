<template>
  <!--시스템 바-->
  <v-app-bar height="80" :elevation="1">
    <v-container>
      <v-row align="center">
        <v-col cols="auto">
          <router-link to="/"><v-img :width="220" src="../img/logo.png"></v-img></router-link>
        </v-col>
        <v-col cols="auto">
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

  <div>
    <div v-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 0">
      {{ setBoardCheck(0) }} {{ setCategoryCheck(0) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 1">
      {{ setBoardCheck(0) }} {{ setCategoryCheck(1) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 2">
      {{ setBoardCheck(0) }} {{ setCategoryCheck(2) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 3">
      {{ setBoardCheck(0) }} {{ setCategoryCheck(3) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 4">
      {{ setBoardCheck(0) }} {{ setCategoryCheck(4) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 0">
      {{ setBoardCheck(1) }} {{ setCategoryCheck(5) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 1">
      {{ setBoardCheck(1) }} {{ setCategoryCheck(6) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 2">
      {{ setBoardCheck(1) }} {{ setCategoryCheck(7) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 3">
      {{ setBoardCheck(1) }} {{ setCategoryCheck(8) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 4">
      {{ setBoardCheck(1) }} {{ setCategoryCheck(9) }}
    </div>
  </div>

  <v-app>
    <v-main>
      <v-container>
        <v-row>
          
        </v-row>
      </v-container>
    </v-main>
  </v-app>

  <!--푸터-->
  <v-footer border>
    <v-container>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <v-sheet height="80" width="650" align="center">
            <v-row justify="center" class="text-grey-lighten-1">
              <v-col cols="auto">
                <p>서비스 소개</p>
              </v-col>
              <v-col cols="auto">
                <p>개인정보 처리방침</p>
              </v-col>
              <v-col cols="auto">
                <p>이용약관</p>
              </v-col>
            </v-row>
            <v-row class="text-grey-lighten-2" style="font-size:12px" justify="center">
              <v-col cols="auto">
                <p>[팀] 인디펜더</p>
              </v-col>
              <v-col cols="auto">
                <p>최준혁 이용희 최성우</p>
              </v-col>
              <v-col cols="auto">
                <p>chlwnsgur1214@naver.com</p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col cols="3"> </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'PostWriteView',
  data() {
    return {
      active_tab: 0,
      link: ['메인', '게시판', '자취생활'],

      boards: ['region', 'independent'],
      categorys: [],

      boardCheck: 0,
      categoryCheck: 0
    }
  },
  methods: {
    setBoardCheck(value) {
      this.boardCheck = value;
    },
    setCategoryCheck(value) {
      this.categoryCheck = value;
    }
  },
  mounted() {

  },
}   
</script>