import Vue from 'vue';
import './plugins/axios/mount';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.config.productionTip = false;
Vue.use(VueApollo);
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
	cache,
	headers: {
		authorization: localStorage.getItem('access_token') || null,
	},
});
const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
});
new Vue({
	router,
	store,
	// @ts-ignore
	vuetify,
	render: (h) => h(App),
	apolloProvider,
}).$mount('#app');
