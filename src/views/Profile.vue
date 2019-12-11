<template>
	<v-container fluid fill-height>
		<v-row>
			<v-card
				class="mx-auto"
				:loading="isLoading"
			>
				<v-card-title>Profile</v-card-title>
				<v-card-text>
					<v-text-field v-model="user.username"/>
					<v-text-field v-model="user.phone"/>
					<v-text-field v-model="user.email"/>
					<v-text-field v-model="user.birth_day"/>
				</v-card-text>
				<v-card-actions>
					<v-btn
					>
						Ok
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
			this.loading = false;
			this.errMessage = err.message;
			this.showErr = true;
		}
	},
};

</script>
