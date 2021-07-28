<template>
	<div class="text-xs py-1 px-2 rounded-sm font-semibold" :class="classList">
		{{ statusName }}
	</div>
</template>

<script>
export default {
	props: {
		statusName: {
			type: String,
			required: true,
		},
	},

	computed: {
		classList() {
			let result = "";
			switch (this.statusName) {
				case "Pending":
					result = "bg-orange-300 text-orange-800";
					break;
				case "Active":
					result = "bg-blue-300 text-blue-800";
					break;
				case "Completed":
					result = "bg-green-300 text-green-800";
					break;
				case "Canceled":
					result = " bg-red-200 text-red-800";
					break;
			}

			return result;
		},
	},
};
</script>
