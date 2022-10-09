import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice.js'

// ** configureStore - создаёт хранилище, внутри в поле reducer передаём наши созданные слайсы, в которых и будет происходить вся логика по изменению стейта;
export const store = configureStore({
   reducer: {
      filter,
   },
})

// todo ///  useSelector - внутри этого хука вшит useContext, у него есть свой провайдер и контекст. Внутрь юсСелектора передаём функцию, которая принимает стейт и возращает то, что нам нужно, например (const categoryId = useSelector((state) => state.filter.categoryId))

// todo /// useDispatch - хук, внутрь которого передаётся какой-то экшен, то есть действие, которое нужно сделать. Присваевается обычно переменной, const dispatch = useDispatch(). Если в диспатч нужно, что-то передать, то в файл, в котором это будет происходить, нужно импортировать слайс. И уже затем в диспатч передать этот слайс, и если нужно, в качестве аргумента
