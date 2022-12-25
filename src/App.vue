<template>
  <v-app>
    <AppbarVue app></AppbarVue>
    <v-main app>
      <v-container class="pt-10">
        <v-slide-x-transition mode="out-in" duration="150">
          <router-view></router-view>
        </v-slide-x-transition>
      </v-container>
      </v-main>
  </v-app>
</template>

<script>
import AppbarVue from './components/Layout/Appbar.vue';
export default {
  name: 'App',

  components: {
    AppbarVue,
  },
  data() {
    return {
      
    }
  },
};
</script>
<style>
.v-main{
  margin-left: 10%;
  margin-right: 10%;
}

@media screen and (max-width: 959px) {
  .v-main{
    margin-left: 0%;
    margin-right: 0%;
  }
  
}
</style>
