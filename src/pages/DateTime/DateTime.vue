<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import SelectTime from '~/components/SelectTime'

@Component({
	components: {
		SelectTime,
	}
})
export default class DateTime extends Vue {
	public time: string = ''
}
</script>

<template>
	<div class="flex align-items-center gap-2">
		<SelectTime v-model="time" />
		<div>
			<p>{{ time }}</p>
		</div>
	</div>
</template>
