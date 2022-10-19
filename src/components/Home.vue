<template>
  <v-container fluid style="height:100vh;">
    <v-row class="pt-16 d-flex justify-center">
      <div class="text-h2 font-weight-bold">
        Lotto Value
      </div>
    </v-row>
    <v-row style="width:500px;" class="d-flex mx-auto justify-center align-center px-16">
      <v-col v-for=" i in 45" :key="i + 'randNum'" cols="12" class="col5 d-flex justify-center pa-0 py-2">
        <div class="d-flex white--text justify-center align-center rounded-circle d-inline-block text-h6 font-weight-bold" style="width:50px;height:50px;cursor: pointer;" :class="ballColor(i)" @click="toggleNum(i)">
          <v-icon color="green" style="position:absolute" x-large v-if="numList.findIndex((num) => num === i) > -1">mdi-check</v-icon>
          {{i}}
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center pt-10">
      <div v-for="item in numList" :key="item + 'num'" class="px-1">
        <div class="d-flex justify-center align-center rounded-circle d-inline-block text-h6 font-weight-bold" style="width:50px;height:50px;cursor: pointer;" :class="ballColor(item)" @click="toggleNum(item)">
          {{item}}
        </div>
      </div>
      <div v-for="el in 6 - numList.length" :key="el + 'empty'" class="px-1">
        <div class="d-flex justify-center align-center rounded-circle d-inline-block text-h6 font-weight-bold grey" style="width:50px;height:50px;">
        </div>
      </div>
    </v-row>
    <v-row class="d-flex justify-center py-3">
      <v-btn color="error" width="150" max-width="150" class="mx-1" @click="randLotto()">랜덤</v-btn>
      <v-btn color="error" width="150" max-width="150" class="mx-1" @click="resetData()" :disabled="numList.length === 0">초기화</v-btn>
      <v-btn color="success" width="150" max-width="150" class="mx-1" @click="checkLotto()" :disabled="numList.length !== 6" :loading="loading">조회</v-btn>
    </v-row>
    <v-dialog v-model="dialog" max-width="800">
      <v-card class="mx-auto">
        <v-card-title class="d-flex justify-center">
          총 당첨 횟수 : {{result.length}}회  |  총 상금 : {{totalPrize}}원
        </v-card-title>
        <v-card-text>
          <div v-for="prize in result" :key="prize.no + 'prize'" class="py-1 d-flex justify-center">
            <div :class="prizeColorSet[prize.rank-1]" class="d-inline mx-auto">
              {{prize.no}}회차 ({{prize.date}})
              {{prize.rank}}등 : {{prize.prize}}원
            </div>
            </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" color="error">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import db from '@/assets/lottoDB.json'
  export default {
    data() {
      return {
        dialog: false,
        loading: false,
        lottodb: db,
        numList:[],
        colorSet:["yellow darken-2", "light-blue lighten-3","red lighten-1","blue-grey lighten-3","light-green lighten-1"],
        result:[],
        totalPrize:0,
        prizeColorSet:['yellow darken-2','blue-grey lighten-4','orange accent-3','light-green lighten-2','cyan lighten-4'],
      }
    },
    methods: {
      randLotto(){
        this.numList = [];
        for(var i=0;i<6;i++){
          //새로 추가될 숫자 : 1~45사이의 숫자가 랜덤하게 처리
          //random() : 0~1사이의 랜덤한 소수
          //floor() : 내림처리해서 정수로 변경
          var num = Math.floor(Math.random() * 44) + 1;

          //현재 상태는 같은 숫자가 나올수 있음
          //lotto라는 배열에 담긴 숫자와 같이 같으면 안됨
          for(var j in this.numList){
            if(num == this.numList[j]){ //현재 새로나온 숫자가 기존 숫자와 같으면
              num = Math.floor(Math.random() * 44) + 1;
            }
          }
          this.numList.push(num);
        }
        this.numList.sort((a,b) => a-b);
      },
      resetData(){
        this.numList = [];
        this.result = [];
        this.totalPrize = 0;
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
      checkLotto(){
        this.loading = true;
        this.result = [];
        this.lottodb.forEach(element => {
          let point = 0;
          let bonusPoint = false;
          this.numList.includes(element.dr1) === true ? point += 1 : '';
          this.numList.includes(element.dr2) === true ? point += 1 : '';
          this.numList.includes(element.dr3) === true ? point += 1 : '';
          this.numList.includes(element.dr4) === true ? point += 1 : '';
          this.numList.includes(element.dr5) === true ? point += 1 : '';
          this.numList.includes(element.dr6) === true ? point += 1 : '';
          this.numList.includes(element.drbonus) === true ? bonusPoint = true : bonusPoint = false;
          if(point === 3){
            // 5등
            this.result.push({
              no: element.no,
              date: element.date,
              rank: 5,
              prize: element.fifth,
            })
            
          }else if(point === 4){
            // 4등
            this.result.push({
              no: element.no,
              date: element.date,
              rank: 4,
              prize: element.fourth,
            })
            
          } else if (point === 5 && !bonusPoint){
            // 3등
            this.result.push({
              no: element.no,
              date: element.date,
              rank: 3,
              prize: element.third,
            })
            
          } else if(point === 5 && bonusPoint){
            // 2등
            this.result.push({
              no: element.no,
              date: element.date,
              rank: 2,
              prize: element.second,
            })
            
          } else if(point ===6){
            // 1등
            this.result.push({
              no: element.no,
              date: element.date,
              rank: 1,
              prize: element.first,
            })
          } else {
            return
          }
        });

        this.result.forEach( el => {
          this.totalPrize += el.prize;
        });
        this.loading = false;
        this.dialog = true;
      }
    },
  }
</script>
<style scoped>
.col5 {
  max-width: 20%;
  width: 20%;
  flex-basis: 20%;
}
</style>