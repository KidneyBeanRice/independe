<template>
 <v-btn variant="flat" color="#5E913B" class="font-weight-bold">
   <div @click="naver" class="text-white">네이버</div>
 </v-btn>
</template>
  
<script>
export default {
   methods: {
    naver() {            
      this.$axios.get('/oauth2/authorization/naver')
      .then(res => {
            console.log(res.data);
      })
      .catch(err => console.error(err))
    }
  }
}
</script>