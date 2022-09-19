<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 20 : 10" :class="{ 'on-hover': hover }" height="100%" :justify="'center'" class="card"
      >
      <v-card-title class="white--text primary d-flex justify-space-between">
        {{board.description}}
        <v-col cols="auto">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item :to="{ name: 'board', params: { id: board.id } }">
                <v-list-item-title>Ver Quadro</v-list-item-title>
              </v-list-item>
              <v-list-item @click="board_form(board)">
                <v-list-item-title>Editar Quadro</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-card-title>


      <v-divider></v-divider>
      <v-container fluid grid-list-lg>
        <v-layout row class="my-n4">
          <v-card-text class="text--primary subtitle-1 font-weight-medium" :justify="'center'" :align="'start'">
            <div>Criador: {{board.user.name}}</div>
            <div>Data de criação: {{formatDate(board.created_at)}}</div>
          </v-card-text>
        </v-layout>
        <v-layout row class="my-n4">
          <v-col cols="12" class="text-end">
            Equipe:
            <div class="body-1">
              <v-avatar color="teal" class="ml-1" size="30" v-for="member in board.members">
                <span class="white--text">{{getInitials(member.name)}}</span>
              </v-avatar>
            </div>
          </v-col>
        </v-layout>
      </v-container>

    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: ['board','board_form'],
  methods: {
    getInitials(name) {
      let splitName = name.split(' ');

      return splitName[0][0] + (splitName[1]?.[0] || '');
    },
  },
};
</script>

<style scoped>
</style>

