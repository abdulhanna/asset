import React, { useState, useCallback, useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { SortableHandle } from "react-sortable-hoc";
import { arrayMove } from "helpers/formdataConverter";
import { EditIcon,DeleteIcon,Handler,PlusSign,NewDeleteIcon } from "@/components/atoms/icons";
import { TableComp2 } from "@/components/organism/tablecomp";
import Paging from "@/components/molecules/paging";
import { DateTime } from "luxon";
import { DonwloadIcon } from "@/components/atoms/icons";
import { Text1 } from "@/components/atoms/field";


const classes = {
    table: "w-full text-sm text-left  ",
    thead:"text-sm  uppercase bg-[#F7F7F7] border-b text-gray-500  font-semibold",
    tbody: "bg-white ",
    tr: "text-[#121212] font-body text-md text-left ",
    th: "px-6 py-4  truncate",
    // td: "px-6 py-4 text-sm font-normal  tracking-tighter turncate  border-t border-white",
    td: "px-6 py-4 text-sm font-normal  tracking-tighter turncate  border-t border-white min-w-[150px] max-w-full",
  };

  const RowHandler = SortableHandle(() => <div className="mr-3 cursor-grab"><Handler/></div>);

  const TableRow = (props) => {
  
    const headerkey = Object.keys(props.obj);
    const code = props.obj['parentcode']
    // console.log(code)
    return (
      <tr className={`${(code == "" || code === undefined) ? "text-blue-500":" "} ${classes.tr}`}>
        {headerkey.map((head, index) => {
          {/* console.log(head,'head') */}
          return (
            <>
              {
                <td  className={`${classes.td}`}>
                 {index === 0 ? <div className="flex gap-2">
                    <RowHandler />
                    {props.obj[head]}
                  </div>: <>{props.obj[head]}</> }
                  
                </td>
              
                
              }
            </>
          );
        })}
      </tr>
    );
  };

  const SortableCont = SortableContainer(({ children }) => {
    return <tbody className={classes.tbody}>{children}</tbody>;
  });
  
  const SortableItem = SortableElement((props) => <TableRow {...props} />);


const Modifytable = ({
    header,
    headerdata,
    onDragDrop,
    onEdit,
    onDelete,
    onSortEnd,
    onRowadd
}) => {

    const [items, setItems] = useState([]);
  

  return (
      <div className="my-4">
          <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.tr}>
              {header.map((head,index) => {
                return <th className={classes.th} key={index}> {head.label}</th>;
              })}
             
            </tr>
          
          </thead>
          <SortableCont
            onSortEnd={onSortEnd}
            axis="y"
            lockAxis="y"
            lockToContainerEdges={true}
            lockOffset={["30%", "50%"]}
            helperClass="w-auto border-dashed border-2 border-indigo-600"
            useDragHandle={true}
          >
            {headerdata?.map((value, index) => {
              let obj = {};
              {
                header?.map((head) => {
                  obj[head.name] = value[head.name];
                });
              
              }
              obj = {
                ...obj,
                action: (<EditDelete onEdit={onEdit} data={value} onDelete={onDelete} index={index}  onRowadd={onRowadd}/>)

              };
              return (
               
                (
                  <SortableItem
                    // data = obj
                    key={`item-${index}`}
                    index={index}
                    obj={obj}
                  />
                )
              );
            })}
  
          
          </SortableCont>
        </table>
     </div>
  )
}

export default Modifytable



const EditDelete = ({onEdit,onDelete,data,index,onRowadd})=>{
    // console.log(data,'data')
    return  <div className="flex  space-x-4">
       <PlusSign className={'bg-slate-100 p-2 rounded-md'} onClick={()=>onRowadd(index)}/>
      <EditIcon classname={'bg-slate-100 rounded-md p-2'} onClick={() => onEdit(data,index)} />
      <NewDeleteIcon
        className={"bg-slate-100 p-2 rounded-md "}

        onClick={() => onDelete(index)} // Add delete functionality here
      />
    </div>

}


export const MasterTableStructure = ({
  headerData,
  response,
  onClick,
  responseData,
  href,
  totalDoc,
  checkedData,
  clickAll,
  checkAllStatus,
  currentPage,
  start,
  end,
  pageSize,
  onPageChange,
  onPageSize,
  publishCall
})=>{
   return <>
    <TableComp2
         headers={headerData}
        onClick={onClick}
        responseData={responseData}
        clickAll={clickAll}
        checkAllStatus={checkAllStatus}
        href={href}
        body={response.map((row) => ({
          ...row,
          href:`id=${row._id}`,
          createdAt: DateTime.fromISO(row.createdAt).toFormat('dd-MM-yy, hh:mm:a'),
          action: (
                <ActionWork row={row}/>
              ),
        }))}
    />
      <Paging
        start={start}
        end={end}
        totalDoc={totalDoc}
        currentPage={currentPage} // 1
        pageSize={pageSize} // 10
        onPageChange={onPageChange}
        onPageSize={onPageSize}
      />
   </>
}

const ActionWork = ({row})=>{
  // console.log(row,'row')

  const isBrowser = () => typeof window !== 'undefined';

  const handleDownload = async () => {
    try {
      // Trigger the download by opening the API route in a new window or tab
      const downloadUrl = row.sampleFile;
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
   };


  return <div className="flex items-end" onClick={()=>{
        if (isBrowser()) { //Only add the event listener client-side
        
        handleDownload()
       // window.open(fileModel.sampleFile, '_blank');
       }
  }}>
     <DonwloadIcon/>
     <Text1 className="underline" color="text-primary">Donwload</Text1>
  </div>
}