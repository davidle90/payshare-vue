import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import Navbar from './components/Navbar.vue'
import LoginButton from './components/LoginButton.vue'
import LogoutButton from './components/LogoutButton.vue'
import LoginForm from './components/LoginForm.vue'

const app = createApp(App)

app.use(router)
app.component('site-header', SiteHeader);
app.component('site-footer', SiteFooter);
app.component('navbar', Navbar);
app.component('login-button', LoginButton);
app.component('logout-button', LogoutButton);
app.component('login-form', LoginForm);

app.mount('#app')
