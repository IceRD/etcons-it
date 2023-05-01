<script setup lang="ts">
import Menubar from 'primevue/menubar';
import { computed } from "vue";
import { routes } from "~/router"

const items = computed(() => {
	return routes.map(one => {
		return {
            label: one.name,
			to: one.path,
            icon: 'pi pi-check',
        }
	})
})
</script>

<template>
	<div class="m-auto w-8 card">
		<div class="border-round bg-blue-100 p-3 m-3">
			<Menubar :model="items" />
		</div>
		<div class="border-round bg-blue-50 p-3 m-3">
			<slot />
		</div>
	</div>
</template>
