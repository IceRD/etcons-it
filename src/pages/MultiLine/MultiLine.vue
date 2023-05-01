<script lang="ts">
import { Vue, Component, Ref } from 'vue-facing-decorator'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

@Component({
	components: {
		DataTable,
        Column
	}
})
export default class MultiLine extends Vue {
	public products = [{
    id: '1',
    text: `[13:36:53] Расчетное время: 9 мин
[13:36:58] Открыть клапан откачки К1
[13:36:58] Включить вакуумный насос
[13:36:58] Закрыть клапан К5
[13:36:58] Закрыть клапан дистилляции К2
[13:36:58] Ожидание: 8 с
[13:37:06] Заливка 2.2мл. в испаритель
[13:37:06] Заданно 26.50602409638554 шагов
[13:37:09] Заливка перекиси завершена
[13:37:09] Открыть клапан дистилляции К2
[13:42:09] Включить нагрев испарителя
[13:42:09] Закрыть клапан дистилляции К2
[13:42:09] конечное давление1.0960040758227925 торр
[13:42:09] Выпаривание через К2
[13:42:09] Выпаривание длилось5 мин
[13:42:09] Откачка до 1 торр
[13:42:15] Закрыть клапан откачки К1
[13:43:09] Открыть клапан откачки К1
[13:43:14] Аппаратное смещение 0 денсит. = -0.313683180809021
[13:43:14] Закрыть клапан дистилляции К2`
}]

	private _timer: ReturnType<typeof setInterval>

    mounted() {
		this._timer = setInterval((): void => {
			const date = new Date();
			const datetime = date.toLocaleTimeString();
			const text = (Math.random() + 1).toString(36).substring(2)
			const _arr = this.products[0].text.split('\n').slice(1);
			_arr.push(`[${datetime}] ${text}`)
			this.products[0].text = _arr.join('\n');
		}, 1000)
	}

    unmounted() {
		clearInterval(this._timer)
	}
}
</script>

<template>
	<div>
		<DataTable :value="products" showGridlines>
			<Column field="text" header="text" style="white-space: pre-wrap;"></Column>
		</DataTable>
	</div>
</template>
