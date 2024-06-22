import { MouseMenuDirective } from '@howdyjs/mouse-menu';



/**
 * @param {import('vue').App} app
 * @returns {Promise<void>}
 */
export const install = async app => {
	app.directive('menu', {
		mounted: (el, binding, vnode, prevVNode) =>
			binding.value?.menuList?.length
				? MouseMenuDirective.mounted(el, binding, vnode, prevVNode)
				: void 0,
		unmounted: MouseMenuDirective.unmounted,
	});
};
