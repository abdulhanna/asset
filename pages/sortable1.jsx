import React, { useState, useRef, useEffect } from "react";
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
  toggleExpandedForAll
} from "react-sortable-tree";
import "react-sortable-tree/style.css";
// import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

const seed = [
  {
    id: "123",
    title: "Company",
    subtitle: "zzz",
    isDirectory: true,
    expanded: true,
    children: [
      { id: "456", title: "Human Resource", subtitle: "zzz" },
      {
        id: "789",
        title: "Bussiness",
        subtitle: "zzsdsd",
        expanded: true,
        children: [
          {
            id: "234",
            title: "Store A",
            subtitle: "zzz"
          },
          { id: "567", title: "Store B", subtitle: "zzz" ,children: [
            {
              id: "234",
              title: "Store c",
              subtitle: "zzz"
            }
            // { id: "567", title: "Store B", subtitle: "zzz"  }
          ] }
        ]
      }
    ]
  }
];

function Tree() {
  const [searchString, setSearchString] = useState("");
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [searchFoundCount, setSearchFoundCount] = useState(null);
  const [treeData, setTreeData] = useState(seed);
  const [state,setState] = useState({
    name:"",
    desc:"",
    status:""
  })

  const [nodePath,setNodePath] = useState(null)

  const inputEl = useRef();

  // console.log(treeData);

  function createNode() {
    const value = inputEl.current.value;

    // if (value === "") {
    //   inputEl.current.focus();
    //   return;
    // }

    
     
    let newTree = addNodeUnderParent({
      treeData: treeData,
      parentKey: nodePath,
      expandParent: true,
      getNodeKey,
      newNode: {
        id: "123",
        title:state.name,
        desc: state.desc,
        status: state.status
      }
    });

    setTreeData(newTree.treeData);
    setNodePath(null)

    // inputEl.current.value = "";
  }

  // function updateNode(rowInfo) {
  //   const { node, path } = rowInfo;
  //   const { children } = node;

  //   const value = inputEl.current.value;

  //   if (value === "") {
  //     inputEl.current.focus();
  //     return;
  //   }

  //   let newTree = changeNodeAtPath({
  //     treeData,
  //     path,
  //     getNodeKey,
  //     newNode: {
  //       children,
  //       title: value
  //     }
  //   });

  //   setTreeData(newTree);

  //   inputEl.current.value = "";
  // }

  function addNodeChild(rowInfo) {
    let { path } = rowInfo;
     setNodePath(path[path.length-1])
    console.log(inputEl.current,'curr')
    // inputEl.current.style.backgroundColor = 'black';
    // console.log(path[path.length - 2],'dd',path,path[path.length-1])
    // alert(path)
    // setNodePath(path)
    //  console.log(rowInfo,'row')
    // const value = inputEl.current.value;
    // const value = inputEls.current[treeIndex].current.value;

    // if (value === "") {
    //   inputEl.current.focus();
    //   // inputEls.current[treeIndex].current.focus();
    //   return;
    // }
    // //  console.log(path,path[path.length - 1],'apth');
    // let newTree = addNodeUnderParent({
    //   treeData: treeData,
    //   parentKey: path[path.length - 1],
    //   expandParent: true,
    //   getNodeKey,
    //   newNode: {
    //     id:'5734',
    //     title: value
    //   }
    // });

    // setTreeData(newTree.treeData);

    // inputEl.current.value = "";
    // inputEls.current[treeIndex].current.value = "";
  }

  function addNodeSibling(rowInfo) {
    let { path } = rowInfo;
    // console.log(path, path[path.length - 2],'apth')
    
    const value = inputEl.current.value;
    // const value = inputEls.current[treeIndex].current.value;

    if (value === "") {
      inputEl.current.focus();
      // inputEls.current[treeIndex].current.focus();
      return;
    }
    // console.log(rowInfo,'ss')
    let newTree = addNodeUnderParent({
      treeData: treeData,
      parentKey: path[path.length - 2],
      expandParent: true,
      getNodeKey,
      newNode: {
        title: value
      }
    });



    // console.log(newTree,'new')
    setTreeData(newTree.treeData);

    inputEl.current.value = "";
    // inputEls.current[treeIndex].current.value = "";
  }

  function removeNode(rowInfo) {
    const { path } = rowInfo;
    setTreeData(
      removeNodeAtPath({
        treeData,
        path,
        getNodeKey
      })
    );
  }


   useEffect(()=>{
    console.log(treeData,'effe')
   })
  function updateTreeData(treeData) {
    // console.log('drag');
    setTreeData(treeData);
  }

  function expand(expanded) {
    setTreeData(
      toggleExpandedForAll({
        treeData,
        expanded
      })
    );
  }

  function expandAll() {
    expand(true);
  }

  function collapseAll() {
    expand(false);
  }

  const alertNodeInfo = ({ node, path, treeIndex }) => {
    console.log(node)
    const objectString = Object.keys(node)
      .map((k) => (k === "children" ? "children: Array" : `${k}: '${node[k]}'`))
      .join(",\n   ");

    global.alert(
      "Info passed to the icon and button generators:\n\n" +
        `node: {\n   ${objectString}\n},\n` +
        `path: [${path.join(", ")}],\n` +
        `treeIndex: ${treeIndex}`
    );
  };

  const selectPrevMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null
        ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
        : searchFoundCount - 1
    );
  };

  const selectNextMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0
    );
  };

  const getNodeKey = ({ treeIndex }) => treeIndex;
//   console.log(getNodeKey,'node')
  console.log(state,'state',nodePath);
  return (
    <div>
      <div style={{ flex: "0 0 auto", padding: "0 15px" }}>
        <h3>Full Node Drag Theme</h3>
        <input className="border-2" placeholder="group name" ref={inputEl} name="name"    value={state.name}  onChange={(e)=>{ setState({...state,[e.target.name]:e.target.value})}} type="text" />
        <input className="border-2" placeholder="status" ref={inputEl} name="desc"    value={state.desc}  onChange={(e)=>{ setState({...state,[e.target.name]:e.target.value})}} type="text" />
        <input className="border-2" placeholder='description' ref={inputEl} name="status"    value={state.status}  onChange={(e)=>{ setState({...state,[e.target.name]:e.target.value})}} type="text" />
        <br />
        {/* <h3>Add description</h3>
        <input className="border-2" ref={inputEl} type="text" /> */}
        
        <br />
        <button onClick={createNode}>Create Node</button>
        <br />
        <button onClick={expandAll}>Expand All</button>
        <button onClick={collapseAll}>Collapse All</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <form
          style={{ display: "inline-block" }}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {/* <label htmlFor="find-box">
            Search:&nbsp;
            <input
              id="find-box"
              type="text"
              value={searchString}
              onChange={(event) => setSearchString(event.target.value)}
            />
          </label> */}

          {/* <button
            type="button"
            disabled={!searchFoundCount}
            onClick={selectPrevMatch}
          >
            &lt;
          </button> */}

          {/* <button
            type="submit"
            disabled={!searchFoundCount}
            onClick={selectNextMatch}
          >
            &gt;
          </button> */}

          {/* <span>
            &nbsp;
            {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
            &nbsp;/&nbsp;
            {searchFoundCount || 0}
          </span> */}
        </form>
      </div>

      <div style={{ height: "100vh" }}>
        <SortableTree
          treeData={treeData}
          onChange={(treeData) => updateTreeData(treeData)}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          searchFinishCallback={(matches) => {
            setSearchFoundCount(matches.length);
            setSearchFocusIndex(
              matches.length > 0 ? searchFocusIndex % matches.length : 0
            );
          }}
        //   theme={FileExplorerTheme}
          canDrag={({ node }) => !node.dragDisabled}
          generateNodeProps={(rowInfo) => ({
            name: rowInfo.node.label,
            subtitle: rowInfo.node.subtitle,
            buttons: [
              <div className="space-x-2"> 
                {/* <button
                  className="border-2 py-1 " label="Add Sibling"
                  onClick={(event) => addNodeSibling(rowInfo)}
                >
                  Add Sibling
                </button> */}
                <button
                  className="border-2 rounded-full px-2 " label="Add Child"
                  onClick={(event) => addNodeChild(rowInfo)}

                 
                >
                  +
                </button>
                {/* <button className="border-2 py-1 " label="Update" onClick={(event) => updateNode(rowInfo)}>
                  Update
                </button> */}
                {/* <button className="border-2 py-1 " label="Delete" onClick={(event) => removeNode(rowInfo)}>
                  Remove
                </button> */}
                {/* <button
                  className="border-2 py-1 " label="Alert"
                  onClick={(event) => alertNodeInfo(rowInfo)}
                >
                  Info
                </button> */}
              </div>
            ],
            style: {
              height: "32px",
            //   innerWidth:'20px',
            //   outerWidth:'40px'
            // width:"60px"

            }
          })}

          ref={inputEl}

          onClick={()=> alert('hii')}
        />
      </div>
    </div>
  );
}

export default Tree;
