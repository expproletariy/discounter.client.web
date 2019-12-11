<template>
	<v-container fluid fill-height>
		<v-row>
			<v-card
				class="mx-auto"
				:loading="isLoading"
			>
				<v-card-title>Login</v-card-title>
				<v-card-text>
					<v-form v-model="loginFomValid">
						<v-text-field
							v-model="login"
							label="Phone"
						/>
						<v-text-field
							v-model="password"
							label="Password"
							type="password"
						/>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn
						:disabled="!loginFomValid"
						@click="loginUser"
					>
						Login
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-row>
		<v-error-snack-bar
			:message="errMessage"
			v-model="showErr"
		/>
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
