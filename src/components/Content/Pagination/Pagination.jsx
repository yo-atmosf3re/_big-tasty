import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

const Pagination = ({ value, onChangePagination }) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         nextLabel=">"
         onPageChange={(e) => onChangePagination(e.selected + 1)}
         pageRangeDisplayed={4}
         pageCount={3}
         forcePage={--value}
         previousLabel="<"
         renderOnZeroPageCount={null}
      />
   )
}

export default Pagination
