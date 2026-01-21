import './assets/main.css';
import './assets/margin.css';
import './assets/padding.css';
import './assets/flexRule.css';
import './assets/textFont.css';
import './assets/border.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
