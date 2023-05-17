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
                                        <router-link to="/board/ALL/FREE" style="text-decoration: none; color:black;"
                                            @click="region_all">
                                            <v-list-item-title class="my-2"
                                                @click="$store.state.boardCheck = 0">자유</v-list-item-title>
                                        </router-link>
                                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                                        <router-link to="/board/SEOUL/TALK" style="text-decoration: none; color:black;"
                                            @click="region_seoul">
                                            <v-list-item-title class="my-2"
                                                @click="$store.state.boardCheck = 1">서울</v-list-item-title>
                                        </router-link>
                                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                                        <router-link to="/board/PUSAN/TALK" style="text-decoration: none; color:black;"
                                            @click="region_busan">
                                            <v-list-item-title class="my-2"
                                                @click="$store.state.boardCheck = 2">부산</v-list-item-title>
                                        </router-link>
                                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                                        <router-link to="/board/ULSAN/TALK" style="text-decoration: none; color:black;"
                                            @click="region_ulsan">
                                            <v-list-item-title class="my-2"
                                                @click="$store.state.boardCheck = 3">울산</v-list-item-title>
                                        </router-link>
                                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                                        <router-link to="/board/KEYNONGNAM/TALK" style="text-decoration: none; color:black;"
                                            @click="region_kyeongnam">
                                            <v-list-item-title class="my-2"
                                                @click="$store.state.boardCheck = 4">경남</v-list-item-title>
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
                                            <v-list-item-title class="my-2"
                                                @click="$store.state.independentCheck = 0">청소</v-list-item-title>
                                        </router-link>
                                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                                        <router-link to="/independent/WASH" style="text-decoration: none; color:black;"
                                            @click="independent_wash">
                                            <v-list-item-title class="my-2"
                                                @click="$store.state.independentCheck = 1">세탁</v-list-item-title>
                                        </router-link>
                                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                                        <router-link to="/independent/COOK" style="text-decoration: none; color:black;"
                                            @click="independent_cook">
                                            <v-list-item-title class="my-2"
                                                @click="$store.state.independentCheck = 2">요리</v-list-item-title>
                                        </router-link>
                                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                                        <router-link to="/independent/HEALTH" style="text-decoration: none; color:black;"
                                            @click="independent_health">
                                            <v-list-item-title class="my-2"
                                                @click="$store.state.independentCheck = 3">건강</v-list-item-title>
                                        </router-link>
                                        <v-divider :thickness="1" class="border-opacity-25 mb-2"></v-divider>
                                        <router-link to="/independent/ETC"
                                            style="text-decormsid aherrration: none; color:black;" @click="independent_etc">
                                            <v-list-item-title class="my-2"
                                                @click="$store.state.independentCheck = 4">기타</v-list-item-title>
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
                            append-inner-icon="mdi-magnify" single-line hide-details
                            @click:append-inner="onClick"></v-text-field>
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
                <v-row class="mt-3">
                    <v-col cols="auto">
                        <v-img :width="45" :height="45" src="../img/signUp.png"></v-img>
                    </v-col>
                    <h2 class="font-weight-bold mt-5" style="color:#5E913B">회원가입</h2>
                </v-row>

                <v-divider :thickness="1" class="border-opacity-25 my-5" length="1160"></v-divider>

                <v-row>
                    <v-col>
                        <div class="font-weight-bold mt-5 mb-3" style="color:gray; font-size:20px">이용약관</div>
                        <v-textarea v-model="terms" class="no-resize" :readonly="true" variant="outlined"></v-textarea>
                        <v-row>
                            <v-checkbox label="[필수] 이용약관에 동의합니다." color="success"></v-checkbox>
                        </v-row>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <div class="font-weight-bold mt-5 mb-3" style="color:gray; font-size:20px">개인정보 수집 및 이용 동의서</div>
                        <v-textarea v-model="privacy" class="no-resize" :readonly="true" variant="outlined"></v-textarea>
                        <v-row>
                            <v-checkbox label="[필수] 개인정보 수집 및 이용에 동의합니다." color="success"></v-checkbox>
                        </v-row>
                    </v-col>
                </v-row>

                <v-row class="mt-5">
                    <v-col cols="1">
                        <div class="font-weight-bold mt-5" style="color:gray; font-size:20px">아이디</div>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field class="no-resize" variant="underlined" ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-btn variant="flat" color="#898E93" class="mt-3 font-weight-bold">
                            <div class="text-white">중복확인</div>
                        </v-btn>
                    </v-col>
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
    name: 'SignUptView',
    data() {
        return {
            active_tab: 0,
            link: ['메인', '게시판', '자취생활'],

            terms:`이용약관
            
1. 서비스 목적과 범위
      1.1. "인디펜더"는 사용자들이 다양한 커뮤니티 활동을 할 수 있는 온라인 플랫폼을 제공합니다.
      1.2. 본 서비스는 회원 간의 상호작용을 위한 커뮤니케이션 도구, 콘텐츠 공유, 이벤트 및 프로젝트 등을 포함합니다.

2. 이용자의 권리와 의무
      2.1. 회원은 본 서비스를 이용함으로써 다른 회원 및 관리자에 대한 존중과 배려를 요구 받습니다.
      2.2. 회원은 본 서비스를 합법적인 목적으로만 사용해야 하며, 타인의 권리를 침해하거나 불법 활동을 수행해서는 안됩니다.

3. 개인정보 처리 방침
      3.1. "인디펜더"는 회원의 개인정보를 보호하기 위해 노력하며, 개인정보 처리에 대한 규정은 별도의 개인정보 처리 방침에 따릅니다.
      3.2. 회원은 본 서비스를 이용함으로써 개인정보 처리 방침에 동의한 것으로 간주됩니다.

4. 서비스 이용 제한 사항
      4.1. 회원은 다른 회원의 권리를 침해하거나 부적절한 콘텐츠를 게시하여서는 안됩니다.
      4.2. 회원은 서비스 이용에 있어 법적, 윤리적인 제한 사항을 준수해야 합니다.

5. 지적 재산권에 대한 규정
      5.1. 회원이 서비스에 게시한 콘텐츠에 대한 지적 재산권은 해당 회원에게 속합니다.
      5.2. 회원은 타인의 지적 재산권을 존중해야 하며, 불법적으로 타인의 저작권을 침해해서는 안됩니다.

6. 책임 제한 및 면책 조항
      6.1. "인디펜더"는 회원 간의 상호작용 및 서비스 이용으로 발생하는 문제에 대해 어떠한 책임도 지지 않습니다.
      6.2. 본 서비스는 제공되는 기능 및 콘텐츠의 정확성, 완전성, 신뢰성에 대해 보증하지 않습니다.

7. 분쟁 해결 방법과 관할법원
      7.1. 서비스 이용으로 발생하는 분쟁은 상호 합의를 통해 해결을 시도해야 합니다.
      7.2. 분쟁이 해결되지 않을 경우, 관할법원에 소를 제기할 수 있습니다.

8. 약관 변경에 대한 규정
      8.1. "인디펜더"는 필요한 경우 이용약관을 변경할 수 있으며, 변경사항은 별도의 공지를 통해 효력이 발생합니다.

9.계약 해지 조항
      9.1. 회원은 언제든지 서비스 이용을 중단하고 계정을 해지할 수 있습니다.`,

      privacy:`개인정보 수집 및 이용 동의서
            
1. 수집하는 개인정보의 항목
        • 성명, 이메일 주소, 연락처 등

2. 개인정보의 수집 및 이용 목적
        • 회원 가입 및 서비스 제공, 고객 지원 및 문의 응대, 서비스 개선 및 향상 등

3. 개인정보의 보유 및 이용 기간
        • 개인정보는 수집 및 이용 목적을 달성한 후, 관련 법령이 정한 기간 내에 파기됩니다.

4. 개인정보의 제3자 제공
        • "인디펜더"는 이용자의 개인정보를 제3자에게 제공하지 않으며, 법령에 의해 요구되는 경우에는 예외로 합니다.

5.개인정보의 처리 위탁
        • "인디펜더"는 개인정보 처리를 위탁하지 않으며, 모든 개인정보 처리는 자체적으로 이루어집니다.

6. 개인정보의 파기
        • 개인정보는 수집 및 이용 목적이 달성된 후, 관련 법령에 따라 안전하게 파기됩니다.

7. 개인정보 수집 및 이용 동의의 거부
        • 이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 수 있습니다. 단, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.

8. 개인정보 보호 관련 권리
        • 이용자는 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지 등의 권리를 행사할 수 있습니다.

9. 개인정보 보호 관련 문의처
        • 개인정보 보호 관련 문의나 불만사항은 아래 연락처로 문의하여 주시기 바랍니다:
        [010-2483-6671]

10. 개인정보 수집 및 이용 동의
        • 본인은 위에 기술된 개인정보 수집 및 이용에 동의합니다. 해당 정보는 "인디펜더" 서비스의 이용과 관련된 목적으로만 사용될 것을 약속합니다.`,
        }
    },
    methods: {
        
    },
    mounted() {

    },    
}   
</script>

<style>
.no-resize ::-webkit-resizer {
  display: none;
  resize: none;
}
</style>