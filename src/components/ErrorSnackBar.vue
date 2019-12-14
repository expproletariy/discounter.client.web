<template>
	<v-snackbar v-model="value">
		<h1 >{{ message }}</h1>
		<v-btn
			color="white"
			text
			@click="$emit('input', false)"
		>
			Close
		</v-btn>
	</v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'ErrorSnackBar',
	props: {
		message: String,
		value: Boolean,
	},
});
</script>
