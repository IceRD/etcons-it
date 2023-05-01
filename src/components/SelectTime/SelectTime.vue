<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import Calendar from 'primevue/calendar';

type Time = Date | null

@Component({
    components: {
		Calendar
    },
	emits: ['update:model-value']
})
export default class SelectTime extends Vue {
	public time: Time = null

	get calendarData(): Time {
		return this.time
	}

	set calendarData(time: Time) {
		this.time = time

		if(time) {
			const date = new Date(time)
			const hs = date.toLocaleTimeString().slice(0,-3)

			this.$emit('update:model-value', `${hs}`);
			return
		}

		this.$emit('update:model-value', "")
	}


}
</script>

<template>
	<div>
		<Calendar
			v-model="calendarData"
			:showTime="true"
			:timeOnly="true"
			:manualInput="false"
			:showIcon="true"
		/>
	</div>
</template>
