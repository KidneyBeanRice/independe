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
      {{ setBoardCheck(0) }} {{ setTypeCheck(0) }} {{ setBoardNameCheck(0) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 1">
      {{ setBoardCheck(0) }} {{ setTypeCheck(1) }} {{ setBoardNameCheck(1) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 2">
      {{ setBoardCheck(0) }} {{ setTypeCheck(2) }} {{ setBoardNameCheck(2) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 3">
      {{ setBoardCheck(0) }} {{ setTypeCheck(3) }} {{ setBoardNameCheck(3) }}
    </div>
    <div v-else-if="$store.state.independentCheck === 5 && $store.state.boardCheck === 4">
      {{ setBoardCheck(0) }} {{ setTypeCheck(4) }} {{ setBoardNameCheck(4) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 0">
      {{ setBoardCheck(1) }} {{ setTypeCheck(0) }} {{ setBoardNameCheck(5) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 1">
      {{ setBoardCheck(1) }} {{ setTypeCheck(1) }} {{ setBoardNameCheck(6) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 2">
      {{ setBoardCheck(1) }} {{ setTypeCheck(2) }} {{ setBoardNameCheck(7) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 3">
      {{ setBoardCheck(1) }} {{ setTypeCheck(3) }} {{ setBoardNameCheck(8) }}
    </div>
    <div v-else-if="$store.state.boardCheck === 5 && $store.state.independentCheck === 4">
      {{ setBoardCheck(1) }} {{ setTypeCheck(4) }} {{ setBoardNameCheck(9) }}
    </div>
  </div>

  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center" class="mt-2">
          <v-sheet :width="900">
            <v-row>
              <v-col cols="auto" class="mt-1">
                <v-img :width="30" height="30" src="../img/board_write.png"></v-img>
              </v-col>
              <v-col cols="2" class="mt-1">
                <p class="font-weight-bold text-h5"> {{ boardName[boardNameCheck] }}</p>
              </v-col>
            </v-row>
            <v-row>
              <div v-if="boardCheck === 0 && typeCheck !== 0">
                <v-col cols="auto">
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn style="height: 55px; color:#A9A9A9" v-bind="props" variant="outlined">
                        <p style="font-size:16px; color:black">{{ category[categoryCheck] }} ▽</p>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item style="text-align: center;">
                        <v-list-item-title @click="categoryCheck = 0" class="my-2">잡담</v-list-item-title>
                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                        <v-list-item-title @click="categoryCheck = 1" class="my-2">식당</v-list-item-title>
                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                        <v-list-item-title @click="categoryCheck = 2" class="my-2">오락</v-list-item-title>
                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                        <v-list-item-title @click="categoryCheck = 3" class="my-2">만남</v-list-item-title>
                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                        <v-list-item-title @click="categoryCheck = 4" class="my-2">거래</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </div>
              <v-col>
                <v-text-field v-model="title" variant="outlined" placeholder="제목을 입력해주세요"></v-text-field>
              </v-col>
            </v-row>
            <v-textarea class="no-resize" rows="20" variant="outlined" v-model="content" placeholder="- 게시판 카테고리에 맞지 않는 글은 숨김 처리 될수도 있음을 알려드립니다.
- 다른 유저로 부터 일정 수 이상의 신고를 받으면 글은 숨김 처리 될수도 있음을 알려드립니다.
- 욕설이나 시비, 분쟁과 관련된 글과 불쾌감을 주는 글은 규칙 위반입니다.
- 범죄, 불법 행위의 글과 음란물과 관련한 글은 규칙 위반입니다.
- 매너있는 게시판 이용 부탁드립니다.">
            </v-textarea>

            <div>
              <!--<input type="file" ref="fileInput" v-on:change="previewImage">-->
              <v-row>
                <v-col cols="7">
                  <v-file-input multiple variant="outlined" prepend-icon="mdi-camera" ref="fileInput"
                    v-on:change="previewImage" accept="video/*,image/*" label="이미지를 첨부하세요"></v-file-input>
                </v-col>
                <v-col align="end">
                  <v-btn style="height:55px; width: 100px;" class="mr-5" @click="cancle">
                    <div style="font-size:16px">취소</div>
                  </v-btn>
                  <v-btn @click="write" style="height:55px; width: 100px;" variant="flat" color="#5E913B"
                    class="font-weight-bold">
                    <div class="text-white" style="font-size:16px">글 등록</div>
                  </v-btn>
                </v-col>
              </v-row>

              <v-sheet v-if="imageCheck !== 0" border width="900" style="border-color:#B0B0B0; border-radius: 5px;">                
                <v-row>
                  <v-col v-for="(url, index) in imageUrl" :key="index" cols="auto" align="center">
                    <v-col justify="center">
                      <v-sheet border width="136" style="border-color:#B0B0B0; border-radius: 5px;">
                        <v-img :src="url" height="100" width="100" class="mt-1"></v-img>
                        <v-btn @click="deleteImage(index)" class="my-1" variant="text">이미지 삭제</v-btn>
                      </v-sheet>
                    </v-col>
                  </v-col>
                </v-row>
                <p align="center" class="my-1" style="color:#A9A9A9">이미지는 최대 10개 까지 업로드 할 수 있습니다.</p>
              </v-sheet>
            </div>
          </v-sheet>
        </v-row>        
      </v-container>
    </v-main>
  </v-app>

  <!--푸터-->
  <v-footer border class="mt-5">
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
      regions: ['ALL', 'SEOUL', 'PUSAN', 'ULSAN', 'KYEONGNAM'],
      regionsPost: ['FREE', 'TALK', 'RESTAURANT', 'PLAY', 'MEET', 'MARKET'],      
      independents: ['CLEAN', 'WASH', 'PLAY', 'MEET', 'MARKET'],

      boardName: ['자유게시판', '서울 이야기', '부산 이야기', '울산 이야기', '경남 이야기', '청소 정보', '세탁 정보', '요리 정보', '건강 정보', '기타 정보'],
      category: ['잡담', '식당', '오락', '만남', '거래'],

      title: '',
      content: '',

      boardCheck: 0,
      categoryCheck: 0,
      boardNameCheck: 0,
      typeCheck: 0,
      imageCheck: 0,

      imageUrl: [],
      imageFiles: [],
      limit: 10
    }
  },
  methods: {
    setBoardCheck(value) {
      this.boardCheck = value;
    },
    setTypeCheck(value) {
      this.typeCheck = value;
    },
    setBoardNameCheck(value) {
      this.boardNameCheck = value;
    },
    previewImage() {
      const files = this.$refs.fileInput.files
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
          if (this.imageFiles.length < this.limit) { // 이미지 파일 제한 개수 체크
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              this.imageUrl.push(reader.result)
              this.imageFiles.push(file)
              this.imageCheck = this.imageCheck + 1
            }
          }
        }
      }
    },
    write() {
      const formData = new FormData()

      formData.append('title', this.title)
      formData.append('content', this.content)      

      if (this.boardCheck === 0) {
        formData.append('regionType', this.regions[this.typeCheck])
        if (this.typeCheck === 0)
          formData.append('regionPostType', this.regionsPost[0])
        else 
          formData.append('regionPostType', this.regionsPost[this.categoryCheck + 1])
      }
      else if (this.boardCheck === 1)
        formData.append('independentPostType', this.independents[this.typeCheck])
      
      for (let i = 0; i < this.imageFiles.length; i++) 
        formData.append('files', this.imageFiles[i])
              
      if (this.boardCheck === 0)
        this.$axios.post("/posts/region/new", formData, { headers: {'Content-Type': 'multipart/form-data'}})
          .then(res => {
            console.log(res.data);
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error);
          });
      else if (this.boardCheck === 1)
        this.$axios.post("/posts/independent/new", formData, { headers: {'Content-Type': 'multipart/form-data'}})
          .then(res => {
            console.log(res.data);
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error);
          });          
    },
    deleteImage(index) {
      this.imageUrl.splice(index, 1)
      this.imageFiles.splice(index, 1)  
      this.imageCheck -= 1      
    },
    cancle() {
      this.$router.go(-1)
    }
  },
  mounted() {
    if (this.boardCheck === 0)
      this.active_tab = 1
    else if (this.boardCheck === 1)
      this.active_tab = 2
  },
}   
</script>

<style>
.no-resize ::-webkit-resizer {
  display: none;
  resize: none;
}
</style>