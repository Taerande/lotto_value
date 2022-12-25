<template>
  <v-container fluid style="height:90vh;">
    <v-row class="d-flex justify-center pt-10">
      <h1 class="text-md-h2">
        내 로또는 과연 몇등?
      </h1>
    </v-row>
    <div class="d-flex justify-center text-h6 py-10">
      로또 종류를 선택해 주세요
    </div>
    <v-row class="d-flex justify-center align-center col-12 mx-auto" style="max-width:800px;">
      <v-col cols="12" md="6" sm="12" class="d-flex justify-center" v-for="item in lotteries" :key="item.name">
        <v-hover v-slot="{hover}">
          <v-card :to="{path:item.path}" :style="hover ? {transform: 'scale(1.05)', transition: 'all 0.15s ease-in-out'} :{ transition: 'all 0.15s ease-in-out'}" width="286" height="150" class="d-flex justify-center align-center rounded-xl" :elevation=" hover ? 12 : 0" :img="item.img">
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        lotteries:[
          {
            name:'lotto',
            path:'/lotto',
            img: require('@/assets/lotto_logo.jpg'),
          },
          {
            name:'pension',
            path:'/pension',
            img: require('@/assets/pension_logo.jpg'),
          },
        ],
      }
    },
  }
</script>
<style>
</style>