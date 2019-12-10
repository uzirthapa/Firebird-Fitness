import Vue from 'vue'
import Vuetify, { VLayout, VTooltip, VBtn, VIcon, VCard, VToolbar, VFlex } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
// don't forget to import styles
import 'tiptap-vuetify/dist/main.css'
import Ads from 'vue-google-adsense'

Vue.use(Vuetify, {
  components: {
    VTooltip,
    VBtn,
    VIcon,
    VCard,
    VToolbar,
    VLayout,
    VFlex
  },
  iconfont: ['md','fa'],
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.use(TiptapVuetifyPlugin, {
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'md'
})

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)
