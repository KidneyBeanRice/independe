<template>
  <!--시스템 바-->
  <v-app-bar height="80" :elevation="1">
    <v-container>
      <v-row align="center">
        <v-col cols="auto">
          <v-img :width="220" src="../img/logo.png"></v-img>
        </v-col>
        <v-col cols="auto">
          <v-tabs color="#5E913B">
            <v-tab>
              <p class="font-weight-bold text-h6 mx-4">{{ link[0] }}</p>
            </v-tab>
            <v-tab>
              <p class="font-weight-bold text-h6 mx-4">{{ link[1] }}</p>
            </v-tab>
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

  <v-app>
    <v-main>
      <v-container>
        <!-- 오늘의 멘트 -->
        <v-row>
          <v-col cols="12" class="my-1">
            <h1 class="text-center my-2 font-weight-bold" style="color:#5E913B">Daily TIP</h1>
            <v-card variant="outlined" style="border-width:2px;" class="rounded-pill">
              <v-card-text>
                <div align="center" class="font-weight-bold text-h6">{{ todayMent }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="my-10">
          <!--인기 게시판-->
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
                    <div v-if="popularBoard.title.length <= 23">
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

          <!--실시간 검색어-->
          <v-col cols="auto">
            <v-sheet :height="430" :width="290" color="grey-lighten-5" class="mt-13">
              <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="auto">
                  <p class="font-weight-black py-2">실시간 인기 검색어</p>
                  <v-row>
                    <v-col cols="auto">
                      <v-list v-for="(topSearch, index) in topSearch" :key="index" style="background-color: #FAFAFA;">
                        <p class="text-subtitle-2">{{ index + 1 }}</p>
                      </v-list>
                    </v-col>
                    <v-col cols="auto">
                      <v-list v-for="index in topSearch" :key="index"
                        style="background-color: #FAFAFA; text-emphasis-color: #FFFFFF;">
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

        <!--실시간 자취 게시판-->
        <v-row class="mx-1">
          <v-row>
            <v-col cols="11">
              <v-row>
                <v-col cols="auto">
                  <v-img :width="35" height="45" src="../img/main_independent_board.png"></v-img>
                </v-col>
                <h2 class="font-weight-bold my-5" style="color:#5E913B">실시간 자취 정보</h2>
              </v-row>
            </v-col>
            <v-col cols="1">
              <div class="mt-5 text-subtitle-2 ">더보기 ></div>
            </v-col>
          </v-row>
          <v-row>
            <v-sheet :height="220" :width="1160" class="mx-2">
              <v-divider :thickness="2" class="border-opacity-25 mb-2" length="1160"></v-divider>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="auto">
                      <v-list v-for="independentBoard in independentBoard.slice(0, 5)" :key="independentBoard">
                        <p class="text-grey-darken-1">[{{ independentBoard.independentPostType }}]</p>
                      </v-list>
                    </v-col>
                    <v-col cols="6">
                      <v-list v-for="independentBoard in independentBoard.slice(0, 5)" :key="independentBoard">
                        <div v-if="independentBoard.title.length <= 15">
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
                      <v-list v-for="independentBoard in independentBoard.slice(0, 5)" :key="independentBoard"
                        style="overflow:hidden">
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left;" :width="15" src="../img/commentIcon.png"
                                class="my-1 mx-1"></v-img>
                              <p class="text-grey-darken-1 mx-1">{{ independentBoard.commentCount }}</p>
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left" :width="15" src="../img/recommendIcon.png"
                                class="my-1 mx-1"></v-img>
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
                      <v-list v-for="independentBoard in independentBoard.slice(5, 10)" :key="independentBoard">
                        <p class="text-grey-darken-1">[{{ independentBoard.independentPostType }}]</p>
                      </v-list>
                    </v-col>
                    <v-col cols="6">
                      <v-list v-for="independentBoard in independentBoard.slice(5, 10)" :key="independentBoard">
                        <div v-if="independentBoard.title.length <= 15">
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
                      <v-list v-for="independentBoard in independentBoard.slice(5, 10)" :key="independentBoard"
                        style="overflow:hidden">
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left;" :width="15" src="../img/commentIcon.png"
                                class="my-1 mx-1"></v-img>
                              <p class="text-grey-darken-1 mx-1">{{ independentBoard.commentCount }}</p>
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div>
                              <v-img style="float:left" :width="15" src="../img/recommendIcon.png"
                                class="my-1 mx-1"></v-img>
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

        <v-row class="my-15">
          <!--실시간 전체 게시판-->
          <v-col cols="6">
            <v-row>
              <v-col cols="10">
                <v-row>
                  <v-col cols="auto">
                    <v-img :width="35" height="45" src="../img/main_all_board.png"></v-img>
                  </v-col>
                  <h2 class="font-weight-bold my-5" style="color:#5E913B">실시간 전체 게시판</h2>
                </v-row>
              </v-col>
              <v-col cols="2">
                <div class="mt-5 text-subtitle-2">더보기 ></div>
              </v-col>
              <v-divider :thickness="2" class="border-opacity-25 mb-2 mx-3" length="560"></v-divider>
            </v-row>
            <v-sheet :height="220" :width="580">
              <v-row>
                <v-col cols="auto">
                  <v-list v-for="allBoard in allBoard" :key="allBoard">
                    <p class="text-grey-darken-1">[자유]</p>
                  </v-list>
                </v-col>
                <v-col cols="6">
                  <v-list v-for="allBoard in allBoard" :key="allBoard">
                    <div v-if="allBoard.title.length <= 15">
                      <v-img style="float:left" v-if="allBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      {{ allBoard.title }}
                    </div>
                    <div v-else>
                      <v-img style="float:left" v-if="allBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      <p>{{ allBoard.title.substr(0, 15) }}...</p>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="4" class="mx-4">
                  <v-list v-for="allBoard in allBoard" :key="allBoard" style="overflow:hidden">
                    <v-row>
                      <v-col cols="6">
                        <div>
                          <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ allBoard.commentCount }}</p>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ allBoard.recommendCount }}</p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>

          <!--실시간 지역 게시판-->
          <v-col cols="6">
            <v-row>
              <v-col cols="10">
                <v-row>
                  <v-col cols="auto">
                    <v-img :width="35" height="45" src="../img/main_region_board.png"></v-img>
                  </v-col>
                  <h2 class="font-weight-bold my-5" style="color:#5E913B">실시간 지역 게시판</h2>
                </v-row>
              </v-col>
              <v-col cols="2">
                <div class="mt-5 text-subtitle-2">더보기 ></div>
              </v-col>
              <v-divider :thickness="2" class="border-opacity-25 mb-2 mx-3" length="560"></v-divider>
            </v-row>
            <v-sheet :height="220" :width="580">
              <v-row>
                <v-col cols="auto">
                  <v-list v-for="regionBoard in regionBoard" :key="regionBoard">
                    <p class="text-grey-darken-1">[{{ regionBoard.regionType }}·{{ regionBoard.regionPostType }}]</p>
                  </v-list>
                </v-col>
                <v-col cols="5">
                  <v-list v-for="regionBoard in regionBoard" :key="regionBoard">
                    <div v-if="regionBoard.title.length <= 12">
                      <v-img style="float:left" v-if="regionBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      {{ regionBoard.title }}
                    </div>
                    <div v-else>
                      <v-img style="float:left" v-if="regionBoard.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="my-1 mr-1"></v-img>
                      <p>{{ regionBoard.title.substr(0, 12) }}...</p>
                    </div>
                  </v-list>
                </v-col>
                <v-col cols="4" class="ml-6">
                  <v-list v-for="regionBoard in regionBoard" :key="regionBoard" style="overflow:hidden">
                    <v-row>
                      <v-col cols="6">
                        <div>
                          <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ regionBoard.commentCount }}</p>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                          <p class="text-grey-darken-1 mx-1">{{ regionBoard.recommendCount }}</p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>

  <v-footer>

  </v-footer>
</template>

<script>
export default {
  name: 'BoardView',
  data() {
    return {
      link: ['메인', '게시판', '자취생활'],

      todayMent: [],
      popularBoard: [],
      independentBoard: [],
      allBoard: [],
      regionBoard: [],
      topSearch: [],
    }
  },
  methods: {
    read() {
      this.$axios.get(/*'/posts/main'*/'https://8ec8c61d-a1b4-485e-b594-fa18587490a3.mock.pstmn.io/api/main')
        .then((res) => {
          this.todayMent = res.data.data.todayMent
          this.popularBoard = res.data.data.popularPostDtos
          this.independentBoard = res.data.data.tipPostsDtos
          this.allBoard = res.data.data.regionAllPostDtos
          this.regionBoard = res.data.data.regionNotAllPostDtos
          this.topSearch = res.data.data.topSearch
        })
        .catch(err => console.error(err))
    }
  },
  mounted() {
    this.read();
  },
}   
</script>