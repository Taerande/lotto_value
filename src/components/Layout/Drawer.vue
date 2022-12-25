<template>
    <div>
        <v-btn icon @click.stop="drawer = !drawer" small><v-icon color="white">mdi-menu</v-icon></v-btn>
        <v-expand-transition duration="100">
            <v-card
            style="position:absolute;left:0%;top:56px;width:100%;"
            v-show="drawer"
            outlined
            class="indigo lighten-3 rounded-b-xl rounded-t-0"
            @click:outside="drawer = !drawer"
            >
            <v-card-title>
                <v-img src="@/assets/logo.png" max-width="36">
                </v-img>
                <span>Lotto Value</span>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="drawer = !drawer" small><v-icon color="error">mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <v-list
                class="indigo lighten-3"
                >
                <v-list-item v-for="item in group" :key="item.value"
                :to="{path:item.path}"
                @click="drawer = false"
                active-class="highlighted"
                :class="item.path === $route.path ? 'highlighted' : ''"
                >
                {{item.text}}
                </v-list-item>
            </v-list>
            </v-card-text>
        </v-card>
        </v-expand-transition>
    </div>
</template>
<script>
export default {
    data(){
        return{
            group:[
                {
                    text:'Home',
                    value:'home',
                    path:'/',
                },
                {
                    text:'로또6/45',
                    value:'lotto',
                    path:'/lotto'
                },
                {
                    text:'연금복권720+',
                    value:'pension',
                    path:'/pension'
                }
            ],
            drawer:false,
        }
    },
}
</script>
<style>
.highlighted{
    color:white !important;
}
</style>