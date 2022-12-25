<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-center mx-auto">
          <v-card
          :img="logo"
          width="286"
          height="150"
          class="rounded-xl"
          >
          </v-card>
      </v-col>
    </v-row>
    <v-row style="max-width:580px;gap:0.5rem;" class="d-flex mx-auto justify-center align-center">
      <div v-for="i in 45" :key="i" :class="numList.findIndex((num) => num === i) > -1 ? 'selected' : ''" class="lottoNumbers" @click="toggleNum(i)" >
        {{ i }}
      </div>
    </v-row>
    <v-row class="d-flex justify-center pt-5"  style="gap:0.5rem">
      <div v-for="item in numList" :key="item + 'num'">
        <div v-ripple class="d-flex justify-center align-center rounded-circle d-inline-block text-h6 font-weight-bold" style="width:36px;height:36px;cursor: pointer;" :class="ballColor(item)" @click="toggleNum(item)">
          {{item}}
        </div>
      </div>
      <div v-for="el in 6 - numList.length" :key="el + 'empty'">
        <div v-ripple class="d-flex justify-center align-center rounded-circle d-inline-block text-h6 font-weight-bold grey lighten-2" style="width:36px;height:36px;">
        </div>
      </div>
    </v-row>
    <v-row class="d-flex justify-center py-1">
      <v-btn v-ripple :block="$vuetify.breakpoint.xsAndDown" color="primary" width="150" max-width="150" class="mx-1 my-1" @click="randLotto()">
        <div class="d-flex justify-space-between align-center" style="width:70px;">
          <v-icon>mdi-shuffle</v-icon>
          <span>무</span>
          <span>작</span>
          <span>위</span>
        </div>
      </v-btn>
      <v-btn v-ripple :block="$vuetify.breakpoint.xsAndDown" color="error" width="150" max-width="150" class="mx-1 my-1" @click="resetData()" :disabled="numList.length === 0">
        <div class="d-flex justify-space-between align-center" style="width:70px;">
          <v-icon>mdi-refresh</v-icon>
          <span>초</span>
          <span>기</span>
          <span>화</span>
        </div>
      </v-btn>
      <v-btn v-ripple :block="$vuetify.breakpoint.xsAndDown" color="success" width="150"
        max-width="150" class="mx-1 my-1" @click="lookup()" :disabled="numList.length !== 6">
        <div class="d-flex justify-space-between align-center" style="width:70px;">
          <v-icon>mdi-magnify</v-icon>
          <span>조</span>
          <span>회</span>
        </div>
      </v-btn>
    </v-row>
    <v-row class="d-flex justify-center">
      <div>
        최근 검색 기록
      </div>
    </v-row>
    <v-row v-for="(list, listIndex) in listed" :key="list.date" class="d-flex justify-center align-center py-1" style="gap:0.5rem">
      <div>{{ new Date(list.date).toISOString().split('T')[0] }}</div>
      <div v-for="item in list.data" :key="item + 'listed'">
        <div class="d-flex justify-center align-center rounded-circle d-inline-block font-weight-bold"
          style="width:24px;height:24px;" :class="ballColor(item)">
          {{item}}
        </div>
      </div>
      <v-icon color="success" @click="$store.commit('SET_LottoNumbers', list.data), $router.push({ path: '/lotto-result' }).catch(() => { });">mdi-magnify</v-icon>
      <v-icon color="error" @click="$store.commit('DEL_LottoNumsToLocalstorage', list), listed.splice(listIndex, 1)">mdi-close</v-icon>
    </v-row>
  </v-container>
</template>
  
<script>
  export default {
    components:{
    },
    data() {
      return {
        logo:require('@/assets/lotto_logo.jpg'),
        recentList:[],
        numList:[],
        colorSet: ["yellow darken-2", "light-blue lighten-3", "red lighten-1", "blue-grey lighten-3", "light-green lighten-1"],
        listed:[],
      }
    },
  methods: {
      lookup() {
        this.$store.commit('SET_LottoNumsToLocalstorage', { date: new Date().getTime(), data: this.numList });
        this.$store.commit('SET_LottoNumbers', []);
        this.$store.commit('SET_LottoNumbers', this.numList);
        this.$router.push({path:'/lotto-result'}).catch(()=>{});
    },
      randLotto(){
        this.numList = [];
        for(let i=0;i<6;i++){
          let num = Math.floor(Math.random() * 45) + 1;
          let isIn = this.numList.findIndex(el => el === num);

          while(isIn >= 0){
            num = Math.floor(Math.random() * 45) + 1;
            isIn = this.numList.findIndex(el => el === num);
          }
          this.numList.push(num);
        }
        this.numList.sort((a,b) => a-b);
      },
      resetData(){
        this.numList = [];
      },
      ballColor(el){
        const data = Math.floor((el-0.5)/10);
        return this.colorSet[data];
      },
      toggleNum(el){
        const data = this.numList.findIndex((num) => num === el);
        if(data === -1 && this.numList.length === 6){
          return ''
        } else if (data === -1){
          this.numList.push(el);
          this.numList.sort((a,b) => a-b);
        }else{
          this.numList.splice(data,1);
          this.numList.sort((a,b) => a-b);
        }
      },
      
  },
    mounted() {
      this.$store.commit('SET_LottoNumbers', []);
      this.listed = JSON.parse(localStorage.getItem('LottoList'));
    },
  }
</script>
<style scoped>
.col5 {
  max-width: 20%;
  width: 20%;
  flex-basis: 20%;
}
.lottoNumbers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  color: #ff5252;
  border: 2px solid #ff5252;
  clip-path: polygon(0% 0%, 0 25%, 10% 25%, 10% 75%, 0 75%, 0 100%, 100% 100%, 100% 75%, 90% 75%, 90% 25%, 100% 25%, 100% 0%);
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.selected{
  color: white;
  background: black;
}
</style>