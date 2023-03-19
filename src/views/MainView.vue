<template>
  <v-app-bar height="80" :elevation="1">
    <v-container>
      <v-row align="center">
        <v-col cols="auto">
          <v-img :width="220" src="../img/logo.png"></v-img>
        </v-col>
        <v-col cols="auto">
          <v-tabs color="#5E913B">
            <v-tab v-for="link in links" :key="link">
              <p class="font-weight-bold text-h6 mx-4">{{ link }}</p>
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
        <v-row>
          <v-col cols="12" class="my-1">
            <h1 class="text-center my-2 font-weight-bold" style="color:#5E913B">Daily TIP</h1>
            <v-card variant="outlined" style="border-width:2px;" class="rounded-pill">
              <v-card-text>
                <div align="center" class="font-weight-bold">{{ todayMent }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="my-10">
          <v-col cols="auto">
            <v-row>
              <v-col cols="auto">
                <v-img :width="35" height="45" src="../img/main_hot_board.png"></v-img>
              </v-col>
              <h2 class="font-weight-bold my-5" style="color:#5E913B">인기게시판</h2>
            </v-row>

            <v-sheet :height="405" :width="850" class="my-2">
              <v-divider :thickness="2" class="border-opacity-25 mb-2" length="810"></v-divider>
              <v-row>
                <v-col cols="auto">
                  <v-list v-for="popularBoard in popularBoard" :key="popularBoard">
                    <div v-if="popularBoard.independentPostType === null">
                      <p class="text-grey-darken-1">[{{ popularBoard.regionType }}·{{ popularBoard.regionPostType }}]</p>
                    </div>
                    <div v-else>
                      <p class="text-grey-darken-1">[자취·{{ popularBoard.independentPostType }}]</p>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="6">
                  <v-list v-for="popularBoard in popularBoard" :key="popularBoard">
                    <div v-if="popularBoard.title.length <= 20">
                      <v-img style="float:left" v-if="popularBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      {{ popularBoard.title }}
                    </div>
                    <div v-else>
                      <v-img style="float:left" v-if="popularBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      <p>{{ popularBoard.title.substr(0, 23) }}...</p>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="4" class="mx-4">
                  <v-list v-for="popularBoard in popularBoard" :key="popularBoard" style="overflow:hidden">
                    <v-row>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ popularBoard.commentCount }}</p>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ popularBoard.recommendCount }}</p>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/viewIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ popularBoard.views }}</p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>

          <v-col cols="auto">
            <v-sheet :height="430" :width="290" color="grey-lighten-5" class="mt-13">
              <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="auto">
                  <p class="font-weight-black py-2">실시간 인기 검색어</p>
                  <v-row>
                    <v-col cols="auto">
                      <v-list v-for="(topSearch,index) in topSearch" :key="index" style="background-color: #FAFAFA;">
                        <p class="text-subtitle-2">{{ index + 1 }}</p>
                      </v-list>
                    </v-col>
                    <v-col cols="auto">
                      <v-list v-for="index in topSearch" :key="index" style="background-color: #FAFAFA; text-emphasis-color: #FFFFFF;">
                        <div v-if="index.length <= 10">
                          <p class="text-subtitle-2">{{ index }}</p>
                        </div>
                        <div v-else>
                          <p class="text-subtitle-2">{{ index.substr(0, 10) }}...</p>
                        </div>
                      </v-list>                      
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
        
        <v-row class="mx-1">
          <v-row>
              <v-col cols="auto">
                <v-img :width="35" height="45" src="../img/main_independent_board.png"></v-img>
              </v-col>
              <h2 class="font-weight-bold my-5" style="color:#5E913B">실시간 자취 정보</h2>
          </v-row>
          <v-row>
            <v-sheet :height="220" :width="1160" class="mx-2">
              <v-divider :thickness="2" class="border-opacity-25 mb-2" length="1160"></v-divider>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="auto">
                      <v-list v-for="(independentBoard,i) in independentBoard.slice(0, 5)" :key="i">   
                        <p class="text-grey-darken-1">[{{ independentBoard.independentPostType }}]</p>
                      </v-list>
                    </v-col>
                    <v-col cols="6">
                      <v-list v-for="independentBoard in independentBoard.slice(0, 5)" :key="independentBoard">
                        <div v-if="independentBoard.title.length <= 20">
                          <v-img style="float:left" v-if="independentBoard.picture === true" :width="15"
                            src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                          {{ independentBoard.title }}
                        </div>
                        <div v-else>
                          <v-img style="float:left" v-if="independentBoard.picture === true" :width="15"
                            src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                          <p>{{ independentBoard.title.substr(0, 15) }}...</p>
                        </div>
                      </v-list>
                    </v-col>
                    <v-col cols="4" class="mx-4">
                      <v-list v-for="independentBoard in independentBoard.slice(0, 5)" :key="independentBoard" style="overflow:hidden">
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                              <p class="text-grey-darken-1 mx-1">{{ independentBoard.commentCount }}</p>
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                              <p class="text-grey-darken-1 mx-1">{{ independentBoard.recommendCount }}</p>
                            </div>
                          </v-col>
                        </v-row>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-col>        
                <v-col cols="6">
                  <v-row>
                    <v-col cols="auto">
                      <v-list v-for="(independentBoard,i) in independentBoard.slice(5, 10)" :key="i">   
                        <p class="text-grey-darken-1">[{{ independentBoard.independentPostType }}]</p>
                      </v-list>
                    </v-col>
                    <v-col cols="6">
                      <v-list v-for="independentBoard in independentBoard.slice(5, 10)" :key="independentBoard">
                        <div v-if="independentBoard.title.length <= 20">
                          <v-img style="float:left" v-if="independentBoard.picture === true" :width="15"
                            src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                          {{ independentBoard.title }}
                        </div>
                        <div v-else>
                          <v-img style="float:left" v-if="independentBoard.picture === true" :width="15"
                            src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                          <p>{{ independentBoard.title.substr(0, 15) }}...</p>
                        </div>
                      </v-list>
                    </v-col>
                    <v-col cols="4" class="mx-4">
                      <v-list v-for="independentBoard in independentBoard.slice(5, 10)" :key="independentBoard" style="overflow:hidden">
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                              <p class="text-grey-darken-1 mx-1">{{ independentBoard.commentCount }}</p>
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                              <p class="text-grey-darken-1 mx-1">{{ independentBoard.recommendCount }}</p>
                            </div>
                          </v-col>
                        </v-row>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-col>                          
              </v-row>
            </v-sheet>
          </v-row>          
        </v-row>
      </v-container>
    </v-main>
  </v-app>

  <v-footer color="#EEEEEE">
  
  </v-footer>
</template>

<script>
export default {
  name: 'BoardView',
  data() {
    return {
      links: ['메인', '게시판', '자취생활'],

      todayMent: {},
      popularBoard: [],
      independentBoard: [],
      topSearch: {},
    }
  },
  methods: {
    read() {
      this.$axios.get(/*'/posts/main'*/'https://8ec8c61d-a1b4-485e-b594-fa18587490a3.mock.pstmn.io/api/main')
        .then((res) => {
          this.todayMent = res.data.data.todayMent
          this.popularBoard = res.data.data.popularPostDtos
          this.topSearch = res.data.data.topSearch
          this.independentBoard = res.data.data.tipPostsDtos
        })
        .catch(err => console.error(err))
    }
  },
  mounted() {
    this.read();
  },
}   
</script>