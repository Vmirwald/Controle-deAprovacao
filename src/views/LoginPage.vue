<template>
    <div class="login-page">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async login() {
        const auth = getAuth();
        try {
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push('/'); // Redireciona para a Home
        } catch (error) {
          this.errorMessage = 'Erro ao fazer login: ' + error.message;
        }
      },
    },
  };
  </script>
  
  <style>
  .login-page {
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  </style>
  