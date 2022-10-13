import React, { memo, useState } from 'react';
import { CategoriesPropsType, CategoryType } from '../../../@types/types';

const categories: CategoryType[] = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

export const Categories: React.FC<CategoriesPropsType> = memo(({ value, onClickCategory }) => {

   return (<div className="categories">
      {
         <ul>
            {categories.map((c, i) => (
               <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>{c}</li>
            ))}
         </ul>
      }
   </div >);
})