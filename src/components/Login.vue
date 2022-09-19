<template>
   <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-app>
       <v-main>
          <v-container fluid fill-height>
             <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                   <v-card class="elevation-12">
                      <v-toolbar dark color="primary">
                         <v-toolbar-title class="font-weight-bold">Login</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                            <v-text-field
                               prepend-icon="mdi-account"
                               name="email"
                               label="Email"
                               type="text"
                               id="email"
                               class="font-weight-black"
                               :rules="emailRules"
                               required
                            ></v-text-field>
                            <v-text-field
                               id="password"
                               prepend-icon="mdi-lock"
                               name="password"
                               label="Senha"
                               type="password"
                               class="font-weight-black"
                               required
                               :rules="passwordRules"
                            ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn color="secondary" @click="handleLogin">Login</v-btn>
                      </v-card-actions>
                   </v-card>
                </v-flex>
             </v-layout>
          </v-container>
       </v-main>
    </v-app>
   </v-form>
 </template>
 
 <script>

 export default {
    name: 'Login',
    components: {
  },
  data: () => ({
   valid: true,
   emailRules: [
      v => !!v || 'E-mail é obrigatório',
      v => /.+@.+\..+/.test(v) || 'E-mail precsa ser válido',
    ],
    passwordRules: [
    v => !!v || 'Senha é obrigatória',
    ]
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin() {
      if(!this.$refs.form.validate())
         return false;

      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      const  user = {email, password};

      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    }
 };
 </script>
 
 <style></style>
 