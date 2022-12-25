<template lang="">
<v-app-bar
style="z-index:10"
    app
    color="indigo">
    <Drawer v-if="$vuetify.breakpoint.smAndDown"></Drawer>
    <v-tabs
        v-else
        v-model="tab"
        class="px-3"
        background-color="transparent"
        color="red"
        slider-size="6"
    >
        <v-tab v-for="item in tabItems" :key="item.nam" :to="item.path" class="white--text px-3">
            {{item.text}}
        </v-tab>
    </v-tabs>
</v-app-bar>
</template>
<script>
import Drawer from './Drawer.vue'
export default {
    components:{
        Drawer,
    },
    data() {
        return {
            drawer:false,
            tabItems:[
                {
                    name:'Home',
                    text:'Home',
                    path:'/'
                },
                {
                    name:'Lotto',
                    text:'로또6/45',
                    path:'/lotto'
                },
                {
                    name:'Pension',
                    text:'연금복권720+',
                    path:'/pension'
                },
            ],
            tab:null,
        }
    },
    
}
</script>
<style>
    
</style>