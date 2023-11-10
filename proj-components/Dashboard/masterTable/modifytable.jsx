import React, { useState, useCallback, useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { SortableHandle } from "react-sortable-hoc";
import { arrayMove } from "helpers/formdataConverter";
import { EditIcon,DeleteIcon,Handler,PlusSign,NewDeleteIcon } from "@/components/atoms/icons";


const classes = {
    table: "w-full text-sm text-left  ",
    thead:
      "text-sm  uppercase bg-[#F7F7F7] border-b text-gray-500  font-semibold",
    tbody: "bg-white ",
    tr: "text-[#121212] font-body text-md text-left ",
    th: "px-6 py-4  truncate",
    td: "px-6 py-4 text-sm font-normal  tracking-tighter turncate  border-t border-white",
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
                <td  className={`px-6 py-4 text-sm font-normal  tracking-tighter turncate  border-t border-white`}>
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
  
    // const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    //     // console.log(oldIndex,newIndex)
    //     onDragDrop(items,oldIndex,newIndex)
    //   setItems((oldItems) => arrayMove(oldItems, oldIndex, newIndex));
  
    // }, []);

    // useEffect(()=>{
    //      setItems(headerdata)
    // },[headerdata])

    // console.log(items,'items')
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
            helperClass="helperContainerClass"
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
    return  <div className="flex items-center space-x-4">
       <PlusSign className={'bg-slate-100 p-2 rounded-md'} onClick={()=>onRowadd(index)}/>
      <EditIcon classname={'bg-slate-100 rounded-md p-2'} onClick={() => onEdit(data,index)} />
      <NewDeleteIcon
        className={"bg-slate-100 p-2 rounded-md "}

        onClick={() => onDelete(data._id)} // Add delete functionality here
      />
    </div>

}