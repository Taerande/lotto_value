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
      <v-row class="col-12 pa-0 ma-0 d-flex justify-center py-5">
        <div v-for="item in $store.state.lottoNumbers" :key="item+'num'" class="px-1">
          <div class="d-flex justify-center align-center rounded-circle text-h6 font-weight-bold"
            style="width:36px;height:36px;" :class="ballColor(item)">
            {{item}}
          </div>
        </div>
      </v-row>
      <v-row  class="col-12 pa-0 ma-0">
        <v-col cols="12" lg="6" xl="6" md="6" sm="6">
          <div style="width:270px;height:270px;"  class="d-flex justify-center align-center mx-auto pa-0">
            <v-progress-circular size="200" :value="winRates[4]" rotate="-90" width="36" color="success">
              <div v-if="winRates[4] !== 0" class="black--text pa-0 ma-0" style="position:absolute;z-index:5;width:5rem;transform: translate(-50%,-50%);" :style="{ top: caly(winRates[4], -90, 200), left: calx(winRates[4], -90, 200)}">5등: {{ winStat.fifth }}회</div>
            </v-progress-circular>
            <v-progress-circular size="200" :value="winRates[3]" :rotate="rotate(3)" width="36" color="primary">
              <div v-if="winRates[3] !== 0" class="black--text pa-0 ma-0"  style="position:absolute;z-index:5;width:5rem;transform: translate(-50%,-50%);" :style="{ top: caly(winRates[3], rotate(3), 200), left: calx(winRates[3], rotate(3), 200)}">4등: {{ winStat.fourth }}회</div>
            </v-progress-circular>
            <v-progress-circular size="200" :value="winRates[2]" :rotate="rotate(2)" width="36" color="yellow">
              <div v-if="winRates[2] !== 0" class="black--text pa-0 ma-0"  style="position:absolute;z-index:5;width:5rem;transform: translate(-50%,-50%);" :style="{ top: caly(winRates[2], rotate(2), 200), left: calx(winRates[2], rotate(2), 200)}">3등: {{ winStat.third }}회</div>
            </v-progress-circular>
            <v-progress-circular size="200" :value="winRates[1]" :rotate="rotate(1)" width="36" color="brown">
              <div v-if="winRates[1] !== 0" class="black--text pa-0 ma-0"  style="position:absolute;z-index:5;width:5rem;transform: translate(-50%,-50%);" :style="{ top: caly(winRates[1], rotate(1), 200), left: calx(winRates[1], rotate(1), 200)}">2등: {{ winStat.second }}회</div>
            </v-progress-circular>
            <v-progress-circular size="200" :value="winRates[0]" :rotate="rotate(0)" width="36" color="grey">
              <div v-if="winRates[0] !== 0" class="black--text pa-0 ma-0"  style="position:absolute;z-index:5;width:5rem;transform: translate(-50%,-50%);" :style="{ top: caly(winRates[0], rotate(0), 200), left: calx(winRates[0], rotate(0), 200)}">1등: {{ winStat.first }}회</div>
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
            총 당첨금: <v-icon color="black" small>mdi-currency-krw</v-icon>{{ total.prize | commaCase }}
          </div>
          <div>
            총 투자금: <v-icon color="black" small>mdi-currency-krw</v-icon>{{ total.opCost | commaCase }} <span class="text-caption">(매주 1게임씩 구매)</span>
          </div>
          <div>
            수익률 : <span :class="total.prize > total.opCost ? 'red--text' : 'blue--text'">{{ Math.floor((total.prize - total.opCost) / total.opCost *100) | commaCase}}%</span>
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
              <div class="d-flex justify-center pa-5" style="column-gap:5px;">
                <div v-for="i in 6" :key="i+'ball'" class="d-flex justify-center align-center rounded-circle font-weight-bold"
                  :style="$store.state.lottoNumbers.includes(item.data[`dr${i}`]) ? { 'border': '2px dashed black !important' } : '' "
                  style="width:24px;height:24px;" :class="ballColor(item.data[`dr${i}`])">
                  {{ item.data[`dr${i}`]}}
                </div>
                <v-icon color="error">mdi-plus</v-icon>
                <div class="d-flex justify-center align-center rounded-circle font-weight-bold"
                :style="$store.state.lottoNumbers.includes(item.data.drbonus) ? { 'border': '2px dashed black !important' } : '' "
                  style="width:24px;height:24px;" :class="ballColor(item.data.drbonus)">
                  {{item.data.drbonus}}
                </div>
              </div>
              <div>
                1등 : <v-icon color="black" small>mdi-currency-krw</v-icon>{{ item.data.first === undefined ? '당첨자 없음' : item.data.first | commaCase }}
              </div>
              <div>
                2등 : <v-icon color="black" small>mdi-currency-krw</v-icon>{{ item.data.second === undefined ? '당첨자 없음' : item.data.second | commaCase }}
              </div>
              <div>
                3등 : <v-icon color="black" small>mdi-currency-krw</v-icon>{{ item.data.third === undefined ? '당첨자 없음' : item.data.third | commaCase }}
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
      expanded:[],
      myChart: null,
      winStat:[],
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
    ballColor(el) {
      const data = Math.floor((el - 0.5) / 10);
      return this.colorSet[data];
    },
    // changeWinRate() {
    //   this.winStat = {
    //     first: 1,
    //     second: 2,
    //     third: 5,
    //     fourth: 8,
    //     fifth: 19,
    //   }
    //   this.winRates = [2.8571428571428571428571428571429, 5.7142857142857142857142857142857, 14.285714285714285714285714285714, 22.857142857142857142857142857143, 54.285714285714285714285714285714]
      
    // },
    rotate(index) {
      let sum = 0;
      for (let i = index + 1; i < 5; i++){
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
    if (this.$store.state.lottoNumbers.length !== 6) {
      this.$router.push({ path: '/' }).catch(()=>{});
    }
    this.loading = true;
    setTimeout(async () => {
      await this.$axios.get(this.$store.state.backendUrl + '/check/lotto', {
        params: {
          dr1: this.$store.state.lottoNumbers[0],
          dr2: this.$store.state.lottoNumbers[1],
          dr3: this.$store.state.lottoNumbers[2],
          dr4: this.$store.state.lottoNumbers[3],
          dr5: this.$store.state.lottoNumbers[4],
          dr6: this.$store.state.lottoNumbers[5],
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