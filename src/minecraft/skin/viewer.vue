<template>
	<module>
		<p-topbar>
			<Texter v-model="forms.store.nick" label-split="" class="w-72" label="玩家名" />
			<Texter v-model="forms.store.name" label-split="" class="w-72" label="用户名" />
			<Click class="w-16" text="入库" @click="atStore" />
			<Click ref="upload" class="w-16" text="上传" />
			<Click ref="upload" class="w-20 lead" text="切换主题" @click="toggleTheme" />
		</p-topbar>

		<canvas ref="canvasSkin" skin3d width="180" height="320" />

		<p-list>
			<p-item v-for="skinLite of skinsLite" :key="`list-${skinLite.nick}-${skinLite.timeInsert}`" @click="atSelectSkin(skinLite)">
				<div class="inblock w-6 select-none">●</div>
				<div class="inblock elli w-48" :title="skinLite.nick">{{ skinLite.nick }}</div>
				<div class="inblock elli w-48" :title="skinLite.ProfileName">{{ skinLite.ProfileName }}</div>
				<div class="hidden lg:inblock elli w-32 text-center select-none" :title="skinLite.timeInsert">{{ skinLite.fromNow }}</div>
				<img class="hidden lg:inblock select-none" :src="`./api/minecraft/skin/image?hash=${skinLite.SkinHash}`" alt="原文件" />
			</p-item>
		</p-list>
	</module>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Day from '../../lib/day.pure.js';

import { Texter, Click } from '@nuogz/vue-components';
import { $get, $post } from '@nuogz/aegis';

import SkinManager from './SkinManager.js';



const toggleTheme = () => document.querySelector(':root').classList.toggle('color-scheme-dark');

const forms = ref({
	store: { nick: '', name: '', t: 1 }
});


const canvasSkin = ref(null);

const skinsLite = ref([]);


let skinManager;


const atSelectSkin = ({ SkinHash, SkinModel }) => skinManager.applyURL(`./api/minecraft/skin/image?hash=${SkinHash}`, SkinModel == 1, 3);
const atQuery = async () => {
	const result = await $get('minecraft/skin/list');

	result.forEach(skin => skin.fromNow = Day(skin.timeInsert).fromNow());

	skinsLite.value = result;

	if(result[0]) { atSelectSkin(result[0]); }
};


const onResizeWindow = () => {
	const style = window.getComputedStyle(canvasSkin.value);

	skinManager.resize(
		(Number.parseFloat(style.width) - Number.parseFloat(style.paddingLeft) - Number.parseFloat(style.paddingRight)),
		Number.parseFloat(style.height) - Number.parseFloat(style.paddingTop) - Number.parseFloat(style.paddingBottom)
	);
};
const atStore = async () => {
	await $post('minecraft/skin/store', forms.value.store);

	atQuery();
};

onMounted(async () => {
	skinManager = new SkinManager(canvasSkin.value);

	await atQuery();

	window.addEventListener('resize', onResizeWindow);
	onResizeWindow();
});
</script>

<style lang="sass" scoped>
p-topbar
	@apply block flex gap-4 w-full p-4 h-16 leading-8

[skin3d]
	@apply mx-2 lg:w-[calc(var(--spc)*90)] inblock shadow-mdd rounded-md
	width: calc(var(--spc) * 45)

p-list
	@apply relative inblock overflow-x-hidden overflow-y-auto

	max-width: calc(100vw - var(--spc) * (45 + 8))
	height: calc(100vh - var(--spc) * (8 + 8))

	p-item
		@apply block cursor-pointer h-16 px-4 rounded-md hover:text-[var(--cMain)] hover:font-bold
		line-height: calc(var(--spc) * 16)


@media (min-width: 1024px)
	p-list
		@apply w-auto
		max-width: calc(100vw - var(--spc) * (90 + 8))
</style>
