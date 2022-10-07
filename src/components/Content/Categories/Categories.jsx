import React, { useState } from 'react';

const Categories = ({ value, onClickCategory }) => {

   const categories = ['Все', 'Мясные', "Вегетарианские", "Гриль", "Острые", "Закрытые"];

   return (<div className="categories">
      {
         <ul>
            {categories.map((c, i) => (
               <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>{c}</li>
            ))}
         </ul>
      }
   </div >);
}

export default Categories;