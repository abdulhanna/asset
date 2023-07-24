import Table from '../molecules/table';

const classes = {
  table: 'w-full text-sm text-left  ',
  thead: 'text-sm  uppercase bg-primary border-b text-gray-500  font-semibold',
  tbody: 'bg-white cursor-pointer',
  tr: 'text-white font-medium text-sm text-left',
  th: 'px-6 py-4  truncate',
  td: 'px-6 py-4 text-sm font-normal  tracking-tighter turncate text-primary border-t border-gray-200',
};

const TableComp = ({
  headers,
  body,
  href,
  onClick,
  responseData,
  extraclasses,
}) => {


  return (
    <div className="h-auto py-8">
      <div className="relative overflow-x-auto rounded-lg">
        <Table
          headers={headers}
          data={body}
          classes={classes}
          href={href}
          extra={extraclasses}
          onClick={onClick}
          responseData={responseData}
        />
      </div>
    </div>
  );
};

export default TableComp;
