<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-form @submit.prevent="saveBoardForm()" v-model="validBoard" lazy-validation ref="form">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{!board ? 'Cadastro de Quadro' : `Edição do Quadro: ${board.description}`}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-textarea auto-grow rows="1" row-height="15" label="Descrição*" v-model="boardModel.description"
                    :rules="rulesValidation.notEmptyRules">
                  </v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-select :items="users" label="Membros" item-text="name" item-value="id" multiple
                    v-model="boardModel.members" persistent-hint chips return-object
                    :rules="rulesValidation.notEmptySelect"></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">
              Fechar
            </v-btn>
            <v-btn color="blue darken-1" type="submit" text>
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import rulesValidation from '../validators/validators';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'BoardForm',
  data() {
    let boardModelDefault = {
      description: '',
      members: []
    };
    return {
      dialog: false,
      validBoard: false,
      board: false,
      boardModelDefault: Object.assign({}, boardModelDefault),
      boardModel: Object.assign({}, boardModelDefault),
      rulesValidation,
      resolve: null,
      reject: null,
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    ...mapActions('boards', ['createBoard','updateBoard']),
    ...mapMutations('boards', ['setInsertOrUpdateBoard']),

    open(board = false) {
      this.board = board;
      this.dialog = true;

      if (board) {
        Object.assign(this.boardModel, board);
      }

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    saveBoardForm() {
      this.$refs.form.validate();

      if (this.validBoard) {
        if (this.board) {
          this.callUpdateBoard();
          return;
        }

        this.callCreateBoard();
      }
    },
    callCreateBoard() {
      let data = Object.assign({}, this.boardModel);

      this.createBoard(data).then(resp => {
        this.close();
        this.setInsertOrUpdateBoard({ data: resp.data.data })
        this.showMsg(resp.data.msg);
      }).catch(error => {
        this.showMsg(error.response.data.msg, false);
      });
    },
    callUpdateBoard() {
      let data = Object.assign({}, this.boardModel);

      this.updateBoard({ data, id: this.board.id }).then(resp => {
        this.close();
        this.setInsertOrUpdateBoard({ data: resp.data.data, id: this.board.id });
        this.showMsg(resp.data.msg);
      }).catch(error => {
        this.showMsg(error.response.data.msg, false);
      });
    },
    close() {
      this.boardModel = Object.assign({}, this.boardModelDefault),
      this.dialog = false;
      this.resolve(false);
    }
  }, computed:{
    ...mapState('users', ['users']),
  }
};
</script>