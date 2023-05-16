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

  <v-app>
    <v-main>
      <v-container>
        <v-row align="end">
          <v-col cols="11">
            <div v-if="Board.independentPostType === null" class="mt-5">
              <v-row>
                <v-col cols="auto">
                  <router-link
                    :to="{ name: 'BoardView', params: { regionType: Board.regionTypeEn, regionPostType: Board.regionPostTypeEn } }"
                    style="text-decoration: none; font-size:18px">
                    <div
                      @click="$store.state.boardCheck = regionsAPI.indexOf(Board.regionTypeEn), $store.state.categoryCheck = regionCategoryAPI.indexOf(Board.regionPostTypeEn)"
                      class="text-black">지역 {{ Board.regionType }}</div>
                  </router-link>
                </v-col>
                <v-col cols="auto">
                  <div class="mx-3">></div>
                </v-col>
                <v-col cols="auto">
                  <router-link
                    :to="{ name: 'BoardView', params: { regionType: Board.regionTypeEn, regionPostType: Board.regionPostTypeEn } }"
                    style="text-decoration: none; font-size:18px">
                    <div
                      @click="$store.state.boardCheck = regionsAPI.indexOf(Board.regionTypeEn), $store.state.categoryCheck = regionCategoryAPI.indexOf(Board.regionPostTypeEn)"
                      class="text-black">{{ Board.regionPostType }}</div>
                  </router-link>
                </v-col>
              </v-row>
            </div>
            <div v-else class="mt-5">
              <v-row>
                <v-col cols="auto">
                  <router-link
                    :to="{ name: 'IndependentView', params: { independentType: 'Board.independentPostTypeEn' } }"
                    style="text-decoration: none; font-size:18px">
                    <div @click="$store.state.independentCheck = independentsAPI.indexOf(Board.independentPostTypeEn)"
                      class="text-black">자취 정보</div>
                  </router-link>
                </v-col>
                <v-col cols="auto">
                  <div class="mx-3">></div>
                </v-col>
                <v-col cols="auto">
                  <router-link
                    :to="{ name: 'IndependentView', params: { independentType: 'Board.independentPostTypeEn' } }"
                    style="text-decoration: none; font-size:18px">
                    <div @click="$store.state.independentCheck = independentsAPI.indexOf(Board.independentPostTypeEn)"
                      class="text-black">{{ Board.independentPostType }}</div>
                  </router-link>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="auto" align="end">
            <v-row align="end">
              <v-img @click="copyUrl" class="ml-5" width="23" height="23" src="../img/link_copy.png"
                :style="{ cursor: 'pointer' }"></v-img>
              <v-img class="ml-5" width="23" height="23" src="../img/scrap_default.png"
                :style="{ cursor: 'pointer' }"></v-img>
            </v-row>
          </v-col>
        </v-row>
        <v-row align="end">
          <v-col cols="10">
            <div class="text-h4">{{ Board.title }}</div>
          </v-col>
          <v-col align="end">
            <div>{{ $filter.formatYear(Board.createdDate) }}-{{ $filter.formatDate(Board.createdDate) }}
              {{ $filter.formatTime(Board.createdDate) }}</div>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="3">
            <div>작성자 : {{ Board.nickname }}</div>
          </v-col>
          <v-col cols="9" align="end">
            <div style="font-size:14px">조회수 : {{ Board.views }}&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;추천수 : {{
              Board.recommendCount }}&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; 댓글수 : {{ Board.commentCount }}</div>
          </v-col>
        </v-row>

        <v-divider :thickness="1" class="border-opacity-25 mt-7" length="1180"></v-divider>

        <v-row>
          <v-col>
            <div v-for="(imageUrl, index) in imageUrls" :key="index">
              <v-row>
                <v-col class="text-center">
                  <img :src="imageUrl" alt="image" style="max-width: 100%;" />
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div id="content">{{ Board.content }}</div>
          </v-col>
        </v-row>
        <v-row class="mt-15" align="center">
          <v-col cols="auto" class="ml-3">
            <v-row>
              <v-img src="../img/post_recommend_default.png" width="30" height="30"></v-img>
              <div class="ml-2 mt-1" style="font-size:18px;">{{ Board.recommendCount }}</div>
            </v-row>
          </v-col>
          <v-col cols="auto" class="ml-5">
            <v-row>
              <v-img src="../img/post_comment.png" width="30" height="30"></v-img>
              <div class="ml-2 mt-1" style="font-size:18px;">{{ Board.commentCount }}</div>
            </v-row>
          </v-col>
          <v-col cols="auto" class="ml-auto">
            <v-img src="../img/post_report_default.png" width="35" height="35"></v-img>
          </v-col>
        </v-row>

        <v-divider :thickness="1" class="border-opacity-25 my-7" length="1180"></v-divider>

        <v-row>
          <v-col>
            <div style="font-size:16; font-weight:bold">댓글수 {{ Board.commentCount }}개</div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="11">
            <v-textarea rows="2" class="no-resize" v-model="comment" variant="outlined"
              placeholder="댓글을 작성해 보세요."></v-textarea>
          </v-col>
          <v-col>
            <v-btn variant="outlined" style="height:80px; width:75px; color:#ADADAD">등록</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="auto" class="mb-3">
            <v-row>
              <v-img class="ml-3" src="../img/bestCommend.png" width="30" height="30"></v-img>
              <div class="mt-1 ml-1" style="font-size:16; font-weight:bold">베스트댓글</div>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mb-5">
          <v-col>
            <v-sheet class="text-black" color="#F6FAF4">
              <v-row>
                <v-col cols="auto" style="color:gray">
                  <p :key="index" v-for="(bestComment, index) in Board.bestComment">
                    &nbsp;{{ bestComment.nickname }}
                  </p>
                </v-col>
                <v-col style="color:gray" cols="auto">
                  <div :key="index" v-for="(bestComment, index) in Board.bestComment">
                    {{ $filter.formatDate(bestComment.createdDate) }} {{ $filter.formatTime(bestComment.createdDate) }}
                  </div>
                </v-col>
                <v-col style="color:gray" cols="auto">
                  <div :key="index" v-for="(bestComment, index) in Board.bestComment">
                    추천수 {{ bestComment.recommendCount }}
                  </div>
                </v-col>
                <v-col cols="auto" class="ml-auto mr-2">
                  <v-row>
                    <v-img class="mt-3 mr-3" src="../img/comment_recommend.png" width="20" height="20"></v-img>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="mt-1">
                <v-col>
                  <p :key="index" v-for="(bestComment, index) in Board.bestComment">
                    &nbsp;{{ bestComment.content }}
                  </p>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <div>
          <div v-for="comment in Board.comments" :key="comment.commentId">
            <div v-if="comment.parentId === null">
              <v-divider :thickness="1" class="border-opacity-25 my-3" length="1180"
                style="border-color:lightslategray"></v-divider>
              <v-row>
                <v-col cols="auto" style="color:gray">
                  &nbsp;{{ comment.nickname }}
                </v-col>
                <v-col style="color:gray" cols="auto">
                  {{ $filter.formatDate(comment.createdDate) }} {{ $filter.formatTime(comment.createdDate) }}
                </v-col>
                <v-col style="color:gray" cols="auto">
                  <div style="color:gray">추천수 {{ comment.recommendCount }}</div>
                </v-col>
                <v-col cols="auto" class="ml-auto">
                  <v-row>
                    <v-img class="mt-3 mr-5" src="../img/comment_recommend.png" width="20" height="20"></v-img>
                    <v-img @click="toggleReply(comment.commentId)" class="mt-3 mr-5" src="../img/recomment.png" width="21"
                      height="21" :style="{ cursor: 'pointer' }"></v-img>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="mt-1">
                <v-col>
                  &nbsp;{{ comment.content }}
                </v-col>
              </v-row>
            </div>
            <!-- 댓글에 대한 대댓글 표시 -->
            <div v-for="reply in getReplies(comment.commentId)" :key="reply.commentId">
              <v-sheet class="text-black" color="#F7F7F7" :width="1170">
                <v-divider :thickness="1" class="border-opacity-25 my-3" length="1180"
                  style="border-color:lightslategray;"></v-divider>
                <v-row>
                  <v-col cols="auto" style="color:gray">
                    &emsp;&emsp;ㄴ{{ reply.nickname }}
                  </v-col>
                  <v-col style="color:gray" cols="auto">
                    {{ $filter.formatDate(reply.createdDate) }} {{ $filter.formatTime(reply.createdDate) }}
                  </v-col>
                  <v-col style="color:gray" cols="auto">
                    <div style="color:gray">추천수 {{ reply.recommendCount }}</div>
                  </v-col>
                  <v-col cols="auto" class="ml-auto">
                    <v-row>
                      <v-img class="mt-3 mr-5" src="../img/comment_recommend.png" width="20" height="20"></v-img>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row class="mt-1">
                  <v-col>
                    &emsp;&emsp;{{ reply.content }}
                  </v-col>
                </v-row>
              </v-sheet>
            </div>

            <!-- <div v-if="recommendCheck === true">
              <v-row class="mt-10">
                <v-col cols="11">
                  <v-textarea rows="1" class="no-resize" variant="outlined" placeholder="대댓글을 작성해 보세요."></v-textarea>
                </v-col>
                <v-col>
                  <v-btn variant="outlined" style="height:57px; width:75px; color:#ADADAD">등록</v-btn>
                </v-col>
              </v-row>
            </div>
          </div> -->
            <div v-if="showReply[comment.commentId]">
              <v-row class="mt-10">
                <v-col cols="11">
                  <v-textarea rows="1" class="no-resize" variant="outlined" placeholder="대댓글을 작성해 보세요."></v-textarea>
                </v-col>
                <v-col>
                  <v-btn variant="outlined" style="height:57px; width:75px; color:#ADADAD">등록</v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>

  <!--푸터-->
  <v-footer border class="mt-10">
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
  name: 'PostView',
  data() {
    return {
      active_tab: 0,
      link: ['메인', '게시판', '자취생활'],

      Board: [],
      bestComment: [],
      imageUrls: [],
      recommendCheck: false,
      showCopyText: false,
      showReply: {},
      independentsAPI: ["CLEAN", 'WASH', 'COOK', 'HEALTH', 'ETC'],
      regionsAPI: ["ALL", 'SEOUL', 'PUSAN', 'ULSAN', 'KYEONGNAM'],
      regionCategoryAPI: ["FREE", 'TALK', 'RESTAURANT', 'PLAY', 'MEET', 'MARKET'],
    }
  },
  methods: {
    read() {
      //const path = this.$route.path;
      //const pathSegments = path.split('/'); 
      //const postId = parseInt(pathSegments[2]);

      //const url = `/posts/${postId}`;
      const url = 'https://ba9fe6f7-8331-4cd6-bd3e-1323d53d8567.mock.pstmn.io/post'

      this.$axios.get(url)
        .then((res) => {
          this.Board = res.data.data
          this.bestComment = res.data.data.bestComment
          console.log(res.data)

          const base64ImageDataArray = res.data.data.files;
          const imageUrls = [];

          base64ImageDataArray.forEach((base64ImageData) => {
            const byteCharacters = atob(base64ImageData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });

            const imageUrl = URL.createObjectURL(blob);
            imageUrls.push(imageUrl);
          });

          this.imageUrls = imageUrls;
        })
        .catch(err => console.error(err))
    },
    copyUrl() {
      const url = window.location.href;
      const tempInput = document.createElement('input');
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    },
    getReplies(parentId) {
      // parentId와 일치하는 대댓글만 반환
      return this.Board.comments.filter(comment => comment.parentId === parentId);
    },
    recommend() {
      this.recommendCheck = !this.recommendCheck;
    },
    toggleReply(commentId) {
      if (this.showReply[commentId] === undefined) {
        this.showReply = Object.assign({}, this.showReply, { [commentId]: true });
      } else {
        this.showReply = Object.assign({}, this.showReply, { [commentId]: !this.showReply[commentId] });
      }
    }
  },
  mounted() {
    this.read();
  },
}   
</script>

<style>
#content {
  white-space: pre-line;
}

.no-resize ::-webkit-resizer {
  display: none;
  resize: none;
}
</style>