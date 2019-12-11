import Vue from 'vue';
import './plugins/axios/mount';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	// @ts-ignore
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
