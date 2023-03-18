<template>
  <v-v-app-bar class="bg-surface-variant">
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col>
        <v-img  
      src="../img/logo.png"
    ></v-img>
      </v-col>

      <v-col>
        <v-tabs
        color="#558335"
      >
      <v-tab 
        v-for="link in links"
        :key="link"
      >
      <p class="font-weight-bold text-h6">{{ link }}</p>
      </v-tab>        
      </v-tabs>      
      </v-col>

      <v-col>
        <v-sheet class="pa-2 ma-2">
          .v-col-auto
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet class="pa-2 ma-2">
          .v-col-auto
        </v-sheet>
      </v-col>
    </v-row>
  </v-v-app-bar>
</template>

<script>
  export default {
    data: () => ({
      links: [
        '메인',
        '게시판',
        '자취생활'
      ],
    }),
  }
</script>