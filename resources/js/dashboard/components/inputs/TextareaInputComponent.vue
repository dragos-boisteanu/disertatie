<template>
	<div class="flex flex-col items-end">
		<textarea
			class="w-full text-sm p-2 rounded border border-gray-300 outline-none focus:ring-1 focus:ring-sky-500"
			type="text"
			:id="id"
			:value="value"
			:class="eclass"
			:disabled="disabled"
			:maxlength="maxLength"
			@input="$emit('input', $event.target.value)"
		/>
		<div
			v-if="maxLength"
			class="mt-1 text-xs "
			:class="{ 'text-red-600': overMaxLength, 'text-gray-400': !overMaxLength }"
		>
			{{ currentLength() }} / {{ maxLength }}
		</div>
	</div>
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
		maxLength: {
			type: Number,
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

	computed: {
		overMaxLength() {
			if (this.maxLength) {
				return this.value.length > this.maxLength;
			}
		},
	},

	methods: {
		currentLength() {
			if (this.maxLength) {
				return this.value.length;
			}
		},
	},
};
</script>
