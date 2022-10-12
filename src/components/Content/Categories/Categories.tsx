import React, { useState } from 'react';
import { CategoriesPropsType, CategoryType } from '../../../@types/types';

const Categories: React.FC<CategoriesPropsType> = ({ value, onClickCategory }) => {

   const categories: CategoryType[] = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

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