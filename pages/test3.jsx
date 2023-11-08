import React, { useState, useCallback } from "react";
// import TableRow from "./TableRow";
// import styled from "styled-components";
// import { SortableContainer, SortableElement } from "react-sortable-hoc";
// import { ITEMS } from "./data";
// import arrayMove from "./arrayMove";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { SortableHandle } from "react-sortable-hoc";
// import arrayMove from 'array-move';

const classes = {
    table: "w-full text-sm text-left  ",
    thead:
      "text-sm  uppercase bg-[#F7F7F7] border-b text-gray-500  font-semibold",
    tbody: "bg-white cursor-pointer",
    tr: "text-[#121212] font-body text-sm text-left ",
    th: "px-6 py-4  truncate",
    td: "px-6 py-4 text-sm font-normal  tracking-tighter turncate text-[#121212] border-t border-white",
  };

const arrayMoveMutate = (array, from, to) => {
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  };
  
  const arrayMove = (array, from, to) => {
    array = array.slice();
    arrayMoveMutate(array, from, to);
    return array;
  };
  
//   export default arrayMove;
  
const header= [ {
    "name": "codeno",
    "label": "Code No"
},
{
    "name": "description",
    "label": "Description"
},
{
    "name": "parentcode",
    "label": "Parent Code"
},
{
    "name": "rate(%)(wdv)",
    "label": "Rate(%) (WDV)"
},
{
    "name": "rate1(%)(usage)",
    "label": "Rate1(%) (Usage)"
}]
const headerdata= [{
    "_id": "6541ee27c6ddd03f0782db73",
    "codeno": "10",
    "description": "fsd",
    "parentcode": "",
    "rate(%)(wdv)": "Hello",
    "rate1(%)(usage)": "result",
    "rate2(%)(slm)": "sample test result"
},
{
    "_id": "6541ee27c6ddd03f0782db74",
    "codeno": "fsdlfjl",
    "description": "fdsf",
    "parentcode": "fsd",
    "rate(%)(wdv)": "Hello",
    "rate1(%)(usage)": "Hello",
    "rate2(%)(slm)": "dsfjsldaf"
},
{
    "_id": "6541ee27c6ddd03f0782db75",
    "codeno": "fdsf",
    "description": "fdsfd",
    "parentcode": "fds",
    "rate(%)(wdv)": 20,
    "rate1(%)(usage)": 24345,
    "rate2(%)(slm)": "r324"
}]
const RowHandler = SortableHandle(() => <div className="mr-3 cursor-grab">| |</div>);
const TableRow = (props) => {
    // console.log(props.obj, "props");
    const headerkey = Object.keys(props.obj);
    // console.log(headerkey, "header");
    return (
      <tr className={classes.tr}>
        {headerkey.map((head, index) => {
          return (
            <>
              {index === 0 ? (
                <td className={classes.td}>
                  <div className="flex gap-2">
                    <RowHandler />
                    {props.obj[head]}
                  </div>
                </td>
              ) : (
                <td className={classes.td}>{props.obj[head]}</td>
              )}
            </>
          );
        })}
        {/* <td>
          <div className="firstElement">
            <RowHandler />
            {props.obj.first}
          </div>
        </td>
        <td>{props.second}</td>
        <td>{props.third}</td>
        <td>{props.fourth}</td>
        <td>{props.action}</td> */}
      </tr>
    );
  };

const ITEMS = [
    {
      _id: "1",
      first: "She",
      second: "was",
      third: "a",
      fourth: "fast"
    },
    {
      _id: "2",
      first: "machine",
      second: "She",
      third: "kept",
      fourth: "her"
    },
    {
      _id: "3",
      first: "motor",
      second: "clean",
      third: "She",
      fourth: "was"
    },
    {
      _id: "4",
      first: "the",
      second: "best",
      third: "damn",
      fourth: "woman"
    },
    {
      _id: "5",
      first: "I",
      second: "had",
      third: "ever",
      fourth: "seen"
    },
    {
      _id: "6",
      first: "She",
      second: "had",
      third: "the",
      fourth: "sightless"
    },
    {
      _id: "7",
      first: "eyes",
      second: "telling",
      third: "me",
      fourth: "no"
    },
    {
      _id: "8",
      first: "lies",
      second: "knockin'",
      third: "me",
      fourth: "out"
    },
    {
      _id: "9",
      first: "with",
      second: "those",
      third: "American",
      fourth: "thighs"
    },
    {
      _id: "10",
      first: "taking",
      second: "more",
      third: "than",
      fourth: "her"
    },
    {
      _id: "11",
      first: "share",
      second: "had",
      third: "me",
      fourth: "fighting"
    },
    {
      _id: "12",
      first: "for",
      second: "air",
      third: "She",
      fourth: "told"
    },
    {
      _id: "13",
      first: "me",
      second: "to",
      third: "come",
      fourth: "but"
    },
    {
      _id: "14",
      first: "I",
      second: "was",
      third: "already",
      fourth: "there"
    },
    {
      _id: "15",
      first: "'cause",
      second: "the",
      third: "walls",
      fourth: "start"
    },
    {
      _id: "16",
      first: "shaking",
      second: "the",
      third: "earth",
      fourth: "was"
    },
    {
      _id: "17",
      first: "quaking",
      second: "my",
      third: "mind",
      fourth: "was"
    },
    {
      _id: "18",
      first: "aching",
      second: "and",
      third: "we",
      fourth: "were"
    },
    {
      _id: "19",
      first: "making",
      second: "it",
      third: "and",
      fourth: "you"
    }
  ];


  
  
  const SortableCont = SortableContainer(({ children }) => {
    return <tbody>{children}</tbody>;
  });
  
  const SortableItem = SortableElement((props) => <TableRow {...props} />);
  
  const MyTable = () => {
    const [items, setItems] = useState(ITEMS);
  
    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
      setItems((oldItems) => arrayMove(oldItems, oldIndex, newIndex));
    }, []);
    const header = [
      { Label: "First", name: "first" },
      { Label: "Second", name: "second" },
      { Label: "Third", name: "third" },
      { Label: "Fourth", name: "fourth" },
      { Label: "Action", name: "action" }
    ];
    return (
      <div>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.tr}>
              {header.map((head,index) => {
                return <th className={classes.th} key={index}> {head.Label}</th>;
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
            {items.map((value, index) => {
              let obj = {};
              {
                header.map((head) => {
                  obj[head.name] = value[head.name];
                  // <SortableItem
                  //   key={`item-${index}`}
                  //   index={index}
                  //   first={`${value[head.name]}`}
                  //   //  first:{`${value[head.name]} `}
                  // />;
                  // console.log(value[head.name], head.name);
                });
                // console.log(obj, "obj");
              }
              obj = {
                ...obj,
                action: <button onClick={() => alert(value._id)}>delete</button>
              };
              return (
                console.log(obj, "obj"),
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
    );
  };
  
  export default MyTable;
  
