import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faCookieBite, faMinus, faPlus, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faCookieBite, faPlus, faMinus, faHeart)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.mount('#app')
