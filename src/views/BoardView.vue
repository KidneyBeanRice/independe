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
              <v-tab>
                <p class="font-weight-bold text-h6 mx-4">{{ link[0] }}</p>
              </v-tab>
            </router-link>
            <v-tab>
              <p class="font-weight-bold text-h6 mx-4">{{ link[1] }}</p>
            </v-tab>
            <router-link to="/independent" style="text-decoration: none; color:black;">
              <v-tab>
                <p class="font-weight-bold text-h6 mx-4">{{ link[2] }}</p>
              </v-tab>
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

  <!--전체게시판-->
  <v-app>
    <v-main>
      <v-container>
        <div v-if="areaCheck === 0">
          <v-row class="my-3">
            <v-col cols="auto">
              <h1 class="font-weight-bold">전체게시판</h1>
            </v-col>
            <v-col>
              <router-link :to="{ params: { regionType: 'ALL', regionPostType: 'FREE' } }"
                style="text-decoration: none; color:#5E913B;">
                <v-btn size="large" variant="text" class="text-h6" style="color:#5E913B" @click=all>
                  <h4>전체</h4>
                </v-btn>
              </router-link>
              <router-link
                :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[regionCategoryCheck] } }"
                style="text-decoration: none; color:gray;">
                <v-btn size="large" variant="plain" class="text-h6" @click=region>
                  <h4>지역</h4>
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
          <v-divider :thickness="2" class="border-opacity-25 mb-2" length="1160"></v-divider>

          <v-row class="mx-1 mt-6">
            <v-sheet :height="40" :width="1150" class="mb-2 font-weight-bold" align="center" justify="center">
              <v-row>
                <v-col cols="1">시각</v-col>
                <v-col cols="6">제목</v-col>
                <v-col cols="2">작성자</v-col>
                <v-col cols="3">
                  <v-row>
                    <v-col cols="4">댓글수</v-col>
                    <v-col cols="4">추천수</v-col>
                    <v-col cols="4">조회수</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
            <v-divider :thickness="1" class="border-opacity-25 mb-3" length="1160"></v-divider>
            <v-sheet :width="1150">
              <v-list v-for="(Board, index) in Board.slice((currentPage - 1) * 20, (currentPage * 20))" :key="index"
                style="overflow:hidden; font-size:14px">
                <v-row>
                  <v-col cols="1">
                    <div v-if="$filter.formatDate(Board.createdDate) === today" align="center" justify="center">
                      {{ $filter.formatTime(Board.createdDate) }}
                    </div>
                    <div v-else align="center" justify="center">
                      {{ $filter.formatDate(Board.createdDate) }}
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div v-if="Board.title.length < 37">
                      <v-img style="float:left" v-if="Board.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="mr-1 pt-1"></v-img>
                      {{ Board.title }}
                    </div>
                    <div v-else>
                      <v-img style="float:left" v-if="Board.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="mr-1 pt-1"></v-img>
                      <p>{{ Board.title.substr(0, 37) }}...</p>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    {{ Board.nickName }}
                  </v-col>
                  <v-col cols="3">
                    <v-row>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                          <div v-if="Board.commentCount < 100000">
                            <p class="text-grey-darken-1 mx-1">{{ Board.commentCount }}</p>
                          </div>
                          <div v-else>
                            <p class="text-grey-darken-1">99999+</p>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                          <div v-if="Board.recommendCount < 100000">
                            <p class="text-grey-darken-1 mx-1">{{ Board.recommendCount }}</p>
                          </div>
                          <div v-else>
                            <p class="text-grey-darken-1">99999+</p>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/viewIcon.png" class="my-1 mx-1"></v-img>
                          <div v-if="Board.views < 100000">
                            <p class="text-grey-darken-1 mx-1">{{ Board.views }}</p>
                          </div>
                          <div v-else>
                            <p class="text-grey-darken-1">99999+</p>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider :thickness="1" class="border-opacity-25 mt-3" length="1160"></v-divider>
              </v-list>

              <v-row class="my-5" justify="center">
                <div @click="page_all">
                  <div v-if="totalPage % 20 === 0">
                    <v-pagination v-model="currentPage" :length=totalPage/20 prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right" :total-visible="10"></v-pagination>
                  </div>
                  <div v-else>
                    <v-pagination v-model="currentPage" :length=totalPage/20+1 prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right" :total-visible="10"></v-pagination>
                  </div>
                </div>
              </v-row>
            </v-sheet>
          </v-row>
        </div>

        <!--지역게시판-->
        <div v-else>
          <v-row class="my-3">
            <v-col cols="auto">
              <h1 class="font-weight-bold">지역게시판</h1>
            </v-col>
            <v-col>
              <router-link :to="{ params: { regionType: 'ALL', regionPostType: 'FREE' } }"
                style="text-decoration: none; color:gray;">
                <v-btn size="large" variant="plain" class="text-h6" @click=all>
                  <h4>전체</h4>
                </v-btn>
              </router-link>
              <router-link
                :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[regionCategoryCheck] } }"
                style="text-decoration: none; color:#5E913B;">
                <v-btn size="large" variant="text" class="text-h6" style="color:#5E913B" @click=region>
                  <h4>지역</h4>
                </v-btn>
              </router-link>
            </v-col>
          </v-row>

          <v-divider :thickness="2" class="border-opacity-25 mb-2" length="1160"></v-divider>

          <v-row class="my-5">
            <v-col cols="2" class="py-5">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" variant="text" style="color:#5E913B" width="500" class="font-weight-bold">
                    <h2>{{ regions[regionCheck] }}</h2>
                  </v-btn>
                </template>
                <router-link
                  :to="{ params: { regionType: regionsAPI[0], regionPostType: regionCategoryAPI[regionCategoryCheck] } }"
                  style="text-decoration: none; color:black;">
                  <v-btn @click="region_seoul" class="my-1 mt-3" width="175">
                    <p style="font-size:16px">{{ regions[0] }}</p>
                  </v-btn>
                </router-link>
                <router-link
                  :to="{ params: { regionType: regionsAPI[1], regionPostType: regionCategoryAPI[regionCategoryCheck] } }"
                  style="text-decoration: none; color:black;">
                  <v-btn @click="region_busan" class="my-1 mt-3" width="175">
                    <p style="font-size:16px">{{ regions[1] }}</p>
                  </v-btn>
                </router-link>
                <router-link
                  :to="{ params: { regionType: regionsAPI[2], regionPostType: regionCategoryAPI[regionCategoryCheck] } }"
                  style="text-decoration: none; color:black;">
                  <v-btn @click="region_ulsan" class="my-1 mt-3" width="175">
                    <p style="font-size:16px">{{ regions[2] }}</p>
                  </v-btn>
                </router-link>
                <router-link
                  :to="{ params: { regionType: regionsAPI[3], regionPostType: regionCategoryAPI[regionCategoryCheck] } }"
                  style="text-decoration: none; color:black;">
                  <v-btn @click="region_kyeongnam" class="my-1 mt-3" width="175">
                    <p style="font-size:16px">{{ regions[3] }}</p>
                  </v-btn>
                </router-link>
              </v-menu>
            </v-col>

            <v-col>
              <v-slide-group show-arrows>
                <v-slide-group-item>
                  <div v-if="regionCategoryCheck === 0">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[0] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2 font-weight-bold button" rounded :width="100" @click="regionCategory_talk"
                        color="#5E913B" style="color:white">
                        {{ regionCategory[0] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[0] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2" rounded :width="100" @click="regionCategory_talk" style="color:black">
                        {{ regionCategory[0] }}
                      </v-btn>
                    </router-link>
                  </div>

                  <div v-if="regionCategoryCheck === 1">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[1] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2 font-weight-bold button" rounded :width="100" @click="regionCategory_restaurant"
                        color="#5E913B" style="color:white">
                        {{ regionCategory[1] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[1] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2" rounded :width="100" @click="regionCategory_restaurant" style="color:black">
                        {{ regionCategory[1] }}
                      </v-btn>
                    </router-link>
                  </div>

                  <div v-if="regionCategoryCheck === 2">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[2] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2 font-weight-bold button" rounded :width="100" @click="regionCategory_play"
                        color="#5E913B" style="color:white">
                        {{ regionCategory[2] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[2] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2" rounded :width="100" @click="regionCategory_play" style="color:black">
                        {{ regionCategory[2] }}
                      </v-btn>
                    </router-link>
                  </div>

                  <div v-if="regionCategoryCheck === 3">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[3] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2 font-weight-bold button" rounded :width="100" @click="regionCategory_meet"
                        color="#5E913B" style="color:white">
                        {{ regionCategory[3] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[3] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2" rounded :width="100" @click="regionCategory_meet" style="color:black">
                        {{ regionCategory[3] }}
                      </v-btn>
                    </router-link>
                  </div>

                  <div v-if="regionCategoryCheck === 4">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[4] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2 font-weight-bold button" rounded :width="100" @click="regionCategory_market"
                        color="#5E913B" style="color:white">
                        {{ regionCategory[4] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[4] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2" rounded :width="100" @click="regionCategory_market" style="color:black">
                        {{ regionCategory[4] }}
                      </v-btn>
                    </router-link>
                  </div>
                </v-slide-group-item>
              </v-slide-group>
            </v-col>
          </v-row>
          <v-divider :thickness="1" class="border-opacity-25 mb-2" length="1160"></v-divider>
          <v-row class="mx-1 mt-1">
            <v-sheet  :width="1150">
              <v-row class="mx-1 mt-6">
            <v-sheet :height="40" :width="1150" class="mb-2 font-weight-bold" align="center" justify="center">
              <v-row>
                <v-col cols="1">시각</v-col>
                <v-col cols="6">제목</v-col>
                <v-col cols="2">작성자</v-col>
                <v-col cols="3">
                  <v-row>
                    <v-col cols="4">댓글수</v-col>
                    <v-col cols="4">추천수</v-col>
                    <v-col cols="4">조회수</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
            <v-divider :thickness="1" class="border-opacity-25 mb-3" length="1160"></v-divider>
            <v-sheet :width="1150">
              <v-list v-for="(Board, index) in Board.slice((currentPage - 1) * 20, (currentPage * 20))" :key="index"
                style="overflow:hidden; font-size:14px">
                <v-row>
                  <v-col cols="1">
                    <div v-if="$filter.formatDate(Board.createdDate) === today" align="center" justify="center">
                      {{ $filter.formatTime(Board.createdDate) }}
                    </div>
                    <div v-else align="center" justify="center">
                      {{ $filter.formatDate(Board.createdDate) }}
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div v-if="Board.title.length < 37">
                      <v-img style="float:left" v-if="Board.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="mr-1 pt-1"></v-img>
                      {{ Board.title }}
                    </div>
                    <div v-else>
                      <v-img style="float:left" v-if="Board.picture === true" :width="15"
                        src="../img/imagePlaceHolder.png" class="mr-1 pt-1"></v-img>
                      <p>{{ Board.title.substr(0, 37) }}...</p>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    {{ Board.nickName }}
                  </v-col>
                  <v-col cols="3">
                    <v-row>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left;" :width="15" src="../img/commentIcon.png" class="my-1 mx-1"></v-img>
                          <div v-if="Board.commentCount < 100000">
                            <p class="text-grey-darken-1 mx-1">{{ Board.commentCount }}</p>
                          </div>
                          <div v-else>
                            <p class="text-grey-darken-1">99999+</p>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/recommendIcon.png" class="my-1 mx-1"></v-img>
                          <div v-if="Board.recommendCount < 100000">
                            <p class="text-grey-darken-1 mx-1">{{ Board.recommendCount }}</p>
                          </div>
                          <div v-else>
                            <p class="text-grey-darken-1">99999+</p>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div>
                          <v-img style="float:left" :width="15" src="../img/viewIcon.png" class="my-1 mx-1"></v-img>
                          <div v-if="Board.views < 100000">
                            <p class="text-grey-darken-1 mx-1">{{ Board.views }}</p>
                          </div>
                          <div v-else>
                            <p class="text-grey-darken-1">99999+</p>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider :thickness="1" class="border-opacity-25 mt-3" length="1160"></v-divider>
              </v-list>

              <v-row class="my-5" justify="center">
                <div @click="page_region">
                  <div v-if="totalPage % 20 === 0">
                    <v-pagination v-model="currentPage" :length=totalPage/20 prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right" :total-visible="10"></v-pagination>
                  </div>
                  <div v-else>
                    <v-pagination v-model="currentPage" :length=totalPage/20+1 prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right" :total-visible="10"></v-pagination>
                  </div>
                </div>
              </v-row>
            </v-sheet>
          </v-row>
            </v-sheet>
          </v-row>
        </div>
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
  name: 'BoardView',
  data() {
    return {
      active_tab: 1,

      now: "",
      month: "",
      day: "",
      today: "",

      Board: [],

      currentPage: 1,
      totalPage: 1,

      areaCheck: 0,
      regionCheck: 0,
      regionCategoryCheck: 0,
      regions: ['서울', '부산', '울산', '경남'],
      regionCategory: ['잡담', '식당', '오락', '만남', '거래'],

      regionsAPI: ['SEOUL', 'PUSAN', 'ULSAN', 'KYEONGNAM'],
      regionCategoryAPI: ['TALK', 'RESTAURANT', 'PLAY', 'MEET', 'MARKET'],

      link: ['메인', '게시판', '자취생활'],
    }
  },
  methods: {
    all() {
      this.areaCheck = 0

      this.$axios.get(/*"/posts/region/"*/"https://9f51b12f-d360-49fc-a90e-b61d8463e86b.mock.pstmn.io/region/ALL/FREE", { params: { regionType: "ALL", regionPostType: "FREE" } })
        .then(res => {
          this.Board = res.data.data.postsDtos
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    region() {
      this.areaCheck = 1

      this.$axios.get(/*"/posts/region/"*/"https://9f51b12f-d360-49fc-a90e-b61d8463e86b.mock.pstmn.io/region/SEOUL/TALK", { params: { regionType: this.regionsAPI[this.regionCheck], regionPostType: this.regionCategoryAPI[this.regionCategoryCheck] } })
        .then(res => {
          this.Board = res.data.data.postsDtos
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    region_seoul() {
      this.regionCheck = 0

      this.$axios.get(/*"/posts/region/",*/ { params: { regionType: this.regionsAPI[0], regionPostType: this.regionCategoryAPI[this.regionCategoryCheck] } })
        .then(res => {
          this.Board = res.data.data
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    region_busan() {
      this.regionCheck = 1

      this.$axios.get(/*"/posts/region/",*/ { params: { regionType: this.regionsAPI[1], regionPostType: this.regionCategoryAPI[this.regionCategoryCheck] } })
        .then(res => {
          this.Board = res.data.data
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    region_ulsan() {
      this.regionCheck = 2

      this.$axios.get(/*"/posts/region/",*/ { params: { regionType: this.regionsAPI[2], regionPostType: this.regionCategoryAPI[this.regionCategoryCheck] } })
        .then(res => {
          this.Board = res.data.data
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    region_kyeongnam() {
      this.regionCheck = 3

      this.$axios.get(/*"/posts/region/",*/ { params: { regionType: this.regionsAPI[3], regionPostType: this.regionCategoryAPI[this.regionCategoryCheck] } })
        .then(res => {
          this.Board = res.data.data
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    regionCategory_talk() {
      this.regionCategoryCheck = 0

      this.$axios.get(/*"/posts/region/",*/ { params: { regionType: this.regionsAPI[this.regionCheck], regionPostType: this.regionCategoryAPI[0] } })
        .then(res => {
          this.Board = res.data.data
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    regionCategory_restaurant() {
      this.regionCategoryCheck = 1

      this.$axios.get(/*"/posts/region/",*/ { params: { regionType: this.regionsAPI[this.regionCheck], regionPostType: this.regionCategoryAPI[1] } })
        .then(res => {
          this.Board = res.data.data
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    regionCategory_play() {
      this.regionCategoryCheck = 2

      this.$axios.get(/*"/posts/region/",*/ { params: { regionType: this.regionsAPI[this.regionCheck], regionPostType: this.regionCategoryAPI[2] } })
        .then(res => {
          this.Board = res.data.data
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    regionCategory_meet() {
      this.regionCategoryCheck = 3

      this.$axios.get(/*"/posts/region/",*/ { params: { regionType: this.regionsAPI[this.regionCheck], regionPostType: this.regionCategoryAPI[3] } })
        .then(res => {
          this.Board = res.data.data
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    regionCategory_market() {
      this.regionCategoryCheck = 4

      this.$axios.get(/*"/posts/region/",*/ { params: { regionType: this.regionsAPI[this.regionCheck], regionPostType: this.regionCategoryAPI[4] } })
        .then(res => {
          this.Board = res.data.data
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    page_all() {
      this.$router.replace({ params: { regionType: "ALL", regionPostType: "FREE" }, query: { page: this.currentPage } })

      this.$axios.get(/*"/posts/region/"*/"https://9f51b12f-d360-49fc-a90e-b61d8463e86b.mock.pstmn.io/region/ALL/FREE", { params: { regionType: "ALL", regionPostType: "FREE" }, query: { page: this.currentPage } })
        .then(res => {
          this.totalPage = res.data.data.count

          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    page_region() {
      this.$router.replace({ params: { regionType: this.regionsAPI[this.regionCheck], regionPostType:  this.regionCategoryAPI[this.regionCategoryCheck]}, query: { page: this.currentPage } })

      this.$axios.get(/*"/posts/region/"*/"https://9f51b12f-d360-49fc-a90e-b61d8463e86b.mock.pstmn.io/region/SEOUL/TALK", { params: { regionType: this.regionsAPI[this.regionCheck], regionPostType: this.regionCategoryAPI[this.regionCategoryCheck] }, query: { page: this.currentPage }})
        .then(res => {
          this.totalPage = res.data.data.count

          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    date() {
      this.now = new Date()
      this.month = this.now.getMonth() + 1
      this.month = this.month > 9 ? this.month : `0${this.month}`;
      this.day = this.now.getDate()

      this.today = this.month + '-' + this.day
    }
  },
  mounted() {
    this.all(),
    this.date(),
    this.page_all()
  },
} 
</script>