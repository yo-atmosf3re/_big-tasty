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
               <li onClick={() => onClickCategory(i)} className={activeIndex === i ? 'active' : ''}>{c}</li>
            ))}
         </ul>
      }
   </div >);
}

{/* <ul>
         <li onClick={() => onClickCategory(0)} className={activeIndex === 0 ? 'active' : ''}>Все</li>
         <li onClick={() => onClickCategory(1)} className={activeIndex === 1 ? 'active' : ''}>Мясные</li>
         <li onClick={() => onClickCategory(2)} className={activeIndex === 2 ? 'active' : ''}>Вегетарианская</li>
         <li onClick={() => onClickCategory(3)} className={activeIndex === 3 ? 'active' : ''}>Гриль</li>
         <li onClick={() => onClickCategory(4)} className={activeIndex === 4 ? 'active' : ''}>Острые</li>
         <li onClick={() => onClickCategory(5)} className={activeIndex === 5 ? 'active' : ''}>Закрытые</li>
      </ul> */}

export default Categories;