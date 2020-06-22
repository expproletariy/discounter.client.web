<template>
	<v-app>
		<v-app-bar
			app
			dark
			clipped-left
		>
			<v-app-bar-nav-icon @click="navigation = !navigation"/>
			<v-spacer></v-spacer>
			<template v-if="!localStorage.getItem('access_token')">
				<v-btn
					to="/login"
					text>
					Login
				</v-btn>
				<v-btn
					to="/registration"
					text>
					Register
				</v-btn>
			</template>
			<template v-else>
				<v-btn
					to="/me"
					text>
					Profile
				</v-btn>
				<v-btn
					@click="logout"
					text>
					Logout
				</v-btn>
			</template>
		</v-app-bar>
		<v-navigation-drawer
			v-model="navigation"
			app
			clipped >
			<v-list dense>
				<v-list-item>
					<v-list-item-content>
						<v-btn
							to="/"
							text
							block>
							Home
						</v-btn>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main app>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'App',

	components: {},
	data: () => ({
		navigation: false,
		localStorage,
	}),
	created() {
		this.$vuetify.theme.dark = true;
	},
	async mounted() {
		try {
			await this.$axios.get('/');
		} catch (err) {
			alert('Can not connect to server! Try again!');
		}
	},
	methods: {
		logout() {
			localStorage.removeItem('access_token');
			if (this.$router.currentRoute.name !== 'home') {
				this.$router.push('/');
			} else {
				// @ts-ignore
				location.reload();
			}
		},
	},
});
</script>

<style lang="stylus">
	.row
		margin 0 !important
</style>
