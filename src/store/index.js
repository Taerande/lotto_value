import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        backendUrl: process.env.VUE_APP_BACKEND_PROD_URL,
        lottoDialog: false,
        lottoNumbers:[],
        pensionNumbers:[],
    },
    mutations:{
        Toggle_lottoDialog(state){
            state.lottoDialog = !state.lottoDialog;
        },
        SET_LottoNumbers(state, payload) {
            state.lottoNumbers = payload;
        },
        SET_LottoNumsToLocalstorage(state, payload) {
            const existed = JSON.parse(localStorage.getItem('LottoList'));
            if (existed === null) {
                localStorage.setItem('LottoList', JSON.stringify([payload]));
            } else {
                existed.push(payload);
                localStorage.setItem('LottoList', JSON.stringify(existed));
            }
        },
        DEL_LottoNumsToLocalstorage(state, payload) {
            const existed = JSON.parse(localStorage.getItem('LottoList'));
            if (existed === null) { return }
            const idx = existed.findIndex(v => v.date === payload.date);
            existed.splice(idx, 1);
            localStorage.setItem('LottoList', JSON.stringify(existed));
        },
        SET_PensionNumbers(state, payload) {
            state.pensionNumbers = payload;
        },
        SET_PensionNumsToLocalstorage(state, payload) {
            const existed = JSON.parse(localStorage.getItem('PensionList'));
            if (existed === null) {
                localStorage.setItem('PensionList', JSON.stringify([payload]));
            } else {
                existed.push(payload);
                localStorage.setItem('PensionList', JSON.stringify(existed));
            }
        },
        DEL_PensionNumsToLocalstorage(state, payload) {
            const existed = JSON.parse(localStorage.getItem('PensionList'));
            if (existed === null) { return }
            const idx = existed.findIndex(v => v.date === payload.date);
            existed.splice(idx, 1);
            localStorage.setItem('PensionList', JSON.stringify(existed));
        },
    },
    actions: {

    },
});
