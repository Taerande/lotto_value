<template>
    <div class="d-flex justify-center py-5">
      <Adsense
      data-ad-client="ca-pub-8597405222136575"
      data-ad-slot="9811542968"
      :ins-style="`display:inline-block;width:${AdWidth};height:90px;min-width:270px;`"
      ></Adsense>
    </div>
  </template>
  <script>
  export default {
    name:'displayAd',
    mounted(){
    },
    computed:{
      AdWidth(){
        if(this.$vuetify.breakpoint.xs){
          return '270px';
        }
        else if(this.$vuetify.breakpoint.sm){
          return '440px';
        }
        else if(this.$vuetify.breakpoint.md){
          return '550px';
        }
        else if(this.$vuetify.breakpoint.lg){
          return '728px';
        }
        else{
          return '970px';
        }
      }
    }
  }
  </script>
  <style>
  </style>
  