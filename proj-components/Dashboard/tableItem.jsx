import React from 'react'

export const SampleTableCheckBox = ({data, bodyData})=>{
    return (
        <div>
            <CheckBoxComp status={data.find((item)=> item._id === bodyData._id) ? 'true' : 'false'}/>
        </div>
    );
  }


  export const SelectFillIcon =()=>{
    return(
        <span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#121212"/>
  <path d="M13 4L6 12.3333L3 9" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  
  
  
        </span>
    )
  }
  
  export const SelectIcon =()=>{
    return(
        <span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="#FEFEFE" stroke="#121212"/>
            </svg>
        </span>
    )
  }

  export const CheckBoxComp = (status)=>{
    return(
        <div>
            {status.status === 'true' ?
                <SelectFillIcon/> :
                status.status === 'false' ?
                    <SelectIcon/>:
                   ''
            }
        </div>
    )
  }



  export const ClickCheckBoxComp = (status)=>{
    return(
        <div className="cursor-pointer">
            {status.status === 'true' ?
                <SelectFillIcon/> :
                status.status === 'false' ?
                    <SelectIcon/>:
                    ''
            }
        </div>
    )
  }
