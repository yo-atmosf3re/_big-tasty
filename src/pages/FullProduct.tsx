import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductType } from '../@types/types';



const FullProduct: React.FC = () => {
   const [product, setProduct] = useState<undefined | ProductType>();
   // ** Чтобы вытащить какие-то параметры из URL используется хук useParams из библиотеки react-router-dom. Так же перерисовывает компоненту если в адресной строке, что-то поменялось. В роуте указываем переменную, например вот так (path='/pizza/:id'), и когда в url-строке будет отображаться данный путь, то вместо айди будет та цифра, которую мы указали, то есть - это значение переменной айди. Затем просто извлекаем такие переменные куда нам нужно и работаем с этим, например вставляем в код, и если эта переменная изменится, то будет ререндер.

   const { id } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get(`https://633fd93ae44b83bc73c298e6.mockapi.io/items/${id}`)
            setProduct(data)
         } catch (error) {
            alert('Ошибка при получении данных о товаре, попробуйте позже!')
            navigate('/')
         }
      }
      fetchPizza();
   })

   return (
      <>
         {!product ? 'Загрузка...' : <div className='container' >
            <img src={product.imageUrl} alt="" />
            <h2>{product.title}</h2>
            <h4>{product.price} ₽</h4>
         </div >}
      </>
   )
}

export default FullProduct
