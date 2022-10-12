import React from 'react'
import ReactPaginate from 'react-paginate';
import { PaginationPropsType } from '../../../@types/types';
import styles from './Pagination.module.scss'

const Pagination: React.FC<PaginationPropsType> = ({ pageCount, onChangePagination }) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         nextLabel=">"
         onPageChange={(e) => onChangePagination(e.selected + 1)}
         pageRangeDisplayed={4}
         pageCount={3}
         forcePage={--pageCount}
         previousLabel="<"

      />
   )
}

export default Pagination
