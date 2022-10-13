import { RootState } from "../../@types/types";
// ** Редакс-селектор - обычная функция, которая, так же как и анонимная функция в useSelector'e, вытаскивает данные из стейта и передает их в useSelector, и далее экспортируется в нужный селектор;
// ?? Про типизацию: здесь мы просто типизируем ту часть стэйта, которую должны получить, потому что это селектор, поэтому в аргументе указываем типизацию всего стейта, а вот уже функция вернёт нужную нам часть стейта. RootState берётся из store.ts.

// todo Selectors from cartSlice
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

// todo Selectors from productSlice
export const selectItemsData = (state: RootState) => state.product;

// todo Selectors from filterSlice
export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;