import React, { useContext } from 'react';
import styles from './Search.module.scss'
import { SearchContext } from '../../../App';

const Search = React.memo(() => {
   const searchValueOnChangeHandler = (e) => setSearchValue(e)
   const clearSearchInputHandler = () => setSearchValue('')
   const { searchValue, setSearchValue } = useContext(SearchContext);
   return (
      <div className={styles.root}>
         <svg className={styles.icon} viewBox="0 0 32 32" >
            <title />
            <g >
               <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
            </g>
         </svg>
         <input value={searchValue} onChange={(e) => { searchValueOnChangeHandler(e.currentTarget.value) }} className={styles.input} placeholder='Поиск пиццы...' />
         {searchValue &&
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

export default Search;