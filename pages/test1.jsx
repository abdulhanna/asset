// import React from 'react'
// import { useState } from 'react'

// export const SampleTableCheckBox = ({data, bodyData})=>{

//     return (
//         <div>
//             <CheckBoxComp status={data.find((item)=> item._id === bodyData._id) ? 'true' : 'true'}/>
//         </div>
//     );
// }





// export const CheckBoxComp = (status)=>{
//     console.log(status,'')
//     return(
//         <div>
//         <SelectFillIcon/>
//             {/* {status.status === 'true' ?
//                 <SelectFillIcon/> :
//                 status.status === 'false' ?
//                 <SelectIcon/> :
//                    ''
//             } */}
//         </div>
//     )
// }


// const classes = {
//     table: 'w-full text-sm text-left  ',
//     thead: 'text-sm  uppercase bg-primary border-b text-gray-500  font-semibold',
//     tbody: 'bg-white cursor-pointer',
//     tr: 'text-white font-medium text-sm text-left',
//     th: 'px-6 py-4  truncate',
//     td: 'px-6 py-4 text-sm font-normal max-w-table  tracking-tighter turncate text-primary border-t border-gray-200',
//   };
  
//   const clases = {
//     table: 'w-full text-sm text-left  ',
//     thead: 'text-sm  uppercase bg-primary border-b text-gray-500  font-semibold',
//     tbody: 'bg-white ',
//     tr: 'text-white font-medium text-sm text-left',
//     th: 'px-6 py-4  truncate',
//     td: 'px-6 py-4 text-sm font-normal  tracking-tighter turncate text-primary border-t border-gray-200',
//   };


//   const headerDataNew = [
//     { name: 'date',
//       label: 'Date' },
//     {
//       name: 'sampleId',
//       label: 'Sample ID',
//     },
//     {
//       name: 'qrCode',
//       label: 'QR Code',
//     },
//     {
//       name: 'sourceData',
//       label: 'Source Type',
//     },
//     {
//       name: 'locationData',
//       label: 'Location',
//     },
//     {
//       name: 'subSourceData',
//       label: 'Sub Location',
//     },
//     {
//       name: 'type',
//       label: 'Type',
//     }
//   ];

// export const SelectFillIcon =()=>{
//     return(
//         <span>
//           <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
// <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#121212"/>
// <path d="M13 4L6 12.3333L3 9" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>



//         </span>
//     )
// }

// export const SelectIcon =()=>{
//     return(
//         <span>
//           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="#FEFEFE" stroke="#121212"/>
//             </svg>
//         </span>
//     )
// }

// export const ClickCheckBoxComp = (status)=>{
//     return(
//         <div className="cursor-pointer">
//             {status.status === 'true' ?
//                 <SelectFillIcon/> :
//                 status.status === 'false' ?
//                     <SelectIcon/>:
//                     ''
//             }
//         </div>
//     )
// }

// export const NewSampleTableComponent = ({ headers,
//     body,
//     href,
//     onClick,
//     responseData,
//     extraclasses,}) =>{
// return (
// <div className="h-auto py-8">
// <div className="relative overflow-x-auto rounded-lg">
// <SampleTable
// headers={headers}
// data={body}
// classes={classes}
// href={href}
// extra={extraclasses}
// onClick={onClick}
// responseData={responseData}
// />
// </div>
// </div>
// );
// }

// export const SampleTable = ({
//     headers,
//     data,
//     classes,
//     href = '',
//     extra,
//     onClick,
//     responseData,
// }) => {
//     const [isActive,setIsActive] = useState(false)
// const lastIndex = headers.length - 1;
// console.log(headers,'header')
// return (
// <table className={classes.table}>
// <thead className={classes.thead}>
// <tr className={classes.tr}>

//  {headers.map((item, index) => (

//     <th
//                         className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${
//                             index === lastIndex && 'rounded-tr-lg'
//                         }`}
//                         scope="col"
//                         onClick={()=> index === 0 ? clickAll('click'):handleSortClick(item.name)}
//                     >
//                         <div className="flex flex-row">
//                             {index === 0 ? <ClickCheckBoxComp status={checkAllStatus === true ? "true": "false"} /> : typeof item.label === 'function' ? item.label() : item.label}
//                             {!(index === 0) && <div>{renderSortIcon(item.name)}</div>}
//                         </div>

//                     </th>
//  ))}
// </tr>
// </thead>

// <tbody className={classes.tbody}>
// {data.map((dataRow, index) => {
//  return (

//          <tr>

//              {headers.map((item,index) => {
//                  return (
//                      <td
//                          key={item.name}
//                          className={`${classes.td} ${extra}`}
//                          onClick={() => {
//                              if(index === 0){
//                                 // console.log('check')
//                                  responseData && responseData(dataRow);
//                              }else{
//                                  onClick && onClick(dataRow);
//                              }
//                          }}
//                      >
//                          {typeof dataRow[item.name] === 'function'
//                              ? dataRow[item.name]()
//                              : dataRow[item.name]}
//                      </td>
//                  );
//              })}
//          </tr>

//  );
// })}
// </tbody>
// </table>
// );
// };

// export const SampleTableReceived = ({
//     headerData,
//     response,
//     onClick,
//     responseData,
//     checkedData,
//          samplePermission,
//          currentPage,
//          pageSize,
//          onPageChange,
//          chemicalPaginationData,
//          microPaginationData,
//          type

//      }) => {

// return (
//     <>
//     <NewSampleTableComponent
//     headers={headerData}
//     onClick={onClick}
//     responseData={responseData}
//     body={response?.map((row) => ({
//     ...row,
//     check: row.qr_code.length !== 0 && (

//     <SampleTableCheckBox data={checkedData} bodyData={row}/>
//     ),

//     href: row.sampleStatus === '2New'?`/dashboard/sample/sampleDetails/?sampleId=${row._id}`:'',
//     type: <p>{row.isFieldSample && row.isFieldSample === true ? 'Field Sample':'Lab Sample'}</p>,
//     sampleId: row.sample_id.toUpperCase(),
//     // qrCode: row.qr_code.length !== 0 ?row.qr_code.find((item)=> item._id === row.sub_sample_for._id).qr.toUpperCase():'-',
//     // date: (
//     // <div className="flex flex-col">
//     // <p>{dateFormat(row.createdAt, 'dd-MMM-yyyy ')}</p>
//     // <p className="text-xs font-light">
//     //  {dateFormat(row.createdAt, 'h:mm a')}
//     // </p>
//     // </div>
//     // ),
//     sourceData: row.source
//     ? row.source.label
//     : row.scheduleSource
//     ? row.scheduleSource.label
//     : '-',
//     subSourceData: row.subSource
//     ? row.subSource.label
//     : row.scheduleSubSource
//     ? row.scheduleSubSource.label
//     : '-',
// // sampleForData: row.sample_for.checklabel, 
// // locationData: <p className='truncate'>{row.plant
// // ? row.plant.name
// // : row.schedulePlant
// // ? row.schedulePlant.name
// // : row.location.name}</p>,
// // status: (
// // <Badge
// // className={`text-light font-normal py-1 px-4 ${
// //  row.sampleStatus === 'Approved'
// //      ? ' bg-green-500 text-white'
// //      : row.sampleStatus === 'Reject'
// //          ? 'bg-red-500 text-white'
// //      : row.sameplStatus === 'Assigned'
// //          ? 'bg-yellow-500 text-yellow-50'
// //          : 'bg-blue-200 text-blue-700'
// // }`}
// // >
// // {row.sampleStatus === 'Approved'
// //  ? 'Received'
// //  : row.sampleStatus === 'Reject'
// //      ? 'Rejected'
// //  : row.sampleStatus === 'Assigned'
// //      ? 'Assigned'
// //      : 'New'}
// // </Badge>
// // ),
// }))}
// />
// {/* <Paging chemicalItems ={chemicalPaginationData}
// microItems ={microPaginationData}
// type ={type}
// currentPage={currentPage} // 1
// pageSize={pageSize} // 10
// onPageChange={onPageChange}/> */}

// </>
// );
// };
// export default SampleTableReceived

import React, { useEffect, useState } from 'react'
import { Accordin } from '@/components/molecules/accordion'
const Test1 = () => {
    const [role,setRole] = useState({
        roleName:'',
        Permissions:[
            {
                modelName:"organisation Mangament",
                allAccess:false,
                removeAccess:true,
                read:false,
                write:false,
                delete:false
            },
            {
                modelName:"fields Mangament",
                allAccess:true,
                removeAccess:false,
                read:false,
                write:false,
                delete:false
            }
        ]
    })

    const handleClick = (e)=>{
    const data = [...role.Permissions]
   
    let key = Object.keys(e)[0]
  
  if(key === 'removeAccess' && e[key] === true){
    
      data[e.id] = {...data[e.id],[`${key}`]:e[key],allAccess:false}
    
   }else if(key === 'allAccess' && e[key]=== true){
    
  data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false,read:true,write:true,delete:true}
   
   }else{
    data[e.id] = {...data[e.id],[`${key}`]:e[key],removeAccess:false,read:false,write:false,delete:false}
}
    
    setRole({
        ...role,Permissions:data
    })
    }

    useEffect(()=>{
        console.log(role,'d')
    },[role])
  return (
    <div className='p-8'>
      <p>this is test1</p>
       {role.Permissions.map((item,index)=>{
          return (<>
            <Accordin label={item.modelName} data={item} handleClick={handleClick} key={index} id={index}>{item.modelName}</Accordin>
          </>)
       })}
    </div>
  )
}

export default Test1

