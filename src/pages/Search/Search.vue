<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Rating  from 'primevue/rating';
import Tag   from 'primevue/tag';
import InputText   from 'primevue/inputtext';
import Button   from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import ProductService from './ProductService'
import Dialog from 'primevue/dialog'
import Checkbox from 'primevue/checkbox'
import { IProduct, IColumns, InventoryStatusEnum, StatusUIEnum, FilterFields } from './types.ts'

onMounted(async () => {
	products.value = ProductService.getProducts()
})

const columns = ref<IColumns[]>([
    {field: 'name', header: 'Name'},
    {field: 'image', header: 'Image'},
    {field: 'price', header: 'Price'},
    {field: 'category', header: 'Category'},
    {field: 'rating', header: 'Rating'},
    {field: 'status', header: 'Status'},
]);

const filterDataKeys: FilterFields[] = ['name', 'price', 'category', 'rating', 'status']
const searchFilterList = columns.value.filter((column) => {
	return filterDataKeys.includes(column.field)
})

// Products
let products = ref<IProduct[] | null>(null);

const selectedProduct = ref<IProduct[]>([]);

function  formatCurrency (value: number): string  {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const getSeverity = (product: IProduct ): StatusUIEnum | null => {
    switch (product.status) {
        case InventoryStatusEnum.INSTOCK:
            return StatusUIEnum.SUCCESS;

        case InventoryStatusEnum.LOWSTOCK:
            return StatusUIEnum.WARNING;

        case InventoryStatusEnum.OUTOFSTOCK:
            return StatusUIEnum.DANGER;

        default:
            return null;
    }
};

const selectedColumns = ref<IColumns[]>(columns.value);

function onToggle (val: IColumns[]): void {
    selectedColumns.value = columns.value.filter(col => val.includes(col));
};

// Filter
const searchInput = ref<string>('');

const selectedSearchFilter = ref(filterDataKeys);

function resetSearchInput (): void {
    searchInput.value = ''
	products.value = ProductService.getProducts()
};

const modal = ref<boolean>(false);

function modalFilter(): void {
	modal.value = true
}

function handleSearch() {
	if(searchInput.value.trim().length == 0 || selectedSearchFilter.value.length === 0) {
		products.value = ProductService.getProducts()
	}

	products.value = ProductService.getProductsWithFilter({
		filters: selectedSearchFilter.value,
		search: searchInput.value
	})
}
</script>

<template>
	<div>
		<DataTable
			v-model:selection="selectedProduct"
			:value="products"
			paginator
			:rows="5"
			:rowsPerPageOptions="[5, 10, 20, 50]"
		>
			<template #header>
				<div class="grid">
					<div class="col-fixed" style="width: 80%">
						<div class="p-inputgroup flex-1">
							<Button icon="pi pi-filter" severity="success" @click="modalFilter" />
							<InputText v-model="searchInput" placeholder="Поиск..." />
							<Button
								v-if="searchInput.length"
								icon="pi pi-times"
								severity="danger"
								@click="resetSearchInput"
							/>
							<Button severity="primary" label="Search" @click="handleSearch" />
						</div>
					</div>
					<div class="col-fixed" style="width: 20%">
						<MultiSelect
							:modelValue="selectedColumns"
							class="w-full"
							:options="columns"
							optionLabel="header"
							@update:modelValue="onToggle"
							placeholder="Select Columns"
						/>
					</div>
				</div>
			</template>

			<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

			<template v-for="col of selectedColumns" :key="col.field">
				<Column v-if="col.header === 'Image'" header="Image">
					<template #body="slotProps">
						<img
							:src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
							:alt="slotProps.data.image"
							class="w-6rem h-4rem shadow-2 border-round"
						/>
					</template>
				</Column>

				<Column v-else-if="col.header === 'Price'" field="price" header="Price" sortable>
					<template #body="slotProps">
						{{ formatCurrency(slotProps.data.price) }}
					</template>
				</Column>

				<Column
					v-else-if="col.header === 'Status'"
					header="Status"
					field="status"
					:sortable="true"
				>
					<template #body="slotProps">
						<Tag
							:value="slotProps.data.status"
							:severity="getSeverity(slotProps.data)"
						/>
					</template>
				</Column>

				<Column v-else-if="col.header === 'Rating'" field="rating" header="Rating" sortable>
					<template #body="slotProps">
						<Rating :modelValue="slotProps.data.rating" readonly :cancel="false" />
					</template>
				</Column>

				<Column v-else :field="col.field" :header="col.header" sortable />
			</template>
		</DataTable>

		<Dialog
			v-model:visible="modal"
			:style="{width: '450px'}"
			header="Поиск по колонкам"
			:modal="true"
		>
			<div class="flex flex-column gap-3">
				<div
					v-for="filter in searchFilterList"
					:key="filter.field"
					class="flex align-items-center gap-3"
				>
					<Checkbox
						v-model="selectedSearchFilter"
						:inputId="filter.field"
						name="category"
						:value="filter.field"
					/>
					<label :for="filter.field">{{ filter.header }}</label>
				</div>
			</div>
		</Dialog>
	</div>
</template>
