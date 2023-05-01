<script lang="ts">
import { Vue, Component, Ref } from 'vue-facing-decorator'
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';

enum Stage {
	URL,
    TITLE,
    LINK
}

@Component({
    components: {
		InputText,
        InputMask,
		Button
    }
})
export default class Link extends Vue {

	public url: string = '';
	public title: string = '';
	public mask: string = 'http://' +  Array(100).fill('*').join('');
	public stage: Stage = Stage.URL

	@Ref
	readonly inputUrlRef!: HTMLInputElement | null
	@Ref
	readonly inputTitleRef!: HTMLInputElement | null

	handlerBlurInput():void {
		if(this.url.length && !this.title.length) {
			this.toogleToStageTitle()
			return
		}

		if(this.url.length && this.title.length){
			this.stage = Stage.LINK
		}
	}

	toogleToStageUrl():void {
		this.stage = Stage.URL

		this.$nextTick(() => {
			this.inputUrlRef?.$el?.focus()
		});
	}

	toogleToStageTitle():void {
		this.stage = Stage.TITLE

		this.$nextTick(() => {
			this.inputTitleRef?.$el?.focus()
		});
	}

	isStageUrl():boolean {
		return this.stage === Stage.URL
	}

	isStageTitle():boolean {
		return this.stage === Stage.TITLE
	}
}
</script>

<template>
	<div>
		<div v-if="isStageUrl()" class="p-inputgroup">
			<InputMask
				ref="inputUrlRef"
				v-model="url"
				:mask="mask"
				placeholder="http://"
				:unmask="true"
				:autoClear="false"
				slotChar=""
				@blur="handlerBlurInput"
				@keyup.enter="handlerBlurInput"
			/>
		</div>

		<div v-else-if="isStageTitle()" class="p-inputgroup">
			<InputText
				ref="inputTitleRef"
				v-model="title"
				placeholder="Введите название"
				@blur="handlerBlurInput"
				@keyup.enter="handlerBlurInput"
			/>
		</div>

		<div v-else class="flex align-items-center">
			<div>
				<a class="no-underline text-lg mr-2" :href="url"> {{ title }} </a>
			</div>
			<Button
				icon="pi pi-pencil"
				severity="primary"
				text
				rounded
				size="small"
				@click="toogleToStageUrl"
			/>
		</div>
	</div>
</template>
