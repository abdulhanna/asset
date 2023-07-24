import Link from 'next/link';

const Table = ({
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
           {/* console.log(dataRow) */}
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
