import Vue from "vue";

Vue.filter('commaCase', function(el){
  let regexp = /\B(?=(\d{3})+(?!\d))/g;
  if(el){
    return el.toString().replace(regexp, ',');
  }else{
    return el;
  }
});