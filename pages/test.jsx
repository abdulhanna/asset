import React, { useState } from "react";
import Text, {
  Text1,
  InputField,
  TextArea,
  TextField,
  TextInputArea,
  CustomSelect,
} from "../components/atoms/field";
import TableComp from "../components/organism/tablecomp";
import DialogPage, { DialogPage1 } from "../components/molecules/dialog";
import Sidebar from "../components/organism/sidebar";
import { useScroll } from "framer-motion";
import SidebarComp from "../proj-components/Layout/sub-components/navbar-components";
import Button from "../components/atoms/button";
import Image from "next/image";
import img1 from "../public/images/auth/acountVarified.svg";
import { Nodata, UpArrow } from "../components/atoms/icons";
import AddInputDiv from "./testComponents/addInputDiv";
import AddField from "./testComponents/addField";
import SampleTableReceived from "./test1";

const ShowData = ({ open, close, data }) => {
  return (
    <DialogPage open={open} close={close}>
      <div>
        {JSON.stringify(data)}

        <button onClick={close}>close</button>
      </div>
    </DialogPage>
  );
};

const AccountShow = ({ open, close }) => {
  return (
    <DialogPage open={open} close={close} width="w-[510px]">
      <div className=" text-center flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <Image src={img1} className="" />
          </div>
          <p className="text-2xl font-medium leading-8 text-[#3B5FDA]">
            Account Not Verified!
          </p>
          <p className="w-[400px] text-sm font-normal mx-auto">
            In order to start using your Asset Monitoring account, please verify
            your email address
          </p>
        </div>
        <div>
          <Button variant="contained">RESEND VERIFICATION EMAIL</Button>
        </div>
      </div>
    </DialogPage>
  );
};

export const AddCompanyLogo = ({ open, close }) => {
  return (
    <DialogPage1 open={open} close={close} width="w-[510px]">
      <div className=" text-center flex flex-col gap-6">
        <div className="flex flex-col gap-8 justify-center items-center">
          <div>
            <p className="text-2xl font-medium leading-8 text-[#3B5FDA] mb-[14px]">
              Add Profile Picture
            </p>
            <Button variant="transparent">
              <div className="w-[60px] h-[60px] rounded-[50%] bg-[#3B5FDA] flex justify-center items-center">
                <UpArrow />
              </div>
            </Button>
          </div>
          <div className="w-[161px]">
            <p className="text-xs font-normal">
              Drag and Drop files here,
              <span className="text-[#666]"> OR, </span>
            </p>
            <Button className={"font-medium border-none"}>BROWSER FILES</Button>
          </div>
          <div>
            <p className="text-[12px] leading-[14px] font-normal text-[#666]">
              Supported files
            </p>
            <p>
              <label
                htmlFor=""
                className="text-[12px] leading-[14px] font-normal text-[#A4A4A4]  border-r-2 border-slate-400">
                Upto 2MB max
              </label>{" "}
              <label
                htmlFor=""
                className="text-[12px] leading-[14px] font-normal text-[#A4A4A4] ">
                JPG, JPEG, PNG
              </label>
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-center">
          <Button variant="primary" onClick={close}>
            CANCEL
          </Button>
          <Button variant="contained">FINISH</Button>
        </div>
      </div>
    </DialogPage1>
  );
};

const AddInputField = ({ open, close }) => {
  return (
    <>
      <DialogPage open={open} close={close}>
        <AddInputDiv />
      </DialogPage>
    </>
  );
};
const AddtextField = ({ open, close }) => {
  return (
    <>
      <DialogPage1 open={open} close={close} width="w-[1288px]">
        <div className="w-full text-right  pb-3 pr-8">
          <button onClick={close} >
            X
          </button>
        </div>
        <AddField />
      </DialogPage1>
    </>
  );
};

const Test = () => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [high, setHigh] = useState(false);
  const [logohigh, setLogoHigh] = useState(false);
  const [inputHigh, setInputHigh] = useState(false);
  const [textHigh, setTextHigh] = useState(false);

  const HeaderGoods = [
    { label: "Name", name: "name" },
    { label: "Type", name: "types" },
    { label: "Batch", name: "batch" },
    { label: "Id Number", name: "id" },
  ];
  const [Href, setHref] = useState("");

  const Headerbody = [
    { id: 1, name: "prince", types: "employe", batch: "B", id: "234" },
    { id: 2, name: "siddhu", types: "employe", batch: "B", id: "231" },
    { id: 3, name: "john", types: "employe", batch: "C", id: "3241" },
  ];
  const headerDataNew = [
    // {name:'check',label:""},
    { name: 'date',
      label: 'Date' },
    {
      name: 'sampleId',
      label: 'Sample ID',
    },
    {
      name: 'qrCode',
      label: 'QR Code',
    },
    {
      name: 'sourceData',
      label: 'Source Type',
    },
    {
      name: 'locationData',
      label: 'Location',
    },
    {
      name: 'subSourceData',
      label: 'Sub Location',
    },
    {
      name: 'type',
      label: 'Type',
    }
  ];

  const openModal = (e) => {
    // setsampleResponse(e)
    // setActive(true);
    console.log(e,'g')

  };


  const onCheck=(data)=>{
    console.log(data,'dd')

    // if(samplePermission.actions === true){
    //   const exist = checkedData.find(
    //       (element) => element._id === data._id
    //   );
    //   if(checkedData.length === 0){
    //     if (exist) {
    //       setCheckedData(
    //           checkedData.filter((single) => single._id !== data._id)
    //       );
    //     } else {
    //       setCheckedData([...checkedData, data]);
    //     }
 
    //     if(data.subSource){
 
    //       const filterdData =  approvedFilteredSample.filter((item)=> item.source._id === data.source._id && item.subSource._id === data.subSource._id &&  item.sample_for._id ===  data.sample_for._id && item.qr_code.length !== 0)
    //       setCheckedData(filterdData)
    //     }else{
    //       const filterdData =  approvedFilteredSample.filter((item)=> item.source._id === data.source._id  &&  item.sample_for._id ===  data.sample_for._id && data.qr_code.length !== 0)
    //       setCheckedData(filterdData)
    //     }
    //     setCurrentSubSource(data);
    //   } else if (checkedData.find(item => item.source._id) && data.source._id && !data.subSource && checkedData.find(item => item.source._id === data.source._id && item.sample_for._id === data.sample_for._id && item.qr_code.length !== 0)){
    //     if (exist) {
    //       setCheckedData(
    //           checkedData.filter((single) => single._id !== data._id)
    //       );
    //     } else {
    //       setCheckedData([...checkedData, data]);
    //     }
    //   }else if (checkedData.find(item => item.source._id && item.subSource._id) && data.source._id && data.subSource._id && checkedData.find(item => item.source._id === data.source._id && item.subSource._id === data.subSource._id && item.sample_for._id === data.sample_for._id && item.qr_code.length !== 0)){
    //     if (exist) {
    //       setCheckedData(
    //           checkedData.filter((single) => single._id !== data._id)
    //       );
    //     } else {
    //       setCheckedData([...checkedData, data]);
    //     }
    //   }
    // }
 
 
 
   }

  return (
    <div className="p-4">
      <div className="space-y-2">
        <Nodata />
        <Text size="lg" weight="medium">
          this is text component
        </Text>
        <Text1 size="lg" weight="medium">
          this is text component1
        </Text1>
        <InputField handleChange={(e) => console.log(e.target.value)} />
        <TextArea handleChange={(e) => console.log(e.target.value)} />
        <TextField label="Name" placeHolder="TextField component" />
        <TextInputArea
          label="Description"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <button onClick={() => setIsOpen(true)}>open dialog </button>
      <DialogPage open={isOpen} close={() => setIsOpen(!isOpen)}>
        sfkasb
      </DialogPage>
      <div>
        {JSON.stringify(data1)}
        <TableComp
          headers={HeaderGoods}
          responseData={(e) => setData1(e)}
          body={Headerbody.map((item, index) => {
            return {
              ...item,
              // href:`/${index}`
            };
          })}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <div>
        <TableComp
          headers={HeaderGoods}
          responseData={(e) => console.log(e, "e")}
          body={Headerbody.map((item) => {
            return {
              ...item,
              href: `id=${item.id}`,
            };
          })}
          href={`/testing/?`}
        />
      </div>
      {/* <DialogPage open={isOpen} close={()=> setIsOpen(false)} >siodfkadlsb</DialogPage> */}
      <div>
        {/* <Sidebar>sakdfl</Sidebar> */}
        <SidebarComp></SidebarComp>
      </div>
      <ShowData open={isOpen} close={() => setIsOpen(false)} data={data1} />
      <div className="space-x-4 my-4">
        <Button> primary</Button>
        <Button variant="contained">contained</Button>
        <Button variant="primary1">primary1</Button>
        {/* <p className='bg-primary'>fjsa</p> */}
      </div>
      <div>
        <CustomSelect
          label={"City"}
          handleChange={(e) => console.log(e.target.value)}>
          <option value={""}>choose city</option>
          <option value={"mumbai"}>mumbai</option>
          <option value={"delhi"}>delhi</option>
          <option value={"patna"}>patna</option>
        </CustomSelect>
      </div>
      <button onClick={() => setHigh(true)} className="border-2 p-1 rounded-md">
        Open Acount varification Page
      </button>
      <AccountShow open={high} close={() => setHigh(false)} />{" "}
      {/* add company logo popup  */}
      <button
        onClick={() => setLogoHigh(true)}
        className="border-2 p-1 rounded-md">
        Add Company Logo
      </button>
      <AddCompanyLogo open={logohigh} close={() => setLogoHigh(false)} />
      {/* add input field component */}
      <div className="py-2">
        <button
          onClick={() => setInputHigh(true)}
          className="border-2 p-1 rounded-md">
          Add input Field
        </button>
        <AddInputField open={inputHigh} close={() => setInputHigh(false)} />
      </div>
      <div className="py-2">
        <button
          onClick={() => setTextHigh(true)}
          className="border-2 p-1 rounded-md">
          Add Text Field
        </button>
        <AddtextField open={textHigh} close={() => setTextHigh(false)} />
      </div>
      <div>
      <SampleTableReceived
                          response={[{sample_id:'fdghj',qr_code:'dfghghfg',data:'12/02/23',sourceData:"dafsgh",locationData:"delhii",subSourceData:"dsgefg",type:'none'}]}
                          headerData={ [{ name: 'check', label: '' },...headerDataNew]}
                          onClick={openModal}
                          checkedData={[{sampleId:123}]}
                          responseData={(e) => onCheck(e)}
                          // rejectSample={(e) => rejectSample(e)}
                          // approveSample={(e) => approveSample(e)}
                          // samplePermission={samplePermission}
                          // currentPage ={currentPage}
                          // pageSize ={pageSize}
                          // onPageChange ={onPageChange}
                          // chemicalPaginationData ={chemicalPaginationData}
                          // microPaginationData ={microPaginationData}
                          // type ={type}

                      />
      </div>
    </div>
  );
};


export const SampleReceivingTable = ({
  headers,
  data,
  classes,
  extra,
  onClick,
  responseData,
   clickAll,
   checkAllStatus
}) => {
const lastIndex = headers.length - 1;
let sortedData;

const [sortOrder, setSortOrder] = useState('none'); // State to track the sort order

const sortData = (field, ascending) => {
return data.sort((a, b) => {
if (field === 'date') {
const dateA = a.createdAt;
const dateB = b.createdAt;
return ascending ? (dateA - dateB) : (dateB - dateA);
} else if(field === 'locationData'){
const valueA = a[field].props.children.toString().toLowerCase();
const valueB = b[field].props.children.toString().toLowerCase();
return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
}else {
const valueA = a[field].toString().toLowerCase();
const valueB = b[field].toString().toLowerCase();
return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
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
  if(sortOrder[field] === 'none') {
  return(
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
  return(
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
    className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${
    index === lastIndex && 'rounded-tr-lg'
    }`}
    scope="col"
    onClick={()=> index === 0 ? clickAll('click'):handleSortClick(item.name)}
    >
    <div className="flex flex-row">
    {index === 0 ? <ClickCheckBoxComp status={checkAllStatus === true ? "true": "false"} /> : typeof item.label === 'function' ? item.label() : item.label}
    {!(index === 0) && <div>{renderSortIcon(item.name)}</div>}
    </div>

    </th>
    ))}
    </tr>
    </thead>

    <tbody className={classes.tbody}>
    {sortedData.map((dataRow, index) => {
    return (

<tr>
    {headers.map((item,index) => {
    return (
    <td
      key={item.name}
      className={`${classes.td} ${extra}`}
      onClick={() => {
          if(index === 0){
              responseData && responseData(dataRow);
          }else {
              onClick && onClick(dataRow);
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

export default Test;
