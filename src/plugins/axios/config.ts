import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const baseURL = process.env.baseURL || process.env.apiUrl || 'http://localhost:3000';
const prefix = process.env.API_PREFIX || '';

const config = {
	baseURL: '/',
	// timeout: 60 * 1000, // Timeout
	// withCredentials: false, // Check cross-site Access-Control
	// headers: {
	// 	'Access-Control-Allow-Origin': baseURL,
	// },
};

const axiosApp = axios.create(config);

axiosApp.interceptors.request.use(
	(configs) => {
		// Do something before request is sent
		if (localStorage.getItem('access_token')) {
			configs.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
		}
		return configs;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
axiosApp.interceptors.response.use(
	(response) => {
		// Do something with response data
		return response;
	},
	(error) => {
		// Do something with response error
		return Promise.reject(error);
	},
);

export default axiosApp;
