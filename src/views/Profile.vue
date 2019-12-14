<template>
	<v-container
		fluid
		class="fill-height" >
		<v-row>
			<v-col
				cols="12"
			>
				<v-row>
					<v-col cols="4">
						<v-card
							:loading="isLoading"
						>
							<v-card-title>Profile</v-card-title>
							<v-card-text>
								<v-text-field v-model="user.username"/>
								<v-text-field v-model="user.phone"/>
								<v-text-field v-model="user.email"/>
								<v-text-field v-model="user.birth_day"/>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col
						cols="7">
						<v-card>
							<v-card-title>Orders</v-card-title>
							<v-card-text>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
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
	name: 'profile',
	components: {
		'v-error-snack-bar': ErrorSnackBar,
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
			this.isLoading = true;
			await this.$store.dispatch('fetchUserData');
			this.isLoading = false;
		} catch (err) {
			this.isLoading = false;
			this.$router.push('/login');
		}
	},
};

</script>
