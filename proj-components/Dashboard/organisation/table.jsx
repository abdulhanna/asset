import React from 'react'
import { ColClickTable } from '@/components/molecules/table'
import { SampleTableCheckBox } from '../tableItem';
import Paging from '@/components/molecules/paging';
import { Verification, Resend } from '@/components/atoms/icons';
import { toast } from 'react-toastify';
import orgApi from 'helpers/use-api/organisations';
import Button from '@/components/atoms/button';

const classes = {
  table: 'w-full text-sm text-left  ',
  thead: 'text-sm  uppercase bg-[#F7F7F7] border-b text-gray-500  font-semibold',
  tbody: 'bg-white cursor-pointer',
  tr: 'text-[#121212] font-body text-sm text-left',
  th: 'px-6 py-4  truncate',
  td: 'px-6 py-4 text-sm font-normal  tracking-tighter turncate text-[#121212] border-t border-white',
};

export const OrganisationTableComponent = ({ headers,
  body,
  href,
  onClick,
  responseData,
  extraclasses, clickAll, checkAllStatus }) => {
  return (
    <div className="h-auto min-h-[600px] py-8">
      <div className="relative overflow-x-auto rounded-lg">
        <ColClickTable
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
}


export const OrganisationTableNew = ({
  headerData,
  response,
  onClick,
  responseData,
  totalDoc,
  start,
  end,
  checkedData,
  clickAll,
  checkAllStatus,
  currentPage,
  pageSize,
  onPageChange,
  onPageSize,
  chemicalPaginationData,
  microPaginationData,
  type

}) => {

  return (
    <>
      <OrganisationTableComponent
        headers={headerData}
        onClick={onClick}
        responseData={responseData}
        clickAll={clickAll}
        checkAllStatus={checkAllStatus}
        href={`/dashboard/root/organisation/organizationprofile?`}
        body={response?.map((row) => ({
          ...row,

          check: <SampleTableCheckBox data={checkedData} bodyData={row} />,
          href: `id=${row._id}`,

          email: (
            <VerificationEmail data={row} />
          ),
          contactNo: (<VerificationPhone data={row} />),
          action: (
            <Verificationreq data={row} />
          )


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
        onPageSize={onPageSize}
        onPageChange={onPageChange} />

    </>
  );
};


export const Verificationreq = ({ data }) => {
  // console.log(data, "this is a Verification")
  const verification = async () => {

    let email = {
      email: data.userId.email
    }

    try {
      const res = await orgApi.resendEmail(email)
      console.log(res)
      toast.success("Sent email successfully")
    } catch (e) {
      toast.error("Error sending email")
    }
  }
  return (
    <div>
      <Button onClick={verification}>
        Resend Email
      </Button>
    </div>
  )
}

export const VerificationEmail = ({ data }) => {
  // console.log(data, "this is a Verification")
  const verification = async () => {

    let email = {
      email: data.userId.email
    }

    // try {
    //   const res = await orgApi.resendEmail(email)
    //   console.log(res)
    //   toast.success("Sent email successfully")
    // } catch (e) {
    //   toast.error("Error sending email")
    // }
  }
  return (
    <div className='flex items-center'>
      <div className='w-[160px]'><span>{data.userId.email}</span></div>
      {data?.userId?.is_email_verified == true ? <Verification /> : <Resend />}
    </div>
  )
}

export const VerificationPhone = ({ data }) => {
  // console.log(data, "this is a Verification")
  const verification = async () => {

    let email = {
      email: data.userId.email
    }

    // try {
    //   const res = await orgApi.resendEmail(email)
    //   console.log(res)
    //   toast.success("Sent email successfully")
    // } catch (e) {
    //   toast.error("Error sending email")
    // }
  }
  return (
    <div className='flex items-center'>
      <span className='w-[100px]'>{data.contactNo}</span>
      {data?.userId?.is_phone_verified == true ? <Verification /> : <Resend />}
    </div>
  )
}


