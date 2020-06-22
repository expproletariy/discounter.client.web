import Vue from 'vue';
import Vuex from 'vuex';
import axiosApp from '../plugins/axios/config';
import { IUser } from '../interfaces/user/user.interface';
Vue.use(Vuex);

const provider = axiosApp;

export default new Vuex.Store({
	state: {
		QRCode: null,
		QRsrc: '',
		user: {
			avatar: '',
			birth_day: null,
			email: '',
			male: '',
			name: '',
			phone: '',
			surname: '',
			first_name: '',
		},
	},
	mutations: {
		setUserData(state, user) {
			state.user = user;
		},
		setUpQRsrc(state, src) {
			state.QRsrc = src;
		},
		setUpQRCode(state, code) {
			state.QRCode = code;
		},
	},
	actions: {
	},
	modules: {
	},
});
