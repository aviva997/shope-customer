import React from 'react';
import { Box, ButtonGroup, Button } from "@chakra-ui/react";


const Pagination = ({currentPage, shoesPerPage, totalShoes, onPageChange}) => {
    const totalPage = Math.ceil(totalShoes/ shoesPerPage)

    const handleClick = (page)=>{
        onPageChange(page)
    }

    const renderPaginationButton = ()=>{
        const buttons = [];
        for(let i =1; i<=totalPage; i++){
            buttons.push(
                <Button
                key={i}
                colorScheme={currentPage === i ?"teal":"gray"}
                onClick={()=>handleClick(i)}
                >
                    {i}
                </Button>
            )
        }

        return buttons
    }
  return (
    <Box my={5}>
        <ButtonGroup spacing={2}> {renderPaginationButton()}</ButtonGroup>

    </Box>
  )
}

export default Pagination;