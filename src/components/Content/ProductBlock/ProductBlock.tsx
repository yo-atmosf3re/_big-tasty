import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '../../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { CartItem, NamesType, ProductBlockPropsType } from '../../../@types/types';

const typeNames: NamesType[] = ["тонкое", "традиционное"]


const ProductBlock: React.FC<ProductBlockPropsType> = ({ id, title, price, imageUrl, sizes, types }) => {
   const dispatch = useDispatch();
   const cartItem = useSelector(selectCartItemById(id))

   const [productCount, setProductCount] = useState<number>(0)
   const [typeIndex, setTypeIndex] = useState<number>(0);
   const [sizeIndex, setSizeIndex] = useState<number>(0);

   const addedCount = cartItem ? cartItem.count : 0;

   const productCountClickHandler = () => setProductCount(productCount + 1)
   const onClickAddProduct = () => {
      const item: CartItem = {
         id, title, price, imageUrl,
         type: typeNames[typeIndex],
         size: sizes[sizeIndex],

      }
      dispatch(addItem(item));
   }



   return (<div className='pizza-block--wrapper'>
      <div className="pizza-block">
         <Link to={`/product/${id}`}>
            <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
         </Link>
         <h4 className="pizza-block__title">{title}</h4>
         <div className="pizza-block__selector">
            <ul>
               {
                  types.map((t) => (<li key={t} onClick={() => setTypeIndex(t)} className={typeIndex === t ? 'active' : ''}>{typeNames[t]}</li>))
               }
            </ul>
            <ul>
               {
                  sizes.map((s, i) => (<li key={s} onClick={() => setSizeIndex(i)} className={sizeIndex === i ? 'active' : ''}>{s} см.</li>))
               }
            </ul>
         </div>
         <div className="pizza-block__bottom" onClick={productCountClickHandler}>
            <div className="pizza-block__price">от {price} ₽</div>
            <div onClick={onClickAddProduct} className="button button--outline button--add">
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
               <span>Добавить</span>
               {addedCount && addedCount > 0 && <i>{addedCount}</i>}
            </div>
         </div>
      </div>
   </div>);
}

export default ProductBlock;