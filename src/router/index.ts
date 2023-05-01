import { createRouter, createWebHistory } from 'vue-router'

export enum RouteNames {
	link = 'Link',
	dateTime = 'DateTime',
	multiLine = 'MultiLine',
	select = 'Select',
	search = 'Search',
}

const routes = [
	{
		path: '/',
		name: RouteNames.link,
		component: () => import('~/pages/Link'),
	},
	{
		path: '/date-time',
		name: RouteNames.dateTime,
		component: () => import('~/pages/DateTime'),
	},
	{
		path: '/select',
		name: RouteNames.select,
		component: () => import('~/pages/Select'),
	},
	{
		path: '/data-table',
		name: RouteNames.multiLine,
		component: () => import('~/pages/MultiLine'),
	},
	{
		path: '/search',
		name: RouteNames.search,
		component: () => import('~/pages/Search'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export { router, routes }
