import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import './style/theme.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { router } from './router'

createApp(App).use(router).use(PrimeVue).mount('#app')
