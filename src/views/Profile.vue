<template>
	<v-container
		fluid
		class="fill-height" >
		<v-row>
			<v-row>
				<v-card
						:loading="isLoading"
				>
					<v-card-title>Profile</v-card-title>
					<v-card-text>
						<v-qr-encoder :email="user.email" :phone="user.phone" :id="user.id"></v-qr-encoder>
						<v-text-field v-model="user.name"/>
						<v-text-field v-model="user.phone"/>
						<v-text-field v-model="user.email"/>
						<v-text-field v-model="user.birth_day"/>
					</v-card-text>
				</v-card>
			</v-row>
			<v-row>
				<v-card>
					<v-card-title>Orders</v-card-title>
					<v-card-text>
					</v-card-text>
				</v-card>
			</v-row>
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
import QREncoder from '@/components/QREncoder.vue';
import * as gql from 'graphql-tag';

export default {
	name: 'profile',
	components: {
		'v-error-snack-bar': ErrorSnackBar,
		'v-qr-encoder': QREncoder,
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
	},
	data: () => ({
		isLoading: false,
		errMessage: '',
		showErr: false,
	}),
	async mounted() {
		try {
			console.log(localStorage.getItem('access_token'));
			this.isLoading = true;
			const { data } = await this.$apollo.query({
				query: gql`query {
					me {
						id
    					name
    					email
    					first_name
    					surname
    					phone
    					birth_day
					}
				}`,
			});
			console.log(data.me);
			this.$store.commit('setUserData', data.me);
			this.isLoading = false;
		} catch (err) {
			this.isLoading = false;
			this.$router.push('/login');
		}
	},
};

</script>
