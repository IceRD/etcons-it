<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';

interface Cities {
	name: string
    code: string
}

@Component({
	components: {
		MultiSelect,
		Button
	}
})
export default class Select extends Vue {
	public  cities: Cities[] = [
		{ name: 'New York', code: 'NY' },
		{ name: 'Rome', code: 'RM' },
		{ name: 'London', code: 'LDN' },
		{ name: 'Istanbul', code: 'IST' },
		{ name: 'Paris', code: 'PRS' }
	]

	public selectedCities = []

	handlerReset(): void {
		this.selectedCities = []
	}
}
</script>

<template>
	<div class="p-inputgroup flex-1">
		<MultiSelect
			v-model="selectedCities"
			:options="cities"
			optionLabel="name"
			placeholder="Выберите город"
		/>
		<Button
			v-if="selectedCities.length"
			icon="pi pi-times"
			severity="danger"
			@click="handlerReset"
		/>
	</div>
</template>
