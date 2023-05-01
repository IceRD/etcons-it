export enum InventoryStatusEnum {
	LOWSTOCK = 'LOWSTOCK',
	INSTOCK = 'INSTOCK',
	CANCELLED = 'CANCELLED',
	RETURNED = 'RETURNED',
	DELIVERED = 'DELIVERED',
	OUTOFSTOCK = 'OUTOFSTOCK',
}

export type InventoryStatus = keyof typeof InventoryStatusEnum

export enum StatusUIEnum {
	SUCCESS = 'success',
	WARNING = 'warning',
	DANGER = 'danger',
}

export type FilterFields = 'name' | 'price' | 'category' | 'rating' | 'status'

// export interface FilterFields {
// 	name: string
// 	price: string
// 	category: string
// 	rating: string
// 	status: string
// }

// export enum FilterFieldsEnum {
// 	NAME = 'name',
// 	IMAGE = 'image',
// 	PRICE = 'price',
// 	CATEGORY = 'category',
// 	RATING = 'rating',
// 	STATUS = 'status',
// }

export interface IProduct {
	id: string
	code: string
	name: string
	description: string
	image: string
	price: number
	category: string
	quantity: number
	status: InventoryStatus
	rating: number
}

export interface IColumns {
	field: string
	header: string
}
