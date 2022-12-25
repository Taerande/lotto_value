<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <v-card
                :img="logo"
                width="286"
                height="150"
                class="rounded-xl d-flex justify-center"
                >
                </v-card>
            </v-col>
        </v-row>
        <v-row class="d-block">
            <div class="d-flex py-2 mx-auto" style="width:262px;">
                <div class="text-body-2 mx-1 grey lighten-3 d-flex justify-center align-center"
                    :class="breakXS ? 'text-body-1' : ''" style="height:36px;width:36px;">
                    {{trillionList[toggle_exclusive]}}
                </div>
                <v-spacer></v-spacer>
                <v-btn v-ripple="{class: 'success--text'}" icon :large="!breakXS" @click="randomNum()" style="height:36px;width:36px;">
                    <div>
                        <v-icon>mdi-shuffle</v-icon>
                    </div>
                </v-btn>
            </div>
            <div class="d-flex justify-center align-center" style="gap:0.5rem;">
                <div v-for="(i, index) in numList" :key="index+'input'" class="text-h6 grey lighten-3 d-flex justify-center align-center" style="cursor:pointer;height:36px;width:36px;" @click="selected !== index ? selected = index : selected = -1" :style="selected === index ? 'border:2px solid red !important;' : ''" :id="`result_box_${index}`">
                    <span :class="breakXS ? 'text-body-1' : ''">
                        {{i}}
                    </span>
                </div>
                <div v-for="(left, idx) in 6-numList.length"  @click="selected !== idx + numList.length ? selected = idx + numList.length : selected = -1" :style="selected === idx + numList.length ? 'border:2px solid red !important;' : ''" :key="left+'left'" class="grey lighten-3 d-flex justify-center align-center" style="height:36px;width:36px;cursor:pointer;">
                </div>
            </div>
        </v-row>
        <v-row class="d-flex justify-center">
            <div>
                <v-subheader>조 선택</v-subheader>
                <v-btn-toggle mandatory v-model="toggle_exclusive">
                    <div class="d-flex justify-center flex-wrap" style="gap:0.5rem">
                        <v-btn v-for="item in trillionList" :key="item + 'trill'" color="success" small class="black--text" outlined>{{item}}</v-btn>
                    </div>
                </v-btn-toggle>
            </div>
            <div class="numpadContainer">
                <v-subheader>6자리 번호 선택</v-subheader>
                <div style="width:240px;gap:0.3rem;" class="d-flex flex-wrap justify-center">
                    <v-btn v-for="i in 9" :key="i+'numPad'" :disabled="numList.length > 5" outlined depressed v-ripple="{class:'success--text'}" @click="numList.push(i*1)"
                        :id="'btn'+i" width="48" height="48">{{i}}</v-btn>
                </div>
                <div style="width:240px;gap:0.3rem;margin-top:0.3rem;" class="d-flex flex-wrap justify-center">
                    <v-btn outlined depressed v-ripple="{class:'primary--text'}"
                        @click="numList = [], toggle_exclusive = null" id="btnRefresh" width="48" height="48">
                        <v-icon >mdi-refresh</v-icon></v-btn>
                    <v-btn :disabled="numList.length > 5" outlined depressed v-ripple="{class:'success--text'}" @click="numList.push(0)" id="btn0" width="48" height="48">0</v-btn>
                    <v-btn outlined depressed v-ripple="{class:'error--text'}" @click="numList.pop()" id="btnRemove" width="48" height="48"><v-icon>mdi-keyboard-backspace</v-icon></v-btn>
                </div>
            </div>
        </v-row>
        <v-row class="d-flex justify-center py-5">
            <v-btn v-ripple :block="$vuetify.breakpoint.xsAndDown" color="success" width="150" max-width="150" class="mx-1 my-1"
                @click="lookup()" :disabled="numList.length !== 6">
                <div class="d-flex justify-space-between align-center" style="width:70px;">
                    <v-icon>mdi-magnify</v-icon>
                    <span>조</span>
                    <span>회</span>
                </div>
            </v-btn>
        </v-row>
        <v-row v-for="(list, listIndex) in listed" :key="list.date" class="d-flex justify-center align-center py-1"
            style="gap:0.5rem">
            <div>{{ new Date(list.date).toISOString().split('T')[0] }}</div>
            <div v-for="(item, index) in list.data" :key="item + 'listed' + index + list.date">
                <div class="d-flex justify-center align-center grey lighten-3 d-inline-block font-weight-bold"
                    style="width:30px;height:30px;">
                    {{item}}<span v-if="index === 0">조</span>
                </div>
            </div>
            <v-icon color="success"
                @click="$store.commit('SET_PensionNumbers', list.data), $router.push({ path: '/pension-result' }).catch(() => { });">mdi-magnify</v-icon>
            <v-icon color="error"
                @click="$store.commit('DEL_PensionNumsToLocalstorage', list), listed.splice(listIndex, 1)">mdi-close</v-icon>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            trillionList: ['1조', '2조', '3조', '4조', '5조'],
            logo: require('@/assets/pension_logo.jpg'),
            numList: [],
            toggle_exclusive:0,
            selected: -1,
            listed:[],
        }
    },
    methods: {
        lookup() {
            this.$store.commit('SET_PensionNumsToLocalstorage', { date: new Date().getTime(), data: [this.toggle_exclusive + 1,...this.numList] });
            this.$store.commit('SET_PensionNumbers', []);
            this.$store.commit('SET_PensionNumbers', [this.toggle_exclusive + 1, ...this.numList]);
            this.$router.push({ path: '/pension-result' }).catch(() => { });
        },
        randomNum(){
            this.numList = [];
            this.toggle_exclusive = Math.floor(Math.random()*5);
            for(let i = 0; i<6; i++){
                this.numList.push(Math.floor(Math.random()*10));
            }
        },
    },
    computed:{
        breakXS(){
            return this.$vuetify.breakpoint.xs;
        }
    },
    mounted() {
        this.listed = JSON.parse(localStorage.getItem('PensionList'));
    }
}
</script>
<style scoped>
.v-btn{
    transition: background-color 0.15s ease-in-out;
}
</style>