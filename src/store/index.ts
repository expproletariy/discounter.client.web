import Vue from 'vue';
import Vuex from 'vuex';
import axiosApp from '../plugins/axios/config';
import { IUser } from '../interfaces/user/user.interface';
Vue.use(Vuex);

const provider = axiosApp;

export default new Vuex.Store({
	state: {
		user: {
			avatar: '',
			birth_day: null,
			email: '',
			male: '',
			name: '',
			patronymic: '',
			phone: '',
			surname: '',
			username: '',
		} as IUser,
	},
	mutations: {
		setUserData(state, user: IUser) {
			state.user = user;
		},
	},
	actions: {
		async fetchUserData(store) {
			const resp = await provider.get<IUser>('/users/me');
			store.commit('setUserData', resp.data);
		},
	},
	modules: {
	},
});
