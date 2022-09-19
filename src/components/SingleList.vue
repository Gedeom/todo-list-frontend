<template>
  <v-card min-height="70vh" height="100%">
    <ConfirmDialog ref="confirm" />

    <v-card-title class="primary white--text d-flex justify-space-between">
      {{list.description}}
      <v-col cols="auto">
        <span class="mx-2">
          <v-icon color="white" class="mb-2">mdi-clock-outline</v-icon>
          {{getRandomHours()}}h
        </span>

        <v-badge color="green darken-4" :content="list.cards.length || '0'">
        </v-badge>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on" class="pl-10">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="card_form(list)">
              <v-list-item-title>Cadastrar Card</v-list-item-title>
            </v-list-item>
            <v-list-item @click="list_form(list)">
              <v-list-item-title>Editar Lista</v-list-item-title>
            </v-list-item>
            <v-list-item @click="archiveList">
              <v-list-item-title>Arquivar Lista</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>


    </v-card-title>
    <v-card-text class="mt-5">
      <draggable class="layout column" :id="`list_${list.id}`" @end="onEndDrop" :list="list.cards" group="cardsGroup"
        style="min-height:2500px">
        <v-flex xs12 v-for="card in list.cards" :key="card.id" class="pa-1" :id="`card_${card.id}`">
          <v-hover v-slot="{ hover }">
            <v-card class="boardCard" @click="card_form(list, card)" :elevation="hover ? 20 : 2"
              :class="{ 'on-hover': hover }">
              <v-container fluid grid-list-lg>
                <v-layout row class="my-n4">
                  <v-col cols="6">
                    <v-chip class="ma-2 font-weight-black text-uppercase" color="#00000080" label outlined>
                      {{card.category.description}}
                    </v-chip>
                  </v-col>
                  <v-col cols="6" class="text-end text-caption mb-0">
                    Código:
                    <div class="body-1">#{{card.id}}</div>
                  </v-col>
                </v-layout>
                <v-layout row class="my-n4">
                  <v-col cols="12">
                    <div class="title">{{card.name}}</div>
                  </v-col>
                </v-layout>
                <v-layout row class="my-n4">
                  <v-col cols="6" class="text-caption">
                    Projeto:
                    <div class="body-1 font-weight-black">{{card.project.description}}</div>
                  </v-col>
                  <v-col cols="6" class="text-end text-caption">
                    Prevista:
                    <div class="body-1">
                      <v-icon>mdi-calendar-blank</v-icon> {{formatDate(card.expected_date)}}
                    </div>
                  </v-col>
                </v-layout>
                <v-layout row class="my-n4">
                  <v-col cols="12" class="text-caption">
                    Descrição:
                    <div class="text-truncate">{{card.description}}</div>
                  </v-col>
                </v-layout>
                <v-subheader class="my-n4">
                  <v-divider></v-divider> Acompanhamento <v-divider></v-divider>
                </v-subheader>
                <v-layout row class="my-n4">
                  <v-col cols="6" class="text-caption">
                    Prevista:
                    <div class="body-1">
                      <v-icon>mdi-alarm</v-icon> {{formatHour(card.expected_date)}}
                    </div>
                  </v-col>
                  <v-col cols="6" class="text-end">
                    <v-chip class="ma-2 font-weight-black text-uppercase white--text"
                      :color="getColorCard(card.expected_date)" label bordered>
                      {{getStatusCard(card.expected_date)}}
                    </v-chip>
                  </v-col>
                </v-layout>
                <v-layout row class="my-n4">
                  <v-col cols="6" class="text-caption">
                    Saldo:
                    <div class="body-1">
                      <v-icon>mdi-alarm</v-icon> {{formatHour(card.expected_date)}}
                    </div>
                  </v-col>
                  <v-col cols="6" class="text-end">
                    Equipe:
                    <div class="body-1">
                      <v-avatar color="teal" class="ml-1" size="30" v-for="member in card.members">
                        <span class="white--text">{{getInitials(member.name)}}</span>
                      </v-avatar>
                    </div>
                  </v-col>
                </v-layout>
              </v-container>
            </v-card>
          </v-hover>
        </v-flex>
      </draggable>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import moment from 'moment'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import draggable from "vuedraggable";


export default {
  data: () => {
    return {
      openConfirmArchive: false,
      droppingCard: false,
    }
  },
  components: {
    ConfirmDialog,
    draggable
  },
  props: [
    'list',
    'list_form',
    'card_form',
  ],
  methods: {
    ...mapMutations('boards', ['setActivity', 'setReorderCardsList', 'setArchivedList']),
    ...mapActions('boards', ['getCard', 'getList']),
    ...mapActions('activities', ['saveActivity']),
    ...mapActions('lists', ['deleteList']),
    ...mapActions('cards', ['saveMoveCard']),

    getStatusCard(expected_date) {
      const momentDate = moment(String(expected_date));
      const momentNow = moment();
      const diffInMinutes = momentDate.diff(momentNow, 'minutes');

      if (diffInMinutes <= 0) {
        return 'EM ATRASO';;
      } else if (diffInMinutes <= 60) {
        return 'ATENÇÃO';
      }
      return 'EM DIA';
    },
    getColorCard(expected_date) {
      const momentDate = moment(String(expected_date));
      const momentNow = moment();
      const diffInMinutes = momentDate.diff(momentNow, 'minutes');

      if (diffInMinutes <= 0) {
        return '#A31E20';
      } else if (diffInMinutes <= 60) {
        return '#F7E702';
      }
      return '#107154';
    },
    getInitials(name) {
      let splitName = name.split(' ');

      return splitName[0][0] + (splitName[1]?.[0] || '');
    },
    async archiveList() {
      if (await this.$refs.confirm.open(
        'Confirmar',
        `Você realmente deseja arquivar a lista <b>${this.list.description}</b>?`
      )) {
        this.deleteList(this.list.id).then(resp => {
          this.setArchivedList(this.list.id);
          this.showMsg(resp.data.msg);
          this.saveActivity({ board_id: this.list.board.id, description: `<b>${this.user.name}</b> arquivou lista <b>${this.list.description}</b>` }).then(respAc => {
            this.setActivity(respAc.data.data);
          });
        }).catch(error => {
          console.log(error);
          this.showMsg(error.response.data.msg, false);
        });
      }
    },
    async onEndDrop(evt) {
      const from_list_id = evt.from.id.split('_')[1];
      const to_list_id = evt.to.id.split('_')[1];
      const previous_order = parseInt(evt.oldIndex) + 1;
      const next_order = parseInt(evt.newIndex) + 1;
      const card_id = evt.item.id.split('_')[1];
      const from_list = await this.getList({ list_id: from_list_id });
      const to_list = await this.getList({ list_id: to_list_id });
      const card = await this.getCard({ list_id: to_list_id, card_id: card_id });
      let activity_description;

      if (from_list_id === to_list_id && previous_order === next_order) {
        return false
      }

      const data = {
        from_list_id,
        to_list_id,
        previous_order,
        next_order,
      }

      if (from_list_id == to_list_id)
        activity_description = `<b>${this.user.name}</b> mudou a posição do cartão <b>${card.name}</b> para <b>${next_order}</b> da lista <b>${to_list.description}</b>`;
      else
        activity_description = `<b>${this.user.name}</b> moveu o cartão <b>${card.name}</b> da lista <b>${from_list.description}</b> para a lista <b>${to_list.description}</b> na posição <b>${next_order}</b>`;

      this.saveMoveCard({ data, id: card_id }).then(resp => {
        this.setReorderCardsList(to_list_id);

        if (to_list_id != from_list_id)
          this.setReorderCardsList(from_list_id);

        this.saveActivity({ board_id: to_list.board.id, description: activity_description }).then(respAc => {
          this.setActivity(respAc.data.data);
        });
      });
    },
    getRandomHours(){
      return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }
  },
  computed: {
    ...mapState('auth', { user: 'user' }),
    ...mapGetters('boards', ['getCurrentBoard', 'getSelectedBoardLists', 'getSelectedBoardActivities'])
  }
};
</script>

<style scoped>
.boardCard :hover {
  cursor: pointer;
}
</style>
