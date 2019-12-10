<template>
  <v-app>
    <Toolbar/>
    <Drawer/>
    <v-content>
      <transition name="fade"
                  mode="out-in"
                  @beforeLeave="beforeLeave"
                  @enter="enter"
                  @afterEnter="afterEnter"
      >
        <router-view></router-view>
      </transition>
    </v-content>
    <Footer/>
    <v-snackbar
      v-model="snackbar"
      top
      multi-line
      :timeout="timeout"
    >
      {{ text }}
     
    </v-snackbar>

  </v-app>
</template>

<script>
import Footer from './components/Footer'

import { bus } from './main'
import firebase from './firebase'
import Toolbar from './components/Toolbar'
import Drawer from './components/Drawer'

export default {
  name: 'App',
  components: {
    Footer,
    Drawer,
    Toolbar
  },
  created(){
    bus.$on('show-snackbar', (data) => {
      this.snackbar = true
      this.text = data
    })

    const currentUser = firebase.auth().currentUser
    console.log(currentUser)
    console.log(this.$router.currentRoute.path)
  },  
  data () {
    return {
     
      snackbar: false,
      text: "",
      timeout: 5000,
      items: [
          { title: "Profile", clickEvent:'' },
          { title: "Sign out" },
      ],
      profile: false
    }
  },
  watch:{
        $route (){
            this.scrollToTop()
        }
    },
    methods: {
        scrollToTop() {
            this.$vuetify.goTo(0);
        },
        beforeLeave(element) {
            this.prevHeight = getComputedStyle(element).height;
        },
        enter(element) {
            const { height } = getComputedStyle(element);

            element.style.height = this.prevHeight;

            setTimeout(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
        },
    },
    computed:{
      authStatus(){
        return this.$store.getters['auth/getAuthStatus']
      },
      
    }

}
</script>
<style>
  @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: height, opacity;
    transition-timing-function: ease;
    overflow: hidden;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
