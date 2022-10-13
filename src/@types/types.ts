import { useDispatch } from "react-redux";
import { store } from "../redux/store";

// ?? Typing for components
// ?? Sort.tsx
export type SortPropsType = {
   sort: SortType
}
export type SortTitleType = {
   name: 'популярности (↓)' | 'популярности (↑)' | 'цене (↓)' | 'цене (↑)' | 'алфавиту (↓)' | 'алфавиту (↑)'
   sortProperty: SortPropertyEnum
}
export enum SortPropertyEnum {
   RATING_DESC = "rating",
   RATING_ASC = "-rating",
   TITLE_DESC = "title",
   TITLE_ASC = "-title",
   PRICE_DESC = "price",
   PRICE_ASC = "-price",
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
// ** Типизация для всего стэйта
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
// ** cartSlice.ts
export interface CartSliceState {
   totalPrice: number
   items: CartItemType[]
}
export type CartItemType = {
   id: string
   imageUrl: string
   title: string
   type: string
   size: number
   price: number
   count: number
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
export enum Status { LOADING = 'loading', SUCCESS = 'success', ERROR = 'error' }
export interface ProductSliceState {
   items: ItemProductType[];
   status: Status
}
export type ItemProductType = {
   id: string
   title: string
   price: number
   imageUrl: string
   sizes: Array<number>
   types: Array<number>
}
export type FetchProductsArgumentsType = {
   order: string,
   sortBy: string,
   categorySelection: string,
   search: string,
   pageCount: number
};