<template>
	<v-app>
		<v-app-bar
			app
			color="primary"
			dark
		>
			<v-app-bar-nav-icon/>
			<v-spacer></v-spacer>
		</v-app-bar>

		<v-content app>
			<router-view/>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'App',

	components: {},
	async mounted() {
		try {
			await this.$axios.get('/');
		} catch (err) {
			alert('Can not connect to server! Try again!');
		}
	},

	data: () => ({
		//
	}),
});
</script>
