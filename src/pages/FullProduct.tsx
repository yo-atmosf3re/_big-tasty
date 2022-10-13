import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
            <Link to='/'>
               <div className="button button--outline button--add">
                  <svg
                     width="12"
                     height="12"
                     viewBox="0 0 12 12"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                     />
                  </svg>
                  <span>Назад </span>
               </div>
            </Link>
         </div >}
      </>
   )
}

export default FullProduct
