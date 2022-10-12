import { store } from "../redux/store";

// ?? Typing for components
// ?? Sort.tsx
export type SortTitleType = {
   name: 'популярности (↓)' | 'популярности (↑)' | 'цене (↓)' | 'цене (↑)' | 'алфавиту (↓)' | 'алфавиту (↑)'
   sortProperty: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title'
}
export type PopupClick = React.MouseEvent<HTMLBodyElement> & {
   composedPath: (tar?: HTMLElement) => EventTarget[];
}
// ?? FullProduct.tsx
export type ProductType = {
   id: string,
   imageUrl: string,
   title?: string,
   types?: Array<number>
   sizes?: Array<number>,
   price: number,
   category?: number,
   rating?: number
}
// ?? Categories.tsx
export type CategoriesPropsType = {
   value: number
   onClickCategory: (i: number) => void
}
export type CategoryType = "Все" | "Мясные" | "Вегетарианские" | "Гриль" | "Острые" | "Закрытые";
// ?? CartItem.tsx
export type CartItemPropsType = {
   id: string,
   imageUrl: string,
   title: string,
   type: string,
   size: number,
   price: number,
   count: number,
}
// ?? Pagination.tsx
export type PaginationPropsType = {
   pageCount: number
   onChangePagination: (value: number) => void
}
// ?? ProductBlock.tsx
export type ProductBlockPropsType = {
   id: string
   title: string
   price: number
   imageUrl: string
   sizes: Array<number>
   types: Array<number>
}
export type NamesType = "тонкое" | "традиционное"

// ** Typing for redux-toolkit
// ** store.ts
export type RootState = ReturnType<typeof store.getState>
// ** cartSlice.ts
export interface CartSliceState {
   totalPrice: number
   items: CartItem[]
}
export type CartItem = {
   id: string
   imageUrl: string
   title: string
   type: string
   size: number
   price: number
   count?: number
}
// ** filterSlice.ts
export type SortType = SortTitleType
export interface FilterSliceState {
   searchValue: string
   categoryId: number
   pageCount: number
   sort: SortType
}
// ** productSlice.ts
export interface ProductSliceState {
   items: ItemType[];
   status: 'loading' | 'success' | 'error'
}
export type ItemType = {
   id: string
   title: string
   price: number
   imageUrl: string
   sizes: Array<number>
   types: Array<number>
}
export type FetchProductsArgumentsType = Record<string, string>;