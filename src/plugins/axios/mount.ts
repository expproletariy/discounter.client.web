'use strict';

import Vue from 'vue';
import axiosApp from './config';
// @ts-ignore
Plugin.install = (vue, options) => {
	vue.axios = axiosApp;
	// @ts-ignore
	window.axios = axiosApp;
	Object.defineProperties(vue.prototype, {
		axios: {
			get() {
				return axiosApp;
			},
		},
		$axios: {
			get() {
				return axiosApp;
			},
		},
	});
};
// @ts-ignore
Vue.use(Plugin);

export default Plugin;
