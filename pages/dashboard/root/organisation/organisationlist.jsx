import React, { useState, useEffect } from "react";
import MainLayout from "../../../../proj-components/MainLayout";
import Overview from "../../overview";
import {
  EmptyData,
  Verified,
  ResendEmail,
} from "../../../../components/atoms/icons";
import TableComp from "../../../../components//organism/tablecomp";
import { Text1 } from "../../../../components/atoms/field";
import Button from "../../../../components/atoms/button";
import { SampleTableNew } from "../../../../components//organism/tablecomp";
import { OrganisationTableNew } from "proj-components/Dashboard/organisation/table";
import { useRouter } from "next/router";
import { Nodata } from "../../../../components/atoms/icons";

const OrganisationList = () => {
  const [checkedNewData, setCheckedNewData] = useState([]);
  const [allClick, setAllClick] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const HeaderGoods = [
    { label: "Organization Name", name: "name" },
    { label: "Type", name: "types" },
    { label: "Verification", name: "verification" },
    { label: "Batch", name: "batch" },
    { label: "Id Number", name: "id" },
  ];
  // const [Href, setHref] = useState("");

  const Headerbody = [
    {
      _id: 1,
      name: "prince",
      types: "employe",
      verification: <Verified />,
      batch: "B",
      id: "234",
    },
    {
      _id: 2,
      name: "siddhu",
      types: "employe",
      verification: <Verified />,
      batch: "B",
      id: "231",
    },
    {
      _id: 3,
      name: "john",
      types: "employe",
      verification: <ResendEmail />,
      batch: "C",
      id: "3241",
    },
  ];

  const handleAddButtonClick = () => {
    router.push("/dashboard/root/organisation/add"); // This will navigate to the 'add-form' page
  };

  const clickAll = (e) => {
    setAllClick(!allClick);
  };

  const onNewCheck = (data) => {
    console.log(data, "data");
    const exist = checkedNewData.find((element) => element._id === data._id);
    console.log(exist, "exit");
    if (exist) {
      setCheckedNewData(
        checkedNewData.filter((single) => single._id !== data._id)
      );
    } else {
      setCheckedNewData([...checkedNewData, data]);
    }
  };

  useEffect(() => {
    console.log(checkedNewData, "cehc");
  }, [checkedNewData]);

  useEffect(() => {
    if (allClick === true) {
      setCheckedNewData(Headerbody);
    } else {
      setCheckedNewData([]);
    }
  }, [allClick]);



  return (
    <>
      {/* <Overview loginRole={root}/> */}

      <div className="flex justify-between mb-4">
        <Text1 size="2xl" weight="medium">
          All Organizations
        </Text1>
        <Button
          onClick={handleAddButtonClick}
          variant="contained"
          className="px-6 h-10"
        >
          Add Organizations
        </Button>
      </div>

      <div className=' rounded-md flex items-center justify-center inset-y-2/4 inset-x-2/4  mt-[320px] overflow-hidden'>
        <div className='text-center'>
          <Nodata className={'flex justify-center'} />
          <div className='mt-3'>
            <span className='text-gray-600'> No Added Sub-group</span>

          </div>
        </div>

      </div>

      <OrganisationTableNew
        response={Headerbody}
        headerData={[{ name: "check", label: "" }, ...HeaderGoods]}
        checkedData={checkedNewData}
        responseData={(e) => onNewCheck(e)}
        //  href={`/dashboard/root/organisation/organizationprofile?`}
        clickAll={clickAll}
        onClick={(e) => console.log(e, "onclick")}
        checkAllStatus={allClick}
        totalDoc={checkedNewData?.currentPage}
        currentPage={checkedNewData?.currentPage}
        start={checkedNewData.startSerialNumber}
        end={checkedNewData.endSerialNumber}
        pageSize={checkedNewData?.totalPages}
        onPageChange={(page) => console.log(page)}
      />
    </>
  );
};

export default OrganisationList;
