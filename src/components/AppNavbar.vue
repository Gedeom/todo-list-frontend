<template>
  <v-app-bar app>
    <v-container fluid>
      <v-layout class="d-flex align-center">
        <v-col cols="12" sm="6" md="6">
          <div class="title">{{user?.name || ''}}</div>
        </v-col>
        <v-col cols="12" sm="6" md="4" v-if="!isMobile">
          <v-autocomplete :items="searchItems || []" chips clearable hide-details hide-selected item-text="name"
            item-value="id" prepend-inner-icon="mdi-magnify" append-icon="" :label="searchLabel || 'Pesquisar'" solo>
          </v-autocomplete>
        </v-col>
        <v-col cols="auto" v-if="!isMobile">
          <v-btn large color="primary">
            Filtro
            <v-icon large>mdi-filter</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto" v-if="!isMobile">
          <v-badge bottom :content="22" color="pink" overlap>
            <v-icon large color="secondary">
              mdi-bell
            </v-icon>
          </v-badge>
        </v-col>
        <v-col cols="auto" v-if="!isMobile">
          <v-icon large color="secondary">
            mdi-arrow-expand-all
          </v-icon>
        </v-col>
        <v-col cols="auto" v-if="!isMobile">
          <v-btn tile @click="logoutUser">
            <v-icon large color="secondary">
              mdi-logout
            </v-icon>
          </v-btn>

        </v-col>
      </v-layout>

    </v-container>

    <!-- <div class="'" v-if="slotMenu"> {{slotMenu || ''}}</div> -->

  </v-app-bar>
</template>

<script>
import AppAvatar from './AppAvatar.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'AppNavbar',
  props: ['searchLabel', 'searchItems', 'user'],
  data() {
    return {
      pageName: 'teste'
    }
  },

  components: {
    AppAvatar,
  },
  methods: {
    ...mapActions('auth', ['logout']),

    logoutUser() {
      this.logout().then(resp => {
        this.$router.go('/');
      });
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly || this.$vuetify.breakpoint.smOnly;
    },
    
  }
};
</script>