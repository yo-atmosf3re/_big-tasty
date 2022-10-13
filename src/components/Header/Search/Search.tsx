import React, { ChangeEvent, useCallback, useContext, useRef, useState } from 'react';
import styles from './Search.module.scss'
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../../redux/slices/filterSlice'

export const Search: React.FC = React.memo(() => {
   const dispatch = useDispatch();
   const [value, setValue] = useState('');

   const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
      updateSearchValue(e.currentTarget.value)
   }
   const updateSearchValue = useCallback(
      debounce((str) => {
         dispatch(setSearchValue(str))
      }, 300),
      []
   )
   const clearSearchInputHandler = () => {
      dispatch(setSearchValue(''))
      setValue('')
      inputRef.current?.focus()
   }

   const inputRef = useRef<HTMLInputElement>(null);
   return (
      <div className={styles.root}>
         <svg className={styles.icon} viewBox="0 0 32 32" >
            <title />
            <g >
               <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
            </g>
         </svg>
         <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder='Поиск пиццы...' />
         {value &&
            <svg onClick={clearSearchInputHandler} className={styles.clearIcon} height="14px" viewBox="0 0 14 14" width="14px" >
               <title />
               <desc />
               <defs />
               <g fill="none" id="Page-1" stroke="none">
                  <g fill="#000000" id="Core" transform="translate(-341.000000, -89.000000)">
                     <g id="close" transform="translate(341.000000, 89.000000)">
                        <path d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z" id="Shape" />
                     </g>
                  </g>
               </g>
            </svg>}
      </div>
   );
})