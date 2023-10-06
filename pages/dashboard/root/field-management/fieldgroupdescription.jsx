import React, { useState } from 'react'
import { Text1 } from "@/components/atoms/field";
import Button from '../../../../components/atoms/button';
import DialogPage, { DialogPage1 } from '../../../../components/molecules/dialog';
import AddInputDiv from '../../../testComponents/addInputDiv'
import MainLayout from 'proj-components/MainLayout';
import AddField from 'pages/testComponents/addField';
import { CloseIcon } from '@/components/atoms/icons';
import { useRouter } from 'next/router';
import { doCheckAuth } from '@/utils/doCheckAuth';
import { ToastContainer, toast } from 'react-toastify';
import field from 'helpers/use-api/fieldmanagment';
// Add field Modal
const AddInputField = ({ open, close, showData, setShow }) => {

  const getData = ({ data }) => {
    console.log(data, "yes this dta")
  }

  const handleSave = (data) => {
    // console.log(data, "this is inputdata")

    // CReating subgroup data 
    const subgroup = data?.groupNames?.map((groupname) => {
      return {
        subgroupName: groupname
      }
    })


    let obj = { subgroups: subgroup }

    showData(obj)
    setShow(true)
    close()
  };
  return (
    <>
      <DialogPage open={open} close={close}>
        <AddInputDiv Heading="Creat Sub Group" labelName="Sub Group Name" getData={getData} handleSave={handleSave} />
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
            <CloseIcon />
          </button>
        </div>
        <AddField />
      </DialogPage1>
    </>
  );
};



const Fieldgroupdescription = ({ user, access_token }) => {
  const [inputHigh, setInputHigh] = useState(false);
  const [show, setShow] = useState(true)
  const [textHigh, setTextHigh] = useState(false);

  const router = useRouter();

  const notify = (msg) => toast.success(msg)
  const error = (msg) => toast.danger(msg)

  const { id, name } = router.query


  const data = [
    {
      id: 1,
      title: 'Asset Description',
    }, {
      id: 2,
      title: 'Asset Acquisition',
    },
    {
      id: 3,
      title: 'UOM',
    },
    {
      id: 4,
      title: 'Asset newsletters',
    }
  ]


  const showData = async (data) => {
    try {
      const res = await field.addSubgroupbyID(access_token, id, data)
      console.log(res, "this is data")
      notify("Added Successfully")
      router.push('/dashboard/root/field-management')
    } catch (e) {
      console.log(e)
    }
    console.log(data, "this is data")
  }

  const handleAddButtonClick = () => {
    setInputHigh(true)
  }

  const editgroup = () => {
    console.log("this is edit page")
  }

  return (
    <>
      <MainLayout User={user} isScroll='true'>
        <div className='flex justify-between mb-4 px-2'>
          <Text1 size="2xl" weight="medium">
            {name}
          </Text1>
          <div>
            <Button onClick={handleAddButtonClick} variant="contained" className="mr-1.5"> CREACT SUB GROUP</Button>

            <Button onClick={editgroup} className="mb-2 bg-green-500 hover:border-green-500 hover:bg-green-600 hover:text-white px-6 py-2 rounded transition transform hover:scale-110 ">
              EDIT GROUP
            </Button>
          </div>
        </div>

        {data.map((component) => (
          <div key={component.id} className="flex justify-between py-4 mb-2">
            <Text1 size='lg' weight='medium'>
              {component.title}
            </Text1>
            <div>
              <Button onClick={() => setTextHigh(true)} className="mb-2 bg-blue-500 hover:bg-blue-600 hover:text-white px-6 py-2 mx-4 rounded transition transform hover:scale-110 ">
                ADD FIELD
              </Button>

            </div>
          </div>
        ))}


        <AddInputField open={inputHigh} close={() => setInputHigh(false)} showData={showData} setShow={setShow} />
        <AddtextField open={textHigh} close={() => setTextHigh(false)} />
        <ToastContainer />
      </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {

  let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  const auth = await doCheckAuth(appCtx)
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };

  } else {
    return {
      props: {
        user: auth,
        access_token
      }
    }
  }

}


export default Fieldgroupdescription

