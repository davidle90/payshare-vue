import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import Navbar from './components/Navbar.vue'

const app = createApp(App)

app.use(router)
app.component('site-header', SiteHeader);
app.component('site-footer', SiteFooter);
app.component('navbar', Navbar);

app.mount('#app')
