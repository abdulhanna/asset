import React, { useState, useEffect } from 'react'
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
import authApi from 'helpers/use-api/auth';
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


const AddtextField = ({ open, close, id }) => {

  return (
    <>
      <DialogPage1 open={open} close={close} width="w-[1288px]">
        <div className="w-full text-right  pb-3 pr-8">
          <button onClick={close} >
            <CloseIcon />
          </button>
        </div>
        <AddField close={close} id={id} />
      </DialogPage1>
    </>
  );
};



const Fieldgroupdescription = ({ user, access_token }) => {
  const [inputHigh, setInputHigh] = useState(false);
  const [show, setShow] = useState(true)
  const [textHigh, setTextHigh] = useState(false);
  const [getsubGroup, setgetsubGroup] = useState();
  const [selectedId, setSelectedId] = useState()

  const router = useRouter();

  const notify = (msg) => toast.success(msg)
  const error = (msg) => toast.danger(msg)

  const { id, name } = router.query


  const data = [
    {
      id: 1,
      title: 'Asset Description',
    },
    {
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


  const getAllsubgroup = async () => {
    try {
      const res = await field.getSubgroupsbyId(access_token, id)
      setgetsubGroup(res?.data?.subgroups)
      // console.log(res?.data?.subgroups, "hihihihihihiihihihihih")
    } catch (e) {
      console.log(e)
    }
  }

  console.log(getsubGroup, "hihihihihihiihihihihih")

  useEffect(() => {
    getAllsubgroup()
  }, [])


  const showData = async (data) => {
    try {
      const res = await field.addSubgroupbyID(access_token, id, data)
      console.log(res, "this is data")
      notify("Added Successfully")
      router.push(`/dashboard/root/field-management`)
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

        {getsubGroup?.map((component) => (
          <>
            <div key={component._id} className=" py-4 mb-2">
               <div className="flex justify-between">
                 <Text1 size='lg' weight='medium'>
                   {component.subgroupName}
                 </Text1>
                 <div>
                   <Button id={component._id} onClick={() => {
                     setSelectedId(component._id);
                     setTextHigh(true)
                   }} className="mb-2 bg-blue-500 hover:bg-blue-600 hover:text-white px-6 py-2 mx-4 rounded transition transform hover:scale-110 ">
                     ADD FIELD
                   </Button>

                 </div>
               </div>
              <div>

                <div className="grid grid-cols-4 gap-4">
                {
                  component?.fields?.map((groupField) => {
                    return(
                        <>
                           <div className="border rounded-md p-3 bg-[#F7F7F7]">
                             {groupField?.name }
                           </div>
                        </>
                    )
                  })
                }
                </div>
              </div>
            </div>

          </>
        ))}


        <AddInputField open={inputHigh} close={() => setInputHigh(false)} showData={showData} setShow={setShow} />
        <AddtextField open={textHigh} close={() => setTextHigh(false)} id={selectedId} />
        <ToastContainer />
      </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {

  let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;
  const auth = await authApi.WhoAmI(appCtx)
  // console.log(auth,'ddd')
  if (!auth) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: auth,
      access_token
    }
  }

}


export default Fieldgroupdescription

