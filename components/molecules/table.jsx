import Link from 'next/link';
import { EditIcon } from '../atoms/icons';

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

  
  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>
          {headers.map((item, index) => (
            // console.log(item,'dd'),
            <th key={index}
              className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${
                index === lastIndex && 'rounded-tr-lg'
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
              {/* <Link href={`${dataRow.href}`}> */}
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
                      {/* {typeof dataRow[item.name] === 'function'
                        ? dataRow[item.name]()
                        : dataRow[item.name]} */}
                        {dataRow[item.name] === "action" ? <div><EditIcon onClick={(e)=> editItem(dataRow.id)}/></div>: dataRow[item.name]}
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
