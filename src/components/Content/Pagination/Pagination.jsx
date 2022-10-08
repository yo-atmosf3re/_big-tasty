import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

const Pagination = ({ onChangePagination }) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         nextLabel=">"
         onPageChange={event => console.log(event)}
         pageRangeDisplayed={8}
         pageCount={3}
         previousLabel="<"
         renderOnZeroPageCount={null}
      />
   )
}

export default Pagination
