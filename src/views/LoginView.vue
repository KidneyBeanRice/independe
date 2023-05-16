<template>
 <v-btn variant="flat" color="#5E913B" class="font-weight-bold">
   <div @click="naver" class="text-white">네이버</div>
 </v-btn>
 <a href="http://192.168.0.18:8080/oauth2/authorization/naver">asdads</a>
</template>
  
<script>
export default {
   methods: {
    naver() {            
      //this.$axios.get('/oauth2/authorization/naver')
      const url = "/oauth2/authorization/naver"
      this.$axios.get(url)
      .then(res => {
            console.log(res.data);
      })
      .catch(err => console.error(err))
    }
  }
}
</script>