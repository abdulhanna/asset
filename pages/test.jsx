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
    </div>
  );
};

export default Test;
