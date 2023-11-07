import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

const PaginationComp = ({ handlePrevBtn, handleNextBtn, page, pageCount, setPage }) => {
    return (
        <div className=' pagination_div d-flex justify-content-end mx-5'>
            {pageCount > 0 &&
                <Pagination>
                    <Pagination.Prev onClick={() => handlePrevBtn()} />

                    {Array(pageCount).fill(null).map((ele, index) => {
                        return <Pagination.Item active={page == index + 1 ? true : false} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                    })}


                    <Pagination.Next onClick={() => handleNextBtn()} />
                </Pagination>
            }
        </div>
    )
}

export default PaginationComp