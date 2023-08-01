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
import DialogPage from "../components/molecules/dialog";
import Sidebar from "../components/organism/sidebar";
import { useScroll } from "framer-motion";
import SidebarComp from "../proj-components/Layout/sub-components/navbar-components";
import Button from "../components/atoms/button";
import Image from "next/image";
import img1 from "../public/images/auth/acountVarified.svg";
import { Nodata } from "../components/atoms/icons";

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
    <DialogPage open={open} close={close}>
      <div className=" text-center flex flex-col gap-8">
    
          <div className="flex flex-col gap-6">
            <div>
              <Image src={img1} className="" />
            </div>
            <p className="text-2xl font-medium leading-8 text-[#3B5FDA]">Account Not Verified!</p>
            <p className="w-[400px] text-sm font-normal mx-auto">
              In order to start using your Asset Monitoring account, please
              verify your email address
            </p>
          </div>
          <div>
            <Button variant="contained">RESEND VERIFICATION EMAIL</Button>
          </div>
        
      </div>
    </DialogPage>
  );
};

const Test = () => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [high, setHigh] = useState(false);

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

        <Nodata/>
     
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
      <AccountShow open={high} close={() => setHigh(false)} />
    </div>
  );
};

export default Test;
