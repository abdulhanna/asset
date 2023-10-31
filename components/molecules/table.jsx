import Link from 'next/link';
import { DeleteIcon, EditIcon } from '../atoms/icons';
import { ClickCheckBoxComp } from 'proj-components/Dashboard/tableItem';
import { SortIcon } from '../atoms/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AscenSort, DescSort } from '../atoms/icons';
// import { Router } from 'next/router';
const Table = ({
  headers,
  data,
  classes,
  href = '#',
  extra,
  onClick,
  editItem,
  responseData,
}) => {
  const lastIndex = headers.length - 1;

  //  console.log(href,'ref')
  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>
          {headers.map((item, index) => (
            // console.log(item,'dd'),
            <th key={index}
              className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
                }`}
              scope="col"
            >
              {typeof item.label === 'function' ? item.label() : item.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {data.map((dataRow, index) => {
          // console.log(dataRow,'ss') 
          return (
            <Link href={`${href}${href !== '#' ? dataRow.href : ''}`} key={index}>
              <tr>
                {headers.map((item) => {
                  return (
                    <td
                      key={item.name}
                      className={`${classes.td} ${extra}`}
                      onClick={() => {
                        onClick && onClick();

                        responseData && responseData(dataRow);
                      }}
                    >

                      {dataRow[item.name] === "action" ?
                        <div className='flex items-center'>
                          <EditIcon onClick={(e) => editItem(dataRow.id)} />
                          <DeleteIcon className={"mx-2"} />
                        </div> : dataRow[item.name]}
                    </td>
                  );
                })}

              </tr>
            </Link>
          );
        })}
      </tbody>
    </table>
  );
};



export const CheckWithLinkTable = ({
  headers,
  data,
  classes,
  href,
  extra,
  onClick,
  responseData,
  clickAll,
  checkAllStatus
}) => {
  const lastIndex = headers.length - 1;
  let sortedData;

  const [sortOrder, setSortOrder] = useState('none'); // State to track the sort order
  const router = useRouter()

  const sortData = (field, ascending) => {
    return data?.sort((a, b) => {
      if (field === 'date') {
        const dateA = a?.createdAt;
        const dateB = b?.createdAt;
        return ascending ? (dateA - dateB) : (dateB - dateA);
      } else if (field === 'locationData') {
        const valueA = a[field]?.props.children.toString().toLowerCase();
        const valueB = b[field]?.props.children.toString().toLowerCase();
        return ascending ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
      } else {
        const valueA = a[field]?.toString().toLowerCase();
        const valueB = b[field]?.toString().toLowerCase();
        return ascending ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
      }
    });
  };

  const handleSortClick = (field) => {
    let newSortOrder = { ...sortOrder };

    if (!newSortOrder[field]) {
      newSortOrder[field] = 'asc';
    } else if (newSortOrder[field] === 'asc') {
      newSortOrder[field] = 'desc';
    } else if (newSortOrder[field] === 'desc') {
      newSortOrder[field] = 'asc';
    }

    headers.forEach((item) => {
      if (item.name !== field) {
        newSortOrder[item.name] = '';
      }
    });

    setSortOrder(newSortOrder);
    const ascending = newSortOrder[field] === 'asc';
    const sortedData = sortData(field, ascending);
  };
  const renderSortIcon = (field) => {
    // console.log(field,'fis')
    if (sortOrder[field] === 'none') {
      return (
        <div className={"pl-1"}>
          <SortIcon />
        </div>
      )
    }
    else if (sortOrder[field] === 'asc') {
      return (
        <div className={"pl-1 pt-1"}>
          <AscenSort />
        </div>
      );
    } else if (sortOrder[field] === 'desc') {
      return (
        <div className={"pl-1 pt-1"}>
          <DescSort />
        </div>
      );
    } else {
      return (
        <div className={"pl-1"}>
          <SortIcon />
        </div>)
    }
  };
  sortedData = sortData('date', true);

  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>

          {headers.map((item, index) => (
            <th
              key={index}
              className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
                }`}
              scope="col"
              onClick={() => index === 0 ? clickAll('click') : handleSortClick(item.name)}
            >
              <div className="flex flex-row">
                {index === 0 ? <ClickCheckBoxComp status={checkAllStatus === true ? "true" : "false"} /> : typeof item.label === 'function' ? item.label() : item.label}
                {!(index === 0) && <div className='text-black'>{renderSortIcon(item.name)}</div>}
              </div>

            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {sortedData?.map((dataRow, index) => {
          return (

            <tr key={index}>
              {headers.map((item, index) => {
                return (
                  <td
                    key={item.name}
                    className={`${classes.td} ${extra}`}
                    onClick={() => {
                      if (index === 0) {
                        responseData && responseData(dataRow);
                      } else {
                        onClick && router.push(`${href}${href !== '#' ? dataRow.href : ''}`);
                      }
                    }}
                  >
                    {typeof dataRow[item.name] === 'function'
                      ? dataRow[item.name]()
                      : dataRow[item.name]}
                  </td>
                );
              })}
            </tr>

          );
        })}
      </tbody>
    </table>
  );
};
//working
export const ColClickTable = ({
  headers,
  data,
  classes,
  href,
  extra,
  onClick,
  responseData,
  clickAll,
  checkAllStatus
}) => {
  const lastIndex = headers.length - 1;
  let sortedData;

  const [sortOrder, setSortOrder] = useState('none'); // State to track the sort order
  const router = useRouter()

  const sortData = (field, ascending) => {
    return data?.sort((a, b) => {
      if (field === 'date') {
        const dateA = a.createdAt;
        const dateB = b.createdAt;
        return ascending ? (dateA - dateB) : (dateB - dateA);
      } else if (field === 'locationData') {
        const valueA = a[field]?.props.children.toString().toLowerCase();
        const valueB = b[field]?.props.children.toString().toLowerCase();
        return ascending ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
      } else {
        const valueA = a[field]?.toString().toLowerCase();
        const valueB = b[field]?.toString().toLowerCase();
        return ascending ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
      }
    });
  };

  const handleSortClick = (field) => {
    let newSortOrder = { ...sortOrder };

    if (!newSortOrder[field]) {
      newSortOrder[field] = 'asc';
    } else if (newSortOrder[field] === 'asc') {
      newSortOrder[field] = 'desc';
    } else if (newSortOrder[field] === 'desc') {
      newSortOrder[field] = 'asc';
    }

    headers.forEach((item) => {
      if (item.name !== field) {
        newSortOrder[item.name] = '';
      }
    });

    setSortOrder(newSortOrder);
    const ascending = newSortOrder[field] === 'asc';
    const sortedData = sortData(field, ascending);
  };
  const renderSortIcon = (field) => {
    // console.log(field,'fis')
    if (sortOrder[field] === 'none') {
      return (
        <div className={"pl-1"}>
          <SortIcon />
        </div>
      )
    }
    else if (sortOrder[field] === 'asc') {
      return (
        <div className={"pl-1 pt-1"}>
          <AscenSort />
        </div>
      );
    } else if (sortOrder[field] === 'desc') {
      return (
        <div className={"pl-1 pt-1"}>
          <DescSort />
        </div>
      );
    } else {
      return (
        <div className={"pl-1"}>
          <SortIcon />
        </div>)
    }
  };
  sortedData = sortData('date', true);

  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>

          {headers?.map((item, index) => (
            <th
              key={index}
              className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
                }`}
              scope="col"
              onClick={() => index === 0 ? clickAll('click') : handleSortClick(item.name)}
            >
              <div className="flex flex-row">
                {index === 0 ? <ClickCheckBoxComp status={checkAllStatus === true ? "true" : "false"} /> : typeof item.label === 'function' ? item.label() : item.label}
                {!(index === 0) && <div className='text-black'>{renderSortIcon(item.name)}</div>}
              </div>

            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {sortedData?.map((dataRow, index) => {
          return (

            <tr key={index}>
              {headers?.map((item, index) => {
                return (
                  <td
                    key={item.name}
                    className={`${classes.td} ${extra} ${index === 1 ? 'text-blue-500 cursor-pointer' : ''} `}
                    onClick={() => {
                      if (index === 0) {
                        responseData && responseData(dataRow);
                      } else if (index === 1) {
                        onClick && router.push(`${href}${href !== '#' ? dataRow.href : ''}`);
                      } else {

                      }
                    }}
                  >
                    {typeof dataRow[item.name] === 'function'
                      ? dataRow[item.name]()
                      : dataRow[item.name]}
                  </td>
                );
              })}
            </tr>

          );
        })}
      </tbody>
    </table>
  );
};

export const ActionCheckTable = ({
  headers,
  data,
  classes,
  href,
  extra,
  onClick,
  responseData,
  clickAll,
  checkAllStatus
}) => {
  const lastIndex = headers.length - 1;
  let sortedData;

  const [sortOrder, setSortOrder] = useState('none'); // State to track the sort order
  const router = useRouter()

  const sortData = (field, ascending) => {
    return data.sort((a, b) => {
      if (field === 'date') {
        const dateA = a.createdAt;
        const dateB = b.createdAt;
        return ascending ? (dateA - dateB) : (dateB - dateA);
      } else if (field === 'locationData') {
        const valueA = a[field]?.props.children.toString().toLowerCase();
        const valueB = b[field]?.props.children.toString().toLowerCase();
        return ascending ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
      } else {
        const valueA = a[field]?.toString().toLowerCase();
        const valueB = b[field]?.toString().toLowerCase();
        return ascending ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
      }
    });
  };

  const handleSortClick = (field) => {
    let newSortOrder = { ...sortOrder };

    if (!newSortOrder[field]) {
      newSortOrder[field] = 'asc';
    } else if (newSortOrder[field] === 'asc') {
      newSortOrder[field] = 'desc';
    } else if (newSortOrder[field] === 'desc') {
      newSortOrder[field] = 'asc';
    }

    headers.forEach((item) => {
      if (item.name !== field) {
        newSortOrder[item.name] = '';
      }
    });

    setSortOrder(newSortOrder);
    const ascending = newSortOrder[field] === 'asc';
    const sortedData = sortData(field, ascending);
  };
  const renderSortIcon = (field) => {
    // console.log(field,'fis')
    if (sortOrder[field] === 'none') {
      return (
        <div className={"pl-1"}>
          <SortIcon />
        </div>
      )
    }
    else if (sortOrder[field] === 'asc') {
      return (
        <div className={"pl-1 pt-1"}>
          <AscenSort />
        </div>
      );
    } else if (sortOrder[field] === 'desc') {
      return (
        <div className={"pl-1 pt-1"}>
          <DescSort />
        </div>
      );
    } else {
      return (
        <div className={"pl-1"}>
          <SortIcon />
        </div>)
    }
  };
  sortedData = sortData('date', true);

  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>

          {headers.map((item, index) => (
            <th key={index}
              className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
                }`}
              scope="col"
              onClick={() => index === 0 ? clickAll('click') : handleSortClick(item.name)}
            >
              <div className="flex flex-row">
                {index === 0 ? <ClickCheckBoxComp status={checkAllStatus === true ? "true" : "false"} /> : typeof item.label === 'function' ? item.label() : item.label}
                {!(index === 0) && <div className='text-black'>{renderSortIcon(item.name)}</div>}
              </div>

            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {sortedData.map((dataRow, index) => {
          return (

            <tr key={index}>
              {headers.map((item, index) => {
                return (
                  <td
                    key={item.name}
                    className={`${classes.td} ${extra}`}
                    onClick={() => {
                      if (index === 0) {
                        responseData && responseData(dataRow);
                      } else {
                        onClick && router.push(`${href}${href !== '#' ? dataRow.href : ''}`);
                      }
                    }}
                  >
                    {/* {typeof dataRow[item.name] === 'function'
          ? dataRow[item.name]()
          : dataRow[item.name]} */}

                    {dataRow[item.name] === "action" ?
                      <div className='flex items-center'>
                        {/* <EditIcon onClick={(e)=> editItem(dataRow.id)}/> */}
                        {/* <DeleteIcon className={"mx-2"}/> */}
                        {'fdgg'}
                      </div> : dataRow[item.name]}
                  </td>
                );
              })}
            </tr>

          );
        })}
      </tbody>
    </table>
  );
};

export const ActionTable = ({
  headers,
  data,
  classes,
  href = '#',
  extra,
  onClick,
  editItem,
  responseData,
}) => {
  const lastIndex = headers.length - 1;


  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>
          {headers.map((item, index) => (
            // console.log(item,'dd'),
            <th key={index}
              className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
                }`}
              scope="col"
            >
              {typeof item.label === 'function' ? item.label() : item.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {data.map((dataRow, index) => {
          {/* console.log(index,'index') */ }
          return (
            <Link href={`${href}${href !== '#' ? dataRow.href : ''}`} key={index}>
              {/* <Link href={`${dataRow.href}`}> */}
              <tr>
                {headers.map((item, id) => {
                  {/* console.log(id,'ss',lastIndex)  */ }
                  return (
                    <td
                      key={item.name}
                      className={`${classes.td} ${extra}`}
                      onClick={() => {
                        if (id === lastIndex) {
                          // onClick && onClick();

                          responseData && responseData(dataRow);
                        } else {

                        }
                      }}
                    >
                      {typeof dataRow[item.name] === 'function'
                        ? dataRow[item.name]()
                        : dataRow[item.name]}
                      {/* {dataRow[item.name] === "action" ? 
                        <div className='flex items-center'>
                        <EditIcon onClick={(e)=> editItem(dataRow.id)}/> 
                         <DeleteIcon className={"mx-2"}/>
                        </div>: dataRow[item.name]} */}
                    </td>
                  );
                })}

              </tr>
            </Link>
          );
        })}
      </tbody>
    </table>
  );
};

export const Table1 = ({
  headers,
  data,
  classes,
  href = '#',
  extra,
  onClick,
  responseData,
}) => {
  const lastIndex = headers.length - 1;
  const router = useRouter()

  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>
          {headers.map((item, index) => (

            <th key={index}
              className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
                }`}
              scope="col"
            >
              {typeof item.label === 'function' ? item.label() : item.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {data?.map((dataRow, index) => {
          {/* console.log(dataRow) */ }
          return (
            <tr key={index}>
              {headers.map((item, id) => {
                return (
                  <td
                    key={item.name}
                    className={`${classes.td} ${extra}`}
                    onClick={() => {
                      if (id !== lastIndex) {

                        onClick && router.push(`${href}${href !== '#' ? dataRow.href : ''}`);
                      } else {
                        // alert('ddd')
                        // onClick && router.push(`${href}${href !== '#' ? dataRow.href : ''}`);
                      }
                      // onClick && onClick();


                    }}
                  >
                    {typeof dataRow[item.name] === 'function'
                      ? dataRow[item.name]()
                      : dataRow[item.name]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


export const Table2 = ({
  headers,
  data,
  classes,
  href = "#",
  extra,
  onClick,
  responseData,
  clickAll,
  checkAllStatus
}) => {
  const lastIndex = headers.length - 1;
  let sortedData;

  const [sortOrder, setSortOrder] = useState('none'); // State to track the sort order
  const router = useRouter()

  const sortData = (field, ascending) => {
    return data?.sort((a, b) => {
      if (field === 'date') {
        const dateA = a.createdAt;
        const dateB = b.createdAt;
        return ascending ? (dateA - dateB) : (dateB - dateA);
      } else if (field === 'locationData') {
        const valueA = a[field]?.props.children.toString().toLowerCase();
        const valueB = b[field]?.props.children.toString().toLowerCase();
        return ascending ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
      } else {
        const valueA = a[field]?.toString().toLowerCase();
        const valueB = b[field]?.toString().toLowerCase();
        return ascending ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
      }
    });
  };

  const handleSortClick = (field) => {
    let newSortOrder = { ...sortOrder };

    if (!newSortOrder[field]) {
      newSortOrder[field] = 'asc';
    } else if (newSortOrder[field] === 'asc') {
      newSortOrder[field] = 'desc';
    } else if (newSortOrder[field] === 'desc') {
      newSortOrder[field] = 'asc';
    }

    headers.forEach((item) => {
      if (item.name !== field) {
        newSortOrder[item.name] = '';
      }
    });

    setSortOrder(newSortOrder);
    const ascending = newSortOrder[field] === 'asc';
    const sortedData = sortData(field, ascending);
  };
  const renderSortIcon = (field) => {
    // console.log(field,'fis')
    if (sortOrder[field] === 'none') {
      return (
        <div className={"pl-1"}>
          <SortIcon />
        </div>
      )
    }
    else if (sortOrder[field] === 'asc') {
      return (
        <div className={"pl-1 pt-1"}>
          <AscenSort />
        </div>
      );
    } else if (sortOrder[field] === 'desc') {
      return (
        <div className={"pl-1 pt-1"}>
          <DescSort />
        </div>
      );
    } else {
      return (
        <div className={"pl-1"}>
          <SortIcon />
        </div>)
    }
  };
  sortedData = sortData('date', true);
  // console.log(href,'href');
  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>

          {headers.map((item, index) => (
            <th
              key={index}
              className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
                }`}
              scope="col"
              onClick={() => index === 0 ? clickAll('click') : handleSortClick(item.name)}
            >
              <div className="flex flex-row">
                {index === 0 ? <ClickCheckBoxComp status={checkAllStatus === true ? "true" : "false"} /> : typeof item.label === 'function' ? item.label() : item.label}
                {!(index === 0) && <div className='text-black'>{renderSortIcon(item.name)}</div>}
              </div>

            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {sortedData?.map((dataRow, index) => {
          return (

            <tr key={index}>
              {headers.map((item, id) => {
                return (
                  <td
                    key={item.name}
                    className={`${classes.td} ${extra} `}
                    onClick={() => {
                      if (id === 0) {
                        // console.log('check')
                        responseData && responseData(dataRow);
                      } else if (id !== 0 && id !== lastIndex) {
                        // alert('route')
                        // router.push('')
                        onClick && router.push(`${href}${href !== '#' ? dataRow.href : ''}`);
                      }

                    }}
                  >
                    {typeof dataRow[item.name] === 'function'
                      ? dataRow[item.name]()
                      : dataRow[item.name]}
                  </td>
                );
              })}
            </tr>

          );
        })}
      </tbody>
    </table>
  );
};

export const Table3 = ({
  headers,
  data,
  classes,
  href = "#",
  extra,
  onClick,
  responseData,
  clickAll,
  checkAllStatus
}) => {
  const lastIndex = headers.length - 1;
  let sortedData;

  const [sortOrder, setSortOrder] = useState('none'); // State to track the sort order
  const router = useRouter()

  const sortData = (field, ascending) => {
    return data.sort((a, b) => {
      if (field === 'date') {
        const dateA = a?.createdAt;
        const dateB = b?.createdAt;
        return ascending ? (dateA - dateB) : (dateB - dateA);
      } else if (field === 'locationData') {
        const valueA = a[field]?.props.children.toString().toLowerCase();
        const valueB = b[field]?.props.children.toString().toLowerCase();
        return ascending ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
      } else {
        const valueA = a[field]?.toString().toLowerCase();
        const valueB = b[field]?.toString().toLowerCase();
        return ascending ? valueA?.localeCompare(valueB) : valueB?.localeCompare(valueA);
      }
    });
  };

  const handleSortClick = (field) => {
    let newSortOrder = { ...sortOrder };

    if (!newSortOrder[field]) {
      newSortOrder[field] = 'asc';
    } else if (newSortOrder[field] === 'asc') {
      newSortOrder[field] = 'desc';
    } else if (newSortOrder[field] === 'desc') {
      newSortOrder[field] = 'asc';
    }

    headers.forEach((item) => {
      if (item.name !== field) {
        newSortOrder[item.name] = '';
      }
    });

    setSortOrder(newSortOrder);
    const ascending = newSortOrder[field] === 'asc';
    const sortedData = sortData(field, ascending);
  };
  const renderSortIcon = (field) => {
    // console.log(field,'fis')
    if (sortOrder[field] === 'none') {
      return (
        <div className={"pl-1"}>
          <SortIcon />
        </div>
      )
    }
    else if (sortOrder[field] === 'asc') {
      return (
        <div className={"pl-1 pt-1"}>
          <AscenSort />
        </div>
      );
    } else if (sortOrder[field] === 'desc') {
      return (
        <div className={"pl-1 pt-1"}>
          <DescSort />
        </div>
      );
    } else {
      return (
        <div className={"pl-1"}>
          <SortIcon />
        </div>)
    }
  };
  sortedData = sortData('date', true);
  //  console.log(headers,'ss')
  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>

          {headers.map((item, index) => (

            <th
              key={index}
              className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
                }`}
              scope="col"
              onClick={() => handleSortClick(item.name)}
            >
              <div className="flex flex-row">
                {typeof item.label === 'function' ? item.label() : item.label}
                {<div className='text-black'>{index !== lastIndex && renderSortIcon(item.name)}</div>}
              </div>

            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {sortedData.map((dataRow, index) => {
          return (

            <tr key={index}>
              {headers.map((item, index) => {
                return (
                  <td
                    key={item.name}
                    className={`${classes.td} ${extra}`}
                    onClick={() => {
                      if (index !== lastIndex) {
                        onClick && router.push(`${href}${href !== '#' ? dataRow.href : ''}`);
                      }
                      // if (index === lastIndex) {
                      //   responseData && responseData(dataRow);
                      // } else {
                      //   onClick && router.push(`${href}${href !== '#' ? dataRow.href : ''}`);
                      // }
                    }}
                  >
                    {typeof dataRow[item.name] === 'function'
                      ? dataRow[item.name]()
                      : dataRow[item.name]}
                  </td>
                );
              })}
            </tr>

          );
        })}
      </tbody>
    </table>
  );
};

export const Table4 = ({
  headers,
  data,
  classes,
  href = '#',
  extra,
  onClick,
  responseData,
}) => {
  const lastIndex = headers.length - 1;


  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>
          {headers.map((item, index) => (

            <th key={index}
              className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
                }`}
              scope="col"
            >
              {typeof item.label === 'function' ? item.label() : item.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={classes.tbody}>
        {data?.map((dataRow, index) => {
          
          let codeLen = dataRow['parentcode']
          {/* console.log(dataRow,'row',codeLen === undefined || codeLen ===  "") */}
           {/* console.log(codeLen,'row',index) */}
          return (
            <Link href={`${href}${href !== '#' ? dataRow.href : ''}`} key={index}>
              {/* <Link href={`${dataRow.href}`}> */}
              <tr className={`${codeLen === undefined || codeLen ===  "" ? "text-blue-500" :""} `}>
                {headers.map((item) => {
                  return (
                    <td
                      key={item.name}
                      className={`px-6 py-4 text-sm font-normal  tracking-tighter turncate  border-t border-white`}
                      onClick={() => {
                        onClick && onClick();

                        responseData && responseData(dataRow, index);
                      }}
                    >
                      {typeof dataRow[item.name] === 'function'
                        ? dataRow[item.name]()
                        : dataRow[item.name]}
                    </td>
                  );
                })}
              </tr>
            </Link>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;






