<template>
	<input
		class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-sky-500"
		type="text"
		:id="id"
		:value="value"
		:class="eclass"
		:disabled="disabled"
		@input="$emit('input', $event.target.value)"
	/>
</template>

<script>
export default {
	props: {
		id: {
			type: String,
			required: false,
		},
		name: {
			type: String,
			required: false,
		},
		value: {
			type: [String, Number],
			required: false,
			default: null,
		},
		eclass: {
			type: Object,
			required: false,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
};
</script>
