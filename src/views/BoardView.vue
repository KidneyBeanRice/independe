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
        <v-row>
          <v-col cols="auto">
            <h1 class="font-weight-bold">{{ regions[regionCheck] }}게시판</h1>
          </v-col>
          <v-row align="center" class="mx-5">
            <div v-if="regionCheck === 0">
              <router-link :to="{ params: { regionType: regionsAPI[0], regionPostType: 'FREE' } }"
                style="text-decoration: none; color:#5E913B;">
                <v-btn @click="region_all" class="mt-3 text-h6" width="75" variant="text">
                  <p style="font-size:20px" class="font-weight-bold">{{ regions[0] }}</p>
                </v-btn>
              </router-link>
            </div>
            <div v-else>
              <router-link :to="{ params: { regionType: regionsAPI[0], regionPostType: 'FREE' } }"
                style="text-decoration: none; color:grey;">
                <v-btn @click="region_all" class="mt-3" width="75" variant="plain">
                  <p style="font-size:20px" class="font-weight-bold">{{ regions[0] }}</p>
                </v-btn>
              </router-link>
            </div>
            <div v-if="regionCheck === 1">
              <router-link :to="{ params: { regionType: regionsAPI[1], regionPostType: regionCategoryAPI[1] } }"
                style="text-decoration: none; color:#5E913B;">
                <v-btn @click="region_seoul" class="mt-3 text-h6" width="75" variant="text">
                  <p style="font-size:20px" class="font-weight-bold">{{ regions[1] }}</p>
                </v-btn>
              </router-link>
            </div>
            <div v-else>
              <router-link :to="{ params: { regionType: regionsAPI[1], regionPostType: regionCategoryAPI[1] } }"
                style="text-decoration: none; color:grey;">
                <v-btn @click="region_seoul" class="mt-3" width="75" variant="plain">
                  <p style="font-size:20px" class="font-weight-bold">{{ regions[1] }}</p>
                </v-btn>
              </router-link>
            </div>
            <div v-if="regionCheck === 2">
              <router-link :to="{ params: { regionType: regionsAPI[2], regionPostType: regionCategoryAPI[1] } }"
                style="text-decoration: none; color:#5E913B;">
                <v-btn @click="region_busan" class="mt-3 text-h6" width="75" variant="text">
                  <p style="font-size:20px" class="font-weight-bold">{{ regions[2] }}</p>
                </v-btn>
              </router-link>
            </div>
            <div v-else>
              <router-link :to="{ params: { regionType: regionsAPI[2], regionPostType: regionCategoryAPI[1] } }"
                style="text-decoration: none; color:grey;">
                <v-btn @click="region_busan" class="mt-3" width="75" variant="plain">
                  <p style="font-size:20px" class="font-weight-bold">{{ regions[2] }}</p>
                </v-btn>
              </router-link>
            </div>
            <div v-if="regionCheck === 3">
              <router-link :to="{ params: { regionType: regionsAPI[3], regionPostType: regionCategoryAPI[1] } }"
                style="text-decoration: none; color:#5E913B;">
                <v-btn @click="region_ulsan" class="mt-3 text-h6" width="75" variant="text">
                  <p style="font-size:20px" class="font-weight-bold">{{ regions[3] }}</p>
                </v-btn>
              </router-link>
            </div>
            <div v-else>
              <router-link :to="{ params: { regionType: regionsAPI[3], regionPostType: regionCategoryAPI[1] } }"
                style="text-decoration: none; color:grey;">
                <v-btn @click="region_ulsan" class="mt-3" width="75" variant="plain">
                  <p style="font-size:20px" class="font-weight-bold">{{ regions[3] }}</p>
                </v-btn>
              </router-link>
            </div>
            <div v-if="regionCheck === 4">
              <router-link :to="{ params: { regionType: regionsAPI[4], regionPostType: regionCategoryAPI[1] } }"
                style="text-decoration: none; color:#5E913B;">
                <v-btn @click="region_kyeongnam" class="mt-3 text-h6" width="75" variant="text">
                  <p style="font-size:20px" class="font-weight-bold">{{ regions[4] }}</p>
                </v-btn>
              </router-link>
            </div>
            <div v-else>
              <router-link :to="{ params: { regionType: regionsAPI[4], regionPostType: regionCategoryAPI[1] } }"
                style="text-decoration: none; color:grey;">
                <v-btn @click="region_kyeongnam" class="mt-3" width="75" variant="plain">
                  <p style="font-size:20px" class="font-weight-bold">{{ regions[4] }}</p>
                </v-btn>
              </router-link>
            </div>
          </v-row>
        </v-row>

        <div v-show="areaCheck === 1">
          <v-divider :thickness="1" class="border-opacity-25 my-3" length="1160"></v-divider>
        </div>

        <div v-if="areaCheck === 1">
          <v-row>
            <v-col>
              <v-slide-group show-arrows>
                <v-slide-group-item>
                  <div v-if="regionCategoryCheck === 1">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[1] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2 font-weight-bold button" rounded :width="100" @click="regionCategory_talk"
                        color="#5E913B" style="color:white">
                        {{ regionCategory[1] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[1] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2" rounded :width="100" @click="regionCategory_talk" style="color:black">
                        {{ regionCategory[1] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-if="regionCategoryCheck === 2">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[2] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2 font-weight-bold button" rounded :width="100" @click="regionCategory_restaurant"
                        color="#5E913B" style="color:white">
                        {{ regionCategory[2] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[2] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2" rounded :width="100" @click="regionCategory_restaurant" style="color:black">
                        {{ regionCategory[2] }}
                      </v-btn>
                    </router-link>
                  </div>

                  <div v-if="regionCategoryCheck === 3">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[3] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2 font-weight-bold button" rounded :width="100" @click="regionCategory_play"
                        color="#5E913B" style="color:white">
                        {{ regionCategory[3] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[3] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2" rounded :width="100" @click="regionCategory_play" style="color:black">
                        {{ regionCategory[3] }}
                      </v-btn>
                    </router-link>
                  </div>

                  <div v-if="regionCategoryCheck === 4">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[4] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2 font-weight-bold button" rounded :width="100" @click="regionCategory_meet"
                        color="#5E913B" style="color:white">
                        {{ regionCategory[4] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[4] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2" rounded :width="100" @click="regionCategory_meet" style="color:black">
                        {{ regionCategory[4] }}
                      </v-btn>
                    </router-link>
                  </div>

                  <div v-if="regionCategoryCheck === 5">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[5] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2 font-weight-bold button" rounded :width="100" @click="regionCategory_market"
                        color="#5E913B" style="color:white">
                        {{ regionCategory[5] }}
                      </v-btn>
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[5] } }"
                      style="text-decoration: none;">
                      <v-btn class="ma-2" rounded :width="100" @click="regionCategory_market" style="color:black">
                        {{ regionCategory[5] }}
                      </v-btn>
                    </router-link>
                  </div>
                </v-slide-group-item>
              </v-slide-group>
            </v-col>
          </v-row>

        </div>
        <v-divider :thickness="1" class="border-opacity-25 my-3" length="1160"></v-divider>
        <v-row class="mx-1 mt-3">
          <v-sheet :height="30" :width="1150" class="mb-2 font-weight-bold" align="center" justify="center">
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
            <v-list v-for="Board in Board" :key="Board" style="overflow:hidden; font-size:14px">
              <v-row>
                <v-col cols="1">
                  <div v-if="$filter.formatDate(Board.lastModifiedDate) === today" align="center" justify="center">
                    {{ $filter.formatTime(Board.lastModifiedDate) }}
                  </div>
                  <div v-else align="center" justify="center">
                    {{ $filter.formatDate(Board.lastModifiedDate) }}
                  </div>
                </v-col>
                <v-col cols="6">
                  <div v-if="Board.title.length < 37">
                    <v-img style="float:left" v-if="Board.picture === true" :width="15" src="../img/imagePlaceHolder.png"
                      class="mr-1 pt-1"></v-img>
                    {{ Board.title }}
                  </div>
                  <div v-else>
                    <v-img style="float:left" v-if="Board.picture === true" :width="15" src="../img/imagePlaceHolder.png"
                      class="mr-1 pt-1"></v-img>
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

              <div v-if="totalPage <= 10">
                <v-row>
                <div :key="totalPage" v-for="totalPage in totalPage" @click="currentPage = totalPage - 1, page()">
                  <router-link
                    :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[regionCategoryCheck] }, query: { page: totalPage } }"  style="text-decoration: none;">
                    <div v-if="currentPage === totalPage -1">
                      <v-btn variant="text" size="x-small" style="font-size: 14px; color:black;">{{ totalPage }}</v-btn>
                    </div>
                    <div v-else>
                      <v-btn variant="text" size="x-small" style="font-size: 14px;">{{ totalPage }}</v-btn>
                    </div>
                  </router-link>
                </div>
              </v-row>
              </div>
              <div v-else>
                <v-row>
                  <router-link
                    :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[regionCategoryCheck] }, query: { page: currentPage } }"
                    @click="page()"  style="text-decoration: none;">
                    <v-btn @click="currentPage = Math.max(currentPage - 10, 0)" :disabled="currentPage <= 1" variant="text" size="x-small"  :style="{color: currentPage <= 1 ? 'black' : ''}">&lt;</v-btn>
                  </router-link>

                  <div v-for="pageNumber in displayPageNumbers" :key="pageNumber"
                    :class="{ active: pageNumber === currentPage, 'last-page': pageNumber === displayPageNumbers[displayPageNumbers.length - 1]  }" @click="currentPage = pageNumber - 1, page()">
                    <router-link
                      :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[regionCategoryCheck] }, query: { page: pageNumber } }"  style="text-decoration: none;">
                      <div v-if="currentPage === pageNumber -1">
                        <v-btn @click="currentPage = pageNumber" variant="text" size="x-small" style="font-size: 14px; color:black">{{ pageNumber }}</v-btn>
                      </div>
                      <div v-else-if="currentPage >= totalPage">
                        <v-btn @click="currentPage = pageNumber" variant="text" size="x-small" style="font-size: 14px;" :style="{ color: pageNumber === displayPageNumbers[displayPageNumbers.length - 1] ? 'black' : '' }">{{ pageNumber }}</v-btn>

                      </div>
                      <div v-else>
                        <v-btn @click="currentPage = pageNumber" variant="text" size="x-small" style="font-size: 14px;">{{ pageNumber }}</v-btn>
                      </div>
                      
                    </router-link>
                  </div>
                  <router-link
                    :to="{ params: { regionType: regionsAPI[regionCheck], regionPostType: regionCategoryAPI[regionCategoryCheck] }, query: { page: currentPage } }" 
                    @click="page()"  style="text-decoration: none;" :style="{color: currentPage >= totalPage ? 'black' : ''}">
                    <v-btn @click="currentPage = Math.min(currentPage + 10, totalPage)"
                      :disabled="currentPage >= totalPage-1" variant="text" size="x-small" style="font-size: 14px;">&gt;</v-btn>
                  </router-link>                  
                </v-row>
              </div>
            </v-row>
          </v-sheet>          
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
  name: 'BoardView',
  data() {
    return {
      active_tab: 1,

      now: "",
      month: "",
      day: "",
      today: "",

      Board: [],

      currentPage: 0,
      totalPage: [],
      count: 1,

      areaCheck: 0,
      regionCheck: 0,
      regionCategoryCheck: 1,
      regions: ['전체', '서울', '부산', '울산', '경남'],
      regionCategory: ['자유', '잡담', '식당', '오락', '만남', '장터'],

      regionsAPI: ["ALL", 'SEOUL', 'PUSAN', 'ULSAN', 'KYEONGNAM'],
      regionCategoryAPI: ["FREE", 'TALK', 'RESTAURANT', 'PLAY', 'MEET', 'MARKET'],

      link: ['메인', '게시판', '자취생활'],
    }
  },
  computed: {
    displayPageNumbers() {
      const currentPage = this.currentPage;
      const totalPage = this.totalPage;
      const pageNumbers = [];
      let startPage = 1;
      let endPage = 10;
      let diff = totalPage - currentPage;

      if (totalPage <= 10) {
        for (let i = 1; i <= totalPage; i++) {
          pageNumbers.push(i);
        }
      } else if (diff < 5) {
        startPage = totalPage - 9;
        endPage = totalPage;
      } else if (currentPage > 5) {
        startPage = currentPage - 4;
        endPage = currentPage + 5;
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
  },
  methods: {
    region_all() {
      this.areaCheck = 0
      this.regionCheck = 0
      this.regionCategoryCheck = 0
      //const url = `/posts/region/${this.regionsAPI[0]}/${this.regionCategoryAPI[this.regionCategoryCheck]}`;

      //this.$axios.get(url, { params: { page: this.currentPage } })
      this.$axios.get('https://9f51b12f-d360-49fc-a90e-b61d8463e86b.mock.pstmn.io/region/ALL/FREE', { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
          this.totalPage = res.data.count

          this.totalPage = 200

          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1

          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    region_seoul() {
      this.areaCheck = 1
      this.regionCheck = 1
      this.regionCategoryCheck = 1
      const url = `/posts/region/${this.regionsAPI[1]}/${this.regionCategoryAPI[this.regionCategoryCheck]}`;
      this.$axios.get(url, { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
          this.totalPage = res.data.count

          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1


          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    region_busan() {
      this.areaCheck = 1
      this.regionCheck = 2
      this.regionCategoryCheck = 1
      const url = `/posts/region/${this.regionsAPI[2]}/${this.regionCategoryAPI[this.regionCategoryCheck]}`;
      this.$axios.get(url, { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
          this.totalPage = res.data.count

          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1


          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    region_ulsan() {
      this.areaCheck = 1
      this.regionCheck = 3
      this.regionCategoryCheck = 1
      const url = `/posts/region/${this.regionsAPI[3]}/${this.regionCategoryAPI[this.regionCategoryCheck]}`;
      this.$axios.get(url, { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
          this.totalPage = res.data.count

          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1


          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    region_kyeongnam() {
      this.areaCheck = 1
      this.regionCheck = 4
      this.regionCategoryCheck = 1
      const url = `/posts/region/${this.regionsAPI[4]}/${this.regionCategoryAPI[this.regionCategoryCheck]}`;
      this.$axios.get(url, { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
          this.totalPage = res.data.count

          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1

          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    regionCategory_talk() {
      this.regionCategoryCheck = 1
      const url = `/posts/region/${this.regionsAPI[this.regionCheck]}/${this.regionCategoryAPI[1]}`;
      this.$axios.get(url, { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
          this.totalPage = res.data.count

          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1

          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    regionCategory_restaurant() {
      this.regionCategoryCheck = 2
      const url = `/posts/region/${this.regionsAPI[this.regionCheck]}/${this.regionCategoryAPI[2]}`;
      this.$axios.get(url, { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
          this.totalPage = res.data.count

          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1


          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    regionCategory_play() {
      this.regionCategoryCheck = 3
      const url = `/posts/region/${this.regionsAPI[this.regionCheck]}/${this.regionCategoryAPI[3]}`;
      this.$axios.get(url, { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
          this.totalPage = res.data.count

          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1


          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    regionCategory_meet() {
      this.regionCategoryCheck = 4
      const url = `/posts/region/${this.regionsAPI[this.regionCheck]}/${this.regionCategoryAPI[4]}`;
      this.$axios.get(url, { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
          this.totalPage = res.data.count

          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1


          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    regionCategory_market() {
      this.regionCategoryCheck = 5
      const url = `/posts/region/${this.regionsAPI[this.regionCheck]}/${this.regionCategoryAPI[5]}`;
      this.$axios.get(url, { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
          this.totalPage = res.data.count

          if (this.totalPage < 10)
            this.totalPage = 1
          else if (this.totalPage % 10 === 0)
            this.totalPage = parseInt(this.totalPage / 10)
          else
            this.totalPage = parseInt(this.totalPage / 10) + 1

          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    page() {
      const url = `/posts/region/${this.regionsAPI[this.regionCheck]}/${this.regionCategoryAPI[this.regionCategoryCheck]}`;
      this.$axios.get(url, { params: { page: this.currentPage } })
        .then(res => {
          this.Board = res.data.data
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
    this.region_all(),
      this.date()
  },
} 
</script>