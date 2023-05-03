<template>
    <form @submit.prevent="login">
      <div>
        <label for="email">이메일:</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">로그인</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
        login() {
        this.axios.get('/api/login', {
        email: this.email,
        password: this.password
        })
        .then(response => {
        const token = response.data.token;        
        localStorage.setItem('token', token);
        this.$router.push('/dashboard');
        })
        .catch(error => {
        console.log(error);
        })
    }
    }
  }
  </script>
  