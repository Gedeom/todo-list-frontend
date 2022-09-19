<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-form @submit.prevent="saveCardForm()" v-model="validCard" lazy-validation ref="form">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{!card ? 'Cadastro de Cartão' : `Edição do cartão: ${card.name}`}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Lista" disabled v-model="cardModel.list.description"
                    :rules="rulesValidation.notEmptyRules"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Nome*" required v-model="cardModel.name" :rules="rulesValidation.notEmptyRules">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-textarea auto-grow rows="1" row-height="15" label="Descrição*" v-model="cardModel.description"
                    :rules="rulesValidation.notEmptyRules">
                  </v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-select :items="categories" label="Categoria*" item-text="description" item-value="id"
                    v-model="cardModel.category.id" dense :rules="rulesValidation.notEmptyRules"></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select :items="projects" label="Projeto*" item-text="description" item-value="id"
                    v-model="cardModel.project.id" dense :rules="rulesValidation.notEmptyRules"></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="cardModel.expected_date" label="Data de previsão*" type="datetime-local"
                    required :rules="rulesValidation.notEmptyRules"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-select :items="cardModel.list.board.members" label="Membros" item-text="name" item-value="id"
                    multiple v-model="cardModel.members" persistent-hint chips return-object
                    :rules="rulesValidation.notEmptySelect"></v-select>
                </v-col>

                <v-checkbox v-show="card" v-model="cardModel.archived" label="Arquivado" color="red"></v-checkbox>
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
  name: 'CardForm',
  data() {
    let cardModelDefault = {
      name: '',
      description: '',
      expected_date: '',
      archived: '',
      category: {
        id: ''
      },
      project: {
        id: ''
      },
      list: {
        id: '',
        board: {
          members: [

          ]
        }
      },
      members: []
    };
    return {
      dialog: false,
      validCard: false,
      card: false,
      cardModelDefault: Object.assign({}, cardModelDefault),
      cardModel: Object.assign({}, cardModelDefault),
      rulesValidation,
      resolve: null,
      reject: null,
    }
  },
  methods: {
    ...mapActions('activities', ['saveActivity']),
    ...mapActions('cards', ['createCard', 'updateCard']),
    ...mapActions('categories', ['getCategories']),
    ...mapActions('projects', ['getProjects']),
    ...mapMutations('boards', ['setInsertOrUpdateCard', 'setActivity']),

    open(list, card = false) {
      this.card = card;
      Object.assign(this.cardModel.list, list);
      this.dialog = true;

      if (card) {
        Object.assign(this.cardModel, card);
        this.cardModel.expected_date = this.formatDate(this.cardModel.expected_date, 'YYYY-MM-DDTHH:mm');
      }

      this.setCategories();
      this.setProjects();

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    saveCardForm() {
      this.$refs.form.validate();

      if (this.validCard) {
        if (this.card) {
          this.callUpdateCard();
          return;
        }

        this.callCreateCard();
      }
    },
    callCreateCard() {
      let data = Object.assign({}, this.cardModel);
      data.expected_date = this.formatDate(data.expected_date, 'YYYY-MM-DD HH:mm:ss');

      this.createCard(data).then(resp => {
        this.setInsertOrUpdateCard({data: resp.data.data})
        
        this.showMsg(resp.data.msg);
        this.saveActivity({ board_id: this.cardModel.list.board.id, description: `<b>${this.user.name}</b> criou o cartão <b>${this.cardModel.name}</b>` }).then(respAc => {
          this.setActivity(respAc.data.data);
        }).finally(resp => {
          this.close();
        });
      }
      ).catch(error => {
        console.log(error);
        this.showMsg(error.response.data.msg, false);
      });
    },
    callUpdateCard() {
      let data = Object.assign({}, this.cardModel);
      data.expected_date = this.formatDate(data.expected_date, 'YYYY-MM-DD hh:mm:ss');

      this.updateCard({ data, id: this.card.id }).then(resp => {
        this.setInsertOrUpdateCard({data: resp.data.data, id: this.card.id});

        this.showMsg(resp.data.msg);
        this.saveActivity({ board_id: this.cardModel.list.board.id, description: `<b>${this.user.name}</b> atualizou o cartão <b>${this.cardModel.name}</b>` }).then(respAc => {
          this.setActivity(respAc.data.data);
        }).finally(resp => {
          this.close();
        });
      }).catch(error => {
        this.showMsg(error.response.data.msg, false);
      });
    },
    setCategories() {
      this.getCategories();
    },
    setProjects() {
      this.getProjects();
    },
    close() {
      this.cardModel = Object.assign({}, this.cardModelDefault);
      this.dialog = false;
      this.resolve(false);
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('categories', ['categories']),
    ...mapState('projects', ['projects']),
  }
};
</script>