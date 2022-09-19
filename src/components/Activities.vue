<template>
  <v-navigation-drawer :elevation="10" :expand-on-hover=true :mini-variant=true :right=true
    :permanent="$vuetify.breakpoint.mdAndUp" absolute>
    <v-list dense nav class="py-0">
      <v-list-item two-line :class="'px-0'">
        <v-list-item-icon class="pt-5">
          <v-icon large>mdi-call-split</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="title">Histórico</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list three-line v-for="(item, index) in activities">
        <v-list-item>

          <v-list-item-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <div v-html="item.description" class="text-wrap"></div>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-list>
  </v-navigation-drawer>

</template>

<script>

export default {
  props: ['activities'],
  computed: {
    permanent() {
      return $this.vuetify.breakpoint.mdAndUp
    }
  }
};
</script>

<style>
.v-navigation-drawer__content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #5d5d5d;
  background-color: #5d5d5d;
}

.v-navigation-drawer__content::-webkit-scrollbar {
  width: 0px;
}

.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px #424242;
  background-color: #424242;
}
</style>
