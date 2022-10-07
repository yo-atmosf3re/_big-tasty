import React, { useState } from 'react';

const Categories = () => {
   const [activeIndex, setActiveIndex] = useState(0);
   const onClickCategory = (index) => {
      setActiveIndex(index);
   }
   const categories = ['Все', 'Мясные', "Вегетарианские", "Гриль", "Острые", "Закрытые"];

   return (<div className="categories">
      {
         <ul>
            {categories.map((c, i) => (
               <li key={i} onClick={() => onClickCategory(i)} className={activeIndex === i ? 'active' : ''}>{c}</li>
            ))}
         </ul>
      }
   </div >);
}

export default Categories;