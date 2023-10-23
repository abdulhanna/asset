import Table from "../molecules/table";
import { useState } from "react";
import Button from "../atoms/button";
import {
  SampleTableCheckBox,
  ClickCheckBoxComp,
} from "proj-components/Dashboard/tableItem";
import {
  ActionTable,
  CheckWithLinkTable,
  Table1,
  Table2,
  Table3,
  Table4
} from "../molecules/table";
import { TrashOutline } from "../atoms/icons";
import { EditIcon, DeleteIcon } from "../atoms/icons";
import { ToggleButton, ToggleOnButton } from "../atoms/icons";
import { Text1 } from "../atoms/field";
import Paging from "../molecules/paging";
import { DateTime } from "luxon";
// const classes = {
//   table: 'w-full text-sm text-left  ',
//   thead: 'text-sm  uppercase bg-[#F7F7F7] border-b text-gray-500  font-semibold',
//   tbody: 'bg-white cursor-pointer',
//   tr: 'text-white font-medium text-sm text-left',
//   th: 'px-6 py-4  truncate',
//   td: 'px-6 py-4 text-sm font-normal  tracking-tighter turncate text-primary border-t border-gray-200',
// };

const classes = {
  table: "w-full text-sm text-left  ",
  thead:
    "text-sm  uppercase bg-[#F7F7F7] border-b text-gray-500  font-semibold",
  tbody: "bg-white cursor-pointer",
  tr: "text-[#121212] font-body text-sm text-left ",
  th: "px-6 py-4  truncate",
  td: "px-6 py-4 text-sm font-normal  tracking-tighter turncate text-[#121212] border-t border-white",
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

export const TableComp1 = ({
  headers,
  body,
  href,
  onClick,
  editItem,
  clickAll,
  checkAllStatus,
  responseData,
  extraclasses,
}) => {
  return (
    <div className="h-auto py-4">
      <div className="relative overflow-x-auto rounded-lg">
        <Table1
          headers={headers}
          data={body}
          classes={classes}
          href={href}
          // clickAll={clickAll}
          // checkAllStatus={checkAllStatus}
          // editItem={editItem}
          extra={extraclasses}
          onClick={onClick}
          responseData={responseData}
        />
      </div>
    </div>
  );
};

export const SampleTableNew = ({
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
  chemicalPaginationData,
  microPaginationData,
  type,
}) => {
  return (
    <>
      <NewSampleReceivingTableComponent
        headers={headerData}
        onClick={onClick}
        responseData={responseData}
        clickAll={clickAll}
        checkAllStatus={checkAllStatus}
        href={href}
        body={response?.map((row) => ({
          ...row,

          check: <SampleTableCheckBox data={checkedData} bodyData={row} />,
          href: `id=${row._id}`,
          isDeactivated: row.isDeactivated ? "InActive" : "Active"
          //   type: <p>{row.isFieldSample && row.isFieldSample === true ? 'Field Sample':'Lab Sample'}</p>,
          //   href: row.sampleStatus === '2New'?`/dashboard/sample/sampleDetails/?sampleId=${row._id}`:'',
          //   sampleId: row.sample_id.toUpperCase(),
          //   qrCode: row.qr_code.length !== 0 ?row.qr_code.find((item)=> item._id === row.sub_sample_for._id).qr.toUpperCase():'-',
          // date: (
          //   <div className="flex flex-col">
          //     <p>{dateFormat(row.createdAt, 'dd-MMM-yyyy ')}</p>
          //     <p className="text-xs font-light">
          //       {dateFormat(row.createdAt, 'h:mm a')}
          //     </p>
          //   </div>
          // ),
          // sourceData: row.source
          //   ? row.source.label
          //   : '-',
          // subSourceData: row.subSource
          //   ? row.subSource.label
          //   : '-',
          // sampleForData: row.sample_for.checklabel,
          // locationData: <p className='truncate'>{row.plant
          //     ? row.plant.name
          //     : row.schedulePlant
          //         ? row.schedulePlant.name
          //         : row.location.name}</p>,
          // status: (
          //     <Badge
          //         className={`text-light font-normal py-1 px-4 ${
          //             row.sampleStatus === 'Approved'
          //                 ? ' bg-green-500 text-white'
          //                 : row.sampleStatus === 'Reject'
          //                     ? 'bg-red-500 text-white'
          //                     : row.sameplStatus === 'Assigned'
          //                         ? 'bg-yellow-500 text-yellow-50'
          //                         : 'bg-blue-200 text-blue-700'
          //         }`}
          //     >
          //         {row.sampleStatus === 'Approved'
          //             ? 'Received'
          //             : row.sampleStatus === 'Reject'
          //                 ? 'Rejected'
          //                 : row.sampleStatus === 'Assigned'
          //                     ? 'Assigned'
          //                     : 'New'}
          //     </Badge>
          // ),
        }))}
      />
      <Paging
        // chemicalItems ={chemicalPaginationData}
        // microItems ={microPaginationData}
        // type ={type}
        start={start}
        end={end}
        totalDoc={totalDoc}
        currentPage={currentPage} // 1
        pageSize={pageSize} // 10
        onPageChange={onPageChange}
      />
    </>
  );
};

export const NewSampleReceivingTableComponent = ({
  headers,
  body,
  href,
  onClick,
  responseData,
  extraclasses,
  clickAll,
  checkAllStatus,
}) => {
  return (
    <div className="h-auto py-8 min-h-[590px]">
      <div className="relative overflow-x-auto rounded-lg">
        <CheckWithLinkTable
          headers={headers}
          data={body}
          classes={classes}
          href={href}
          extra={extraclasses}
          onClick={onClick}
          responseData={responseData}
          clickAll={clickAll}
          checkAllStatus={checkAllStatus}
        />
      </div>
    </div>
  );
};

export const AssignedUserTable = ({
  headers,
  response,
  href,
  onClick,
  responseData,
  extraclasses,
}) => {
  return (
    <div className="h-auto py-8">
      <div className="relative overflow-x-auto rounded-lg">
        <ActionTable
          headers={headers}
          data={response.map((item) => {
            return {
              ...item,
              action: <TrashOutline />,
            };
          })}
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

export const FieldActionTable = ({
  headers,
  response,
  href,
  onClick,
  onEdit,
  onDelete,
  checkedData,
  clickAll,
  checkAllStatus,
  responseData,
  extraclasses,
}) => {
  return (
    <div className="h-auto py-8">
      <div className="relative overflow-x-auto rounded-lg">
        <TableComp1
          headers={headers}
          body={response?.map((row) => {
            return {
              ...row,
              // check: <SampleTableCheckBox data={checkedData} bodyData={row} />,
              action: (
                <EditDelete data={row} onEdit={onEdit} onDelete={onDelete} />
              ),
            };
          })}
          classes={classes}
          href={href}
          extra={extraclasses}
          onClick={onClick}
          clickAll={clickAll}
          checkAllStatus={checkAllStatus}
          responseData={responseData}
        />
      </div>
    </div>
  );
};

export const PermissionActionTable = ({
  headers,
  response,
  href,
  onClick,
  onEdit,
  onDelete,
  checkedData,
  clickAll,
  checkAllStatus,
  responseData,
  extraclasses,
}) => {
  return (
    <div className="h-auto py-4 min-h-[600px]">
      <div className="relative overflow-x-auto rounded-lg">
        <TableComp1
          headers={headers}
          body={response?.map((row) => {
            // console.log(row, "s");
            return {
              ...row,
              href: row._id,
              createdAt: DateTime.fromISO(row.createdAt).toLocaleString(
                // DateTime.DATE_MED
                DateTime.DATETIME_SHORT
              ),
              isDeactivated: row.isDeactivated ? "InActive" : "Active",
              check: <SampleTableCheckBox data={checkedData} bodyData={row} />,
              action: (
                <ToggleComp data={row} onEdit={onEdit} onDelete={onDelete} />
              ),
            };
          })}
          classes={classes}
          href={href}
          extra={extraclasses}
          onClick={onClick}
          clickAll={clickAll}
          checkAllStatus={checkAllStatus}
          responseData={responseData}
        />
      </div>
    </div>
  );
};

const EditDelete = ({ data, onEdit, onDelete }) => {
  // console.log(data,'e')
  return (
    <div className="flex items-center space-x-4">
      <EditIcon onClick={() => onEdit(data)} style={{ cursor: "pointer" }} />
      <DeleteIcon
        className={"mx-2"}
        style={{ cursor: "pointer" }}
        onClick={() => onDelete(data._id)} // Add delete functionality here
      />
    </div>
  );
};

const ToggleComp = ({ data }) => {
  const handleClick = (e) => {
    console.log(e);
  };
  // console.log(data.allAccess,'data')
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Text1>All Access</Text1>
        {data.allAccess ? (
          <ToggleOnButton
            onClick={() => handleClick({ allAccess: !data.allAccess })}
          />
        ) : (
          <ToggleButton
            onClick={() => handleClick({ allAccess: !data.allAccess })}
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Text1>Remove Access</Text1>
        {data.removeAccess ? (
          <ToggleOnButton
            onClick={() => handleClick({ removeAccess: !data.removeAccess })}
          />
        ) : (
          <ToggleButton
            onClick={() => handleClick({ removeAccess: !data.removeAccess })}
          />
        )}
      </div>
    </div>
  );
};


export const MasterTableComponent = ({
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
        <Table4
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
  )
}

// export const MasterTableLogs = ({
//   headers,
//   response,
//   href,
//   onClick,
//   onEdit,
//   onDelete,
//   checkedData,
//   clickAll,
//   checkAllStatus,
//   responseData,
//   extraclasses,
// })=>{
//     return (
//       <div className="h-auto py-4">
//         <div className="relative overflow-x-auto rounded-lg">
//           <TableComp1
//             headers={headers}
//             body={response?.map((row) => {
//               return {
//                 ...row,
//                 // check: <SampleTableCheckBox data={checkedData} bodyData={row} />,
//                 action: (
//                   <EditDelete data={row} onEdit={onEdit} onDelete={onDelete} />
//                 ),
//               };
//             })}
//             classes={classes}
//             href={href}
//             extra={extraclasses}
//             onClick={onClick}
//             clickAll={clickAll}
//             checkAllStatus={checkAllStatus}
//             responseData={responseData}
//           />
//         </div>
//       </div>
//     )
// }

export const TableComp2 = ({
  headers,
  body,
  href,
  onClick,
  checkedData,
  clickAll,
  checkAllStatus,
  responseData,
  extraclasses,
}) => {
  return (
    <div className="h-auto py-8">
      <div className="relative overflow-x-auto rounded-lg">
        <Table3
          headers={headers}
          data={body}
          classes={classes}
          href={href}
          extra={extraclasses}
          onClick={onClick}
          clickAll={clickAll}
          checkAllStatus={checkAllStatus}
          responseData={responseData}
        />
      </div>
    </div>
  );
};

export const MasterTableLogs = ({
  headerData,
  response,
  onClick,
  responseData,
  href,
  totalDoc,
  checkedData,
  clickAll,
  checkAllStatus,
  onEdit,
  onDelete,
  currentPage,
  start,
  end,
  pageSize,
  onPageChange,
}) => {

  return (
    <TableComp2
      headers={headerData}
        onClick={onClick}
        responseData={responseData}
        clickAll={clickAll}
        checkAllStatus={checkAllStatus}
        href={href}
        body={response.map((row)=>({
          ...row,
          href:`id=${row._id}`,
          // check: <SampleTableCheckBox data={checkedData} bodyData={row} />,
          action: (
                <PublishStatus data={row}/>
              ),
        }))}
    />
  )
}

const PublishStatus = ({data})=>{
  // console.log(data,'datarow')
  return (
    <div className=''>
      {data.status ? <Text1 color='text-green-400'>PUBLISHED</Text1> : <Button onClick={() => alert(data._id)}>PUBLISH</Button>}
    </div>
  )
}




export default TableComp;
