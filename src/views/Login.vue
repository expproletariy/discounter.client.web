<template>
	<v-container
		class="fill-height"
		fluid >
		<v-row
			align="center"
			justify="center">
			<v-col
				cols="12"
				sm="8"
				md="4">
				<v-card>
					<v-card-title>Login</v-card-title>
					<v-card-text>
						<v-form
							v-model="loginFomValid" >
							<v-text-field
								v-model="login"
								label="Phone, Username or Email"
								required />
							<v-text-field
								v-model="password"
								label="Password"
								type="password"
								required />
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-btn
							:disabled="!loginFomValid"
							:loading="isLoading"
							@click="loginUser"
							rounded
							block >
							Login
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<v-error-snack-bar
			:message="errMessage"
			v-model="showErr" />
	</v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ErrorSnackBar from '@/components/ErrorSnackBar.vue';

export default {
	name: 'login',
	components: {
		'v-error-snack-bar': ErrorSnackBar,
	},
	data: () => ({
		loginFomValid: false,
		login: '',
		password: '',
		errMessage: '',
		showErr: false,
		isLoading: false,
	}),
	methods: {
		async loginUser() {
			try {
				this.isLoading = true;
				const resp = await this.$axios.post('/users/login', {
					profile: {
						phone: this.login,
					},
					password: this.password,
					name: this.login,
					email: this.login,
				});
				this.isLoading = false;
				localStorage.setItem('access_token', resp.data.access_token);
				this.$router.push('/me');
			} catch (err) {
				this.isLoading = false;
				this.errMessage = 'Invalid login or password';
				this.showErr = true;
			}
		},
	},
	async mounted() {
		//
	},
};

</script>
