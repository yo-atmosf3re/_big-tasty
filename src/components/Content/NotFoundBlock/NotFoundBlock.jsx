import React from 'react'
import s from './NotFoundBlock.module.scss'
console.log(s)

const NotFoundBlock = () => {
   return (
      <div className={s.main}>
         <h1 >
            <span>😟</span>
            <br />
            Ничего не найдено
         </h1>
         <p>К сожалению данныя страница отсутствует в нашем интернет-магазине</p>
      </div>
   )
}

export default NotFoundBlock