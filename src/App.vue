<template>
  <v-app>
    <AppSideMenu v-show="showMenu"></AppSideMenu>
    <AppNavbar :user="user" v-show="showMenu"></AppNavbar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer padless app v-show="showMenu">
      <v-card class="flex" flat tile>
        <v-card-title class="primary white--text">
          <strong class="subheading">Desenvolvido por Gedeom Anastácio, me encontre nas redes socias!</strong>

          <v-spacer></v-spacer>

          <v-btn v-for="data in icons" :key="data.icon" class="mx-4" dark icon :href="data.link" target="_blank">
            <v-icon size="24px">
              {{ data.icon }}
            </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { mapActions, mapState } from 'vuex';
import AppNavbar from './components/AppNavbar.vue';
import AppSideMenu from './components/AppSideMenu.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppSideMenu
  },
  computed: {
    ...mapState('auth', { user: 'user' }),
    showMenu() {
      return this.$route.name !== 'login' && this.$route.name !== 'register';
    }
  },
  data() {
    return {
      icons: [
        { icon: 'mdi-github', link: 'https://github.com/Gedeom' },
        { icon: 'mdi-linkedin', link: 'https://www.linkedin.com/in/gedeom' },
        { icon: 'mdi-instagram', link: 'https://www.instagram.com/_gedeom' },
      ],
    };
  },
};
</script>