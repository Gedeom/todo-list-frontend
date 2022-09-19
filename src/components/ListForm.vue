<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form @submit.prevent="saveListForm()" v-model="validList">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{!list ? 'Cadastro de Lista' : `Edição da Lista: ${list.description}`}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Descrição*" v-model="listModel.description" required
                    :rules="rulesValidation.notEmptyRules">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">
              Fechar
            </v-btn>
            <v-btn type="submit" color="blue darken-1" text>
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
  name: 'ListForm',
  data() {
    let listModelDefault = {
      description: '',
      board: {
        id: ''
      }
    };

    return {
      dialog: false,
      validList: false,
      list: false,
      listModelDefault: Object.assign({}, listModelDefault),
      listModel: Object.assign({}, listModelDefault),
      resolve: null,
      reject: null,
      rulesValidation
    }
  },
  methods: {
    ...mapActions('activities', ['saveActivity']),
    ...mapActions('lists', ['createList', 'updateList']),
    ...mapMutations('boards', ['setInsertOrUpdateList', 'setActivity']),

    open(board_id, list = false) {
      this.list = list;
      this.listModel.board.id = board_id;

      this.dialog = true;

      if (list) {
        Object.assign(this.listModel, list);
      }
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    saveListForm() {
      if (this.validList) {
        if (this.list) {
          this.callUpdateList();
          return;
        }

        this.callCreateList();
      }
    },
    callCreateList() {
      this.createList(this.listModel).then(resp => {
        this.setInsertOrUpdateList({ data: resp.data.data });
        this.showMsg(resp.data.msg);
        this.saveActivity({ board_id: this.listModel.board.id, description: `<b>${this.user.name}</b> criou a lista <b>${this.listModel.description}</b>` }).then(respAc => {
          this.setActivity(respAc.data.data);
        }).finally(resp => {
          this.close();
        });
      }
      ).catch(error => {
        this.showMsg(error.response.data.msg, false);
      });
    },
    callUpdateList() {
      this.updateList({ data: this.listModel, id: this.list.id }).then(resp => {
        this.setInsertOrUpdateList({ data: resp.data.data, id: this.list.id });
        this.showMsg(resp.data.msg);
        this.saveActivity({ board_id: this.listModel.board.id, description: `<b>${this.user.name}</b> atualizou a lista <b>${this.listModel.description}</b>` }).then(respAc => {
          this.setActivity(respAc.data.data);
        }).finally(resp => {
          this.close();
        });
      }).catch(error => {
        this.showMsg(error.response.data.msg, false);
      });
    },
    close() {
      this.listModel = Object.assign({}, this.listModelDefault);
      this.dialog = false;
      this.resolve(false);
    }
  },
  computed: {
    ...mapState('auth', { user: 'user' }),
  }
};
</script>
