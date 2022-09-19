<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs12 class="pa-5">
                <v-row>
                  <v-col cols="auto">
                    <v-btn color="secondary" @click="openListForm(false)">Cadastrar Lista</v-btn>
                  </v-col>
                </v-row>
              </v-flex>
              <v-flex md3 sm12 v-for="list in (getActiveSelectedBoardLists)" :key="list.id" pa-5>
                <single-list :list="list"
                  :list_form="openListForm" :card_form="openCardForm">
                </single-list>
              </v-flex>
            </v-layout>

          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs1>
        <Activities :activities="getSelectedBoardActivities"></Activities>
      </v-flex>
      <ListForm ref="list_form" />
      <CardForm ref="card_form" />


    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import Activities from '../components/Activities.vue';
import SingleList from '../components/SingleList.vue';
import ListForm from '../components/ListForm.vue'
import CardForm from '../components/CardForm.vue'
import draggable from "vuedraggable";


export default {
  name: 'board',
  components: {
    Activities,
    SingleList,
    ListForm,
    CardForm,
    draggable
  },
  data: () => ({
    activitiesOpen: true,
  }),
  created() {
   this.setselectedBoard(this.$route.params.id);
   this.getActivities(this.$route.params.id);
   this.getLists(this.$route.params.id);
  },
  methods: {
    ...mapMutations('boards', ['setselectedBoard']),
    ...mapActions('lists', ['getLists']),
    ...mapActions('cards', ['updateCard']),
    ...mapActions('activities', ['getActivities', 'saveActivity']),
    async dropCard() {
      if (this.droppingList && this.draggingCard.list.id !== this.droppingList.id) {
        const fromList = this.lists.find(list => list.id === this.draggingCard.list.id);
        const toList = this.lists.find(list => list.id === this.droppingList.id);
        this.draggingCard.list.id = this.droppingList.id;

        await this.updateCard({ data: this.draggingCard, id: this.draggingCard.id }).then(res => {
          const description = `<b>${this.user.name}</b> moveu o cartão <b>${this.draggingCard.name}</b> de <b>${fromList.description}</b> para <b>${toList.description}</b>`;
          this.saveActivity({ board_id: this.board.id, description }).finally(resp => {
          });
        }).catch(error => {
          this.showMsg(error.response.data.msg, false);
        });
      }
      this.setDroppingList(null);
      this.setDraggingCard(null);
    },
    openListForm(list = false) {
      this.$refs.list_form.open(this.getCurrentBoard, list);
    },
    openCardForm(list, card = false) {
      this.$refs.card_form.open(list, card);
    },
  },
  computed: {
    ...mapGetters('boards', ['getCurrentBoard','getSelectedBoardLists','getSelectedBoardActivities', 'getCurrentBoard','getActiveSelectedBoardLists'])
  },
};
</script>
