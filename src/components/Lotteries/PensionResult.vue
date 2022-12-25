<template>
  <v-container fluid>
    <v-row class="d-flex justify-center align-center" v-if="loading" style="min-height:50vh;">
      <div>
        <div class="d-flex justify-center">
          <v-progress-circular style="position:relative !important" size="48" width="8" color="primary" indeterminate></v-progress-circular>
        </div>
        <div class="d-flex py-3">분석중 입니다.</div>
      </div>
    </v-row>
    <v-row v-else>
      <v-row class="d-flex justify-center text-h3 pt-10">
        당신의 결과는?
      </v-row>
      <v-row class="col-12 pa-0 ma-0 d-flex justify-center flex-wrap py-5" style="gap:0.5rem;">
        <div v-for="(item, idx) in $store.state.pensionNumbers" :key="idx+'num'" class="px-1 grey lighten-3">
          <div class="d-flex justify-center align-center rounded-circle text-h6 font-weight-bold"
            style="width:36px;height:36px;">
            {{item}}<span v-if="idx === 0 ">조</span>
          </div>
        </div>
      </v-row>
      <v-row  class="col-12 pa-0 ma-0">
        <v-col cols="12" lg="6" xl="6" md="6" sm="6">
          <div style="width:270px;height:270px;"  class="d-flex justify-center align-center mx-auto pa-0">
            <v-progress-circular size="200" :value="winRates[6]" rotate="-90" width="36" :color="progressColors[0]">
              <div v-if="winRates[6] !== 0" class="black--text pa-0 ma-0" style="position:absolute;z-index:5;width:5rem;transform: translate(-50%,-50%);" :style="{ top: caly(winRates[6], -90, 200), left: calx(winRates[6], -90, 200)}">7등: {{ winStat['7'] }}회</div>
            </v-progress-circular>
            <v-progress-circular v-for="i in 6" size="200" :value="winRates[6-i]" :key="i + 'progress'" :rotate="rotate(6 - i)" width="36" :color="progressColors[i]">
              <div v-if="winRates[6 - i] !== 0" class="black--text pa-0 ma-0"  style="position:absolute;z-index:5;width:5rem;transform: translate(-50%,-50%);" :style="{ top: caly(winRates[6 - i], rotate(6 - i), 200), left: calx(winRates[6 - i], rotate(6 - i), 200)}">{{ 7 - i }} 등: {{ winStat[`${7 - i}`] }}회</div>
            </v-progress-circular>
            <v-progress-circular v-if="winRates[7] !== 0" size="200" :value="winRates[7]" :rotate="-90 + (100 - winRates[7])*3.6" width="36" color="grey">
              <div v-if="winStat.bonus > 0" class="black--text pa-0 ma-0"  style="position:absolute;z-index:5;width:5rem;transform: translate(-50%,-50%);" :style="{ top: caly(winRates[7], -90 + (100 - winRates[7])*3.6, 200), left: calx(winRates[7], -90 + (100 - winRates[7])*3.6, 200)}">Bonus: {{ winStat.bonus }}회</div>
            </v-progress-circular>
            <div>
              <div class="d-flex justify-center">
                당첨 횟수 분포
              </div>
              <div class="d-flex justify-center">
                총 {{ total.wins }}회
              </div>
              <div class="d-flex justify-center">
                <v-icon color="black" small>mdi-currency-krw</v-icon> {{ total.prize | commaCase }}
              </div>
             </div>
          </div>
          <div>
            총 당첨금: {{ total.prize | commaCase }}
          </div>
          <div>
            총 투자금: {{ total.opCost | commaCase }} <span class="text-caption">(매주 1게임씩 구매)</span>
          </div>
          <div>
            수익률 : <span :class="total.prize > total.opCost ? 'red--text' : 'blue--text'">{{ Math.floor((total.prize - total.opCost) / total.opCost *100) | commaCase }}%</span>
          </div>
        </v-col>
        <v-col cols="12" lg="6" xl="6" md="6" sm="6" class="d-flex justify-center">
          <v-data-table
          style="width:100%"
          height="50vh"
          mobile-breakpoint="0"
          @click:row="expand"
          :expanded="expanded"
          :single-expand="true"
          fixed-header
          item-key="no"
          :footer-props="{ 'items-per-page-options': [], 'disable-items-per-page': true,}"
          :items-per-page="10"
          :headers="headers"
          :items="result" 
          >
          <template #item.prize="{item}">
            {{item.prize | commaCase}}
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div class="pt-3">
                추첨일 : {{ item.data.date }}
              </div>
              <div class="d-flex justify-center pt-3">당첨번호</div>
              <div class="d-flex justify-center" style="column-gap:5px;">
                <div v-for="(num, idx) in item.data.win.toString().split('')" :key="num + 'nums' + idx" class="d-flex justify-center align-center font-weight-bold grey lighten-3"
                :style="$store.state.pensionNumbers[idx] === num*1 ? { 'border': '2px dashed black !important' } : '' "
                style="width:24px;height:24px;">
                  {{ num }}<span v-if="idx === 0">조</span>
                </div>
              </div>
              <div class="d-flex justify-center pt-3">보너스</div>
              <div class="d-flex justify-center pb-5" style="column-gap:5px;">
                <div v-for="(num, idx) in item.data.bonus.toString().split('')" :key="num + 'bonus' + idx"
                  class="d-flex justify-center align-center font-weight-bold grey lighten-3"
                  :style="$store.state.pensionNumbers[idx+1] === num*1 ? { 'border': '2px dashed black !important' } : '' "
                  style="width:24px;height:24px;">
                  {{ num }}
                </div>
              </div>
            </td>
          </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      progressColors: ['error','primary','warning','grey','purple','orange','green'],
      expanded:[],
      winStat:null,
      result: null,
      winRates:[],
      loading: true,
      total: {
        prize: 0,
        wins: 0,
        opCost: 0,
      },
      headers: [
        {
          text: '회차',
          align: 'start',
          sortable: true,
          value: 'no',
        },
        {
          text: '상금',
          align: 'start',
          sortable: true,
          value: 'prize',
        },
        {
          text: '등수',
          align: 'start',
          sortable: true,
          value: 'rank',
        },
      ],
      colorSet: ["yellow darken-2", "light-blue lighten-3", "red lighten-1", "blue-grey lighten-3", "light-green lighten-1"],
    }
  },
  methods: {
    expand(el, detail) {
      this.expanded = [];
      if (!detail.isExpanded) {
        this.expanded.push(el);
      }
    },
    rotate(index) {
      let sum = 0;
      for (let i = index + 1; i < 7; i++){
        sum += this.winRates[i];
      }
      return -90 + sum *3.6;
    },
    calx(value, rotate, size) {
      const deg = value * 3.6 / 2 + rotate;
      const radius = size / 2;
      return radius*(1 + Math.cos(deg * Math.PI / 180)) + 'px';
    },
    caly(value, rotate, size) {
      const deg = value * 3.6 / 2 + rotate;
      const radius = size / 2;
      return radius * (1 + Math.sin(deg * Math.PI / 180)) + 'px';
    },
  },
  async mounted() {
    if (this.$store.state.pensionNumbers.length !== 7) {
      this.$router.push({ path: '/' }).catch(()=>{});
    }
    this.loading = true;
    setTimeout(async () => {
      await this.$axios.get(this.$store.state.backendUrl + '/check/pension', {
        params: {
          trill: this.$store.state.pensionNumbers[0],
          dr1: this.$store.state.pensionNumbers[1],
          dr2: this.$store.state.pensionNumbers[2],
          dr3: this.$store.state.pensionNumbers[3],
          dr4: this.$store.state.pensionNumbers[4],
          dr5: this.$store.state.pensionNumbers[5],
          dr6: this.$store.state.pensionNumbers[6],
        }
      }).then((res) => {
        this.result = res.data.result;
        this.winStat = res.data.winStat;
        this.total.prize = res.data.total;
        this.total.wins = res.data.result.length;
        this.total.opCost = res.data.opCost;
        
        setTimeout(() => {
          const wins = Object.values(res.data.winStat);
          wins.map((v) => { this.winRates.push(v * 1 / res.data.result.length * 100) });
        }, 0);
        
        this.loading = false;
      }).catch(() => { this.$router.push({path:'/'})})
    }, 1000);
  },
}
</script>
<style>
.v-progress-circular{
  position: absolute;
}
.v-progress-circular__underlay{
  stroke:none;
}
</style>