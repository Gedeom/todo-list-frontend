<template>
  <v-layout justify-content align-center>
    <h3>{{user.name}}</h3>
    <v-avatar
      :size="40"
      color="grey lighten-4"
    >
      <img :src="user.image_url" alt="avatar">
    </v-avatar>
  </v-layout>
</template>

<script>
export default {
  name: 'AppAvatar',
  props: ['user'],
};
</script>

