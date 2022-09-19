<template>
    <v-card >
      <v-navigation-drawer expand-on-hover app :elevation="10" :expand-on-hover=true :mini-variant=true color="primary">
        <v-list >
          <v-list-item class="px-2">
            <v-list-item-avatar large>
              <v-img :src="require('../assets/logo.png')"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item >
            <v-list-item-icon>
              <v-icon>mdi-menu</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item>
          
          <v-list-item link :to="{ name: 'boards'}">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Página Inicial</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-bell-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Notificações</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-calendar-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tarefas a vencer</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-bullseye-arrow</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tarefas compridas</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-file-chart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Relatórios</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-plus-box-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cadastros</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>

  
          <v-list-item link>
            <v-list-item-icon >
              <v-icon color="secondary">mdi-plus-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cadastrar</v-list-item-title>
          </v-list-item>


        </v-list>
      </v-navigation-drawer>
    </v-card>
</template>

<script lang="ts">
export default {
  name: 'AppSideMenu',
  props: ['searchLabel', 'searchItems', 'user', 'logout'],
};
</script>