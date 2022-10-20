<template>
  <v-app>
    <v-main>
      <DisplayAdContaienr></DisplayAdContaienr>
      <router-view></router-view>
      <DisplayAdContaienr></DisplayAdContaienr>
    </v-main>
  </v-app>
</template>

<script>
import DisplayAdContaienr from '@/components/DisplayAdContainer.vue'
export default {
  name: 'App',

  components: {
    DisplayAdContaienr
  },
  data() {
    return {
      
    }
  },
};
</script>
