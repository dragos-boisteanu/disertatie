<template>
	<div class="flex flex-col gap-y-1" :class="{ error: hasErrors }">
		<label class="text-sm font-semibold">{{ label }}</label>
		<slot />
		<div class="text-xs text-red-600 font-semibold" v-if="hasErrors">
			<div v-for="error in activeErrorMessages" :key="error">{{ error }}</div>
		</div>
	</div>
</template>

<script>
import { singleErrorExtractorMixin } from "vuelidate-error-extractor";

export default {
	mixins: [singleErrorExtractorMixin],
	props: {
		label: {
			type: String,
			required: true,
		},
	},
};
</script>
