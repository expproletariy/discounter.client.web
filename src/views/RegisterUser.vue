<template>
	<v-container
		class="fill-height"
		fluid >
		<v-row
			align="center"
			justify="center"
		>
			<v-col
				cols="12"
				sm="12"
				md="8">
				<v-card>
					<v-card-title>Enter user data</v-card-title>
					<v-card-text>
						<v-form
							v-model="loginFomValid"
							ref="form">
							<v-row>
								<v-col
									cols="12"
									sm="12"
									md="5">
									<v-text-field
										label="Username"
										v-model="user.name"
										:rules="validationRules.username"
										required />
									<v-text-field
										label="Phone"
										v-model="user.phone"
										:rules="validationRules.phone"
										required />
									<v-text-field
										label="Email"
										v-model="user.email"
										requied/>
									<v-text-field
										type="password"
										label="Password"
										:rules="validationRules.password"
										v-model="user.password"/>
									<v-text-field
										type="password"
										label="Repeat password"
										:rules="[validatePassword]"
										required
										v-model="user.doublePassword"/>
								</v-col>
								<v-col>
									<v-row>
										<v-label>Birth Date</v-label>
									</v-row>
									<v-row>
										<v-date-picker
											label="Birth Day"
											class="ma-2"
											reactive
											v-model="user.birth_day"
											required />
									</v-row>
								</v-col>
							</v-row>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-row align="end" justify="end">
							<v-btn
								:disabled="!loginFomValid"
								:loading="isLoading"
								@click="registerUser"
								rounded >
								Register
							</v-btn>
							<v-btn
								rounded
								@click="$refs.form.reset()"
								text >
								Cancel
							</v-btn>

						</v-row>
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
import ErrorSnackBar from '@/components/ErrorSnackBar.vue';
import { isAlphanumeric, isMobilePhone, isEmail } from 'validator';
export default {
	name: 'register-user',
	components: {
		'v-error-snack-bar': ErrorSnackBar,
	},
	data: () => ({
		user: {
			name: '',
			phone: '',
			email: '',
			birth_day: '',
			password: '',
			doublePassword: '',
		},
		loginFomValid: false,
		errMessage: '',
		showErr: false,
		isLoading: false,
		validationRules: {
			username: [
				v => !!v || 'Username is required',
				v => isAlphanumeric(v) || 'Username should contain only letters and numbers',
			],
			phone: [
				v => !!v || 'Phone is required',
				v => isMobilePhone(v) || 'Should be valid mobile phone number',
			],
			password: [
				v => !!v || 'Password is required',
			],
			email: [
				v => !!v || 'Email is required',
				v => isEmail(v) || 'Should be valid email',
			],
		},
	}),
	methods: {
		async registerUser() {
			try {
				this.isLoading = true;
				const resp = await this.$axios.post('/register', {
					phone: this.user.phone,
					name: this.user.name,
					email: this.user.email,
					password: this.user.password,
					birth_day: this.user.birth_day,
				});
				this.isLoading = false;
				this.$router.push('/login');
			} catch (err) {
				this.isLoading = false;
				this.errMessage = err.message;
				this.showErr = true;
			}
		},
		validatePassword(pass) {
			return pass === this.user.password || 'Passwords do not match';
		},
	},
	async mounted() {
		//
	},
};

</script>
