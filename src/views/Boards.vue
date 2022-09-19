<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-center wrap>
        <v-row>
          <v-col cols="auto">
            <v-btn color="secondary" @click="openBoardForm(false)">Cadastrar Quadro</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" md="3" v-for="board in boards" :key="board.id" pa-2 height="100%">
            <single-board :board="board" :board_form="openBoardForm"></single-board>
          </v-col>
        </v-row>
        <BoardForm ref="board_form"/>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script lang="ts">
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import SingleBoard from '@/components/SingleBoard.vue';
import BoardForm from '../components/BoardForm.vue'

export default {
  name: 'boards',
  components: {
    SingleBoard,
    BoardForm
  },
  async mounted() {
    this.getBoards()
  },
  methods: {
    ...mapMutations('boards', ['setselectedBoard']),
    ...mapActions('boards', ['getBoards']),
    openBoardForm(board = false) {
      this.$refs.board_form.open(board);
    },
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('boards', {
      boards: 'boards'
    }),
  },
};
</script>
