import React from 'react'
import Button from '../atoms/button'
import { AddIcon } from '../atoms/icons'
const ButtonAction = ({className,onClick,label}) => {
  return (
    <>
         <Button onClick={onClick}>  
                              <div className="flex items-center">
                                <AddIcon />
                                <span className="ms-3">{label}</span>
                              </div> 
                          </Button>
    </>
  )
}

export default ButtonAction
