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
            <v-tab>
              <router-link to="/" style="text-decoration: none; color:black;">
                <p class="font-weight-bold text-h6 mx-4">{{ link[0] }}</p>
              </router-link>
            </v-tab>
            <v-tab>
              <p class="font-weight-bold text-h6 mx-4">{{ link[1] }}</p>
            </v-tab>
            <v-tab>
              <router-link to="/independent" style="text-decoration: none; color:black;">
                <p class="font-weight-bold text-h6 mx-4">{{ link[2] }}</p>
              </router-link>
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

  <v-app>
    <v-main>
      <v-container>
        <div v-if="areaCheck === 0">
          <v-row class="my-3">
            <v-col cols="auto">
              <h1 class="font-weight-bold">전체게시판</h1>
            </v-col>
            <v-col>
              <v-btn size="large" variant="text" class="text-h6" style="color:#5E913B" @click=all>
                <h4>전체</h4>
              </v-btn>
              <v-btn size="large" variant="plain" class="text-h6" @click=region>
                <p>지역</p>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider :thickness="2" class="border-opacity-25 mb-2" length="1160"></v-divider>
        </div>

        <div v-else>
          <v-row class="my-3">
            <v-col cols="auto">
              <h1 class="font-weight-bold">지역게시판</h1>
            </v-col>
            <v-col>
              <v-btn size="large" variant="plain" class="text-h6" @click=all>
                <p>전체</p>
              </v-btn>
              <v-btn size="large" variant="text" class="text-h6" style="color:#5E913B" @click=region>
                <h4>지역</h4>
              </v-btn>
            </v-col>
          </v-row>

          <v-divider :thickness="2" class="border-opacity-25 mb-2" length="1160"></v-divider>

          <v-row>
            <v-col cols="2" class="py-4">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" variant="text" style="color:#5E913B" width="500" class="font-weight-bold">
                    <h2>{{ regions[regionCheck] }}</h2>
                  </v-btn>
                </template>       
                    <v-btn @click="region_seoul" class="my-1 mt-3"><p style="font-size:16px">{{ regions[0] }}</p></v-btn>
                    <v-btn @click="region_busan" class="my-1"><p style="font-size:16px">{{ regions[1] }}</p></v-btn>
                    <v-btn @click="region_ulsan" class="my-1"><p style="font-size:16px">{{ regions[2] }}</p></v-btn>
                    <v-btn @click="region_kyeongnam" class="my-1"><p style="font-size:16px">{{ regions[3] }}</p></v-btn>
              </v-menu>
            </v-col>
            
            <v-col>
              <v-slide-group show-arrows>
                <v-slide-group-item>
                  <div v-if="regionCategoryCheck === 0">
                    <v-btn class="ma-2 font-weight-bold" rounded :width="100" @click="regionCategory_talk" color="#5E913B" style="color:white">                    
                      {{ regionCategory[0] }}                                                      
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn class="ma-2" rounded :width="100" @click="regionCategory_talk">                    
                      {{ regionCategory[0] }}                                                      
                    </v-btn>
                  </div>
                  <div v-if="regionCategoryCheck === 1">
                    <v-btn class="ma-2 font-weight-bold" rounded :width="100" @click="regionCategory_restaurant" color="#5E913B" style="color:white">                    
                      {{ regionCategory[1] }}                                                      
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn class="ma-2" rounded :width="100" @click="regionCategory_restaurant">                    
                      {{ regionCategory[1] }}                                                      
                    </v-btn>
                  </div>
                  <div v-if="regionCategoryCheck === 2">
                    <v-btn class="ma-2 font-weight-bold" rounded :width="100" @click="regionCategory_play" color="#5E913B" style="color:white">                    
                      {{ regionCategory[2] }}                                                      
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn class="ma-2" rounded :width="100" @click="regionCategory_play">                    
                      {{ regionCategory[2] }}                                                      
                    </v-btn>
                  </div>
                  <div v-if="regionCategoryCheck === 3">
                    <v-btn class="ma-2 font-weight-bold" rounded :width="100" @click="regionCategory_meet" color="#5E913B" style="color:white">                    
                      {{ regionCategory[3] }}                                                      
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn class="ma-2" rounded :width="100" @click="regionCategory_meet">                    
                      {{ regionCategory[3] }}                                                      
                    </v-btn>
                  </div>
                  <div v-if="regionCategoryCheck === 4">
                    <v-btn class="ma-2 font-weight-bold" rounded :width="100" @click="regionCategory_market" color="#5E913B" style="color:white">                    
                      {{ regionCategory[4] }}                                                      
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-btn class="ma-2" rounded :width="100" @click="regionCategory_market">                    
                      {{ regionCategory[4] }}                                                      
                    </v-btn>
                  </div>
                </v-slide-group-item>
              </v-slide-group>
            </v-col>
          </v-row>
        </div>
        
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>
export default {
  name: 'BoardView',
  data() {
    return {
      active_tab: 1,

      areaCheck: 0,
      regionCheck: 0,
      regionCategoryCheck: 0,
      regions: ['서울', '부산', '울산', '경남'],
      regionCategory: ['잡담', '식당', '오락', '만남', '거래'],

      link: ['메인', '게시판', '자취생활'],
    }
  },
  methods: {
    all() {
      this.areaCheck = 0
    },
    region() {
      this.areaCheck = 1
    },

    region_seoul() { 
      this.regionCheck = 0
    },
    region_busan() {
      this.regionCheck = 1
    },
    region_ulsan() {
      this.regionCheck = 2
    },
    region_kyeongnam() {
      this.regionCheck = 3
    },

    regionCategory_talk() {
      this.regionCategoryCheck = 0
    },
    regionCategory_restaurant() {
      this.regionCategoryCheck = 1
    },
    regionCategory_play() {
      this.regionCategoryCheck = 2
    },
    regionCategory_meet() {
      this.regionCategoryCheck = 3
    },
    regionCategory_market() {
      this.regionCategoryCheck = 4
    }
  }
} 
</script>