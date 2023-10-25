import React, { useEffect, useState, Fragment, useRef } from 'react'
import { Text1 } from "@/components/atoms/field";
import Button from '../../../../components/atoms/button';
import DialogPage, { DialogPage1 } from '../../../../components/molecules/dialog';
import AddInputDiv, { AddSubGroupInput } from '../../../testComponents/addInputDiv'
import MainLayout from 'proj-components/MainLayout';
import AddField from 'pages/testComponents/addField';
import { CloseIcon, Nodata, LeftArrowIcon } from '@/components/atoms/icons';
import { useRouter } from 'next/router';
import authApi from "../../../../helpers/use-api/auth";
import { ToastContainer, toast } from 'react-toastify';
import field from 'helpers/use-api/fieldmanagment';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'


// Confirm Delete MOdal
const DeleteConfirm = ({ check, close, access_token, id }) => {
  console.log(check, "Delete Confirm")
  console.log(id, "Delete Confirm")

  const deletSubgroup = async (data) => {
    console.log(data, "showData")
    try {
      const res = await field.deleteGroup(access_token, id)
      console.log(res, "this is data")
      toast.success("Deleted Successfully")
      close()
      // setTimeout(() => {
      //   router.reload()
      // }, 1000)
    } catch (e) {
      console.log(e, "error deleting")
      toast.error(e.message)
    }

  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={check} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete Group
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete Group? All of your defined Sub groups & field will be permanently
                          removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={deletSubgroup}
                  >
                    Delete
                  </button>




                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={close}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

// Add field Modal
const AddInputField = ({ open, close, showData, setShow }) => {

  const getData = ({ data }) => {
    console.log(data, "yes this dta")
  }

  const handleSave = (data) => {
    console.log(data, "this is inputdata")

    showData(data)
    setShow(true)
    close()
  };
  return (
    <>
      <DialogPage open={open} close={close}>
        <AddSubGroupInput Heading="Creat Sub Group" labelName="Sub Group Name" getData={getData} handleSave={handleSave} />
      </DialogPage>
    </>
  );
};

// MOdal Add text field
const AddtextField = ({ open, close, id, access_token }) => {



  return (
    <>
      <DialogPage1 open={open} close={close} width="w-[800px]">
        <div className="w-full text-right  pb-3 pr-8">
          <button onClick={close} >
            <CloseIcon />
          </button>
        </div>
        <AddField close={close} id={id} access_token />
      </DialogPage1>
    </>
  );
};


// Main Component Fieldgroup description
const Fieldgroupdescription = ({ user, access_token }) => {
  const [inputHigh, setInputHigh] = useState(false);
  const [show, setShow] = useState(true)
  const [textHigh, setTextHigh] = useState(false);
  const [getsubGroup, setgetsubGroup] = useState();
  const [selectedId, setSelectedId] = useState()
  const [deleteOPen, setDeleteOpen] = useState(false);


  const router = useRouter();

  console.log(user, "tis is user")
  const notify = (msg) => toast.success(msg)
  const error = (msg) => toast.danger(msg)

  const { id, name } = router.query



  // dummy data
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


  // Get subgroup field by id
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


  // Adding subgroup by id
  const showData = async (data) => {
    console.log(data, "showData")
    try {
      const res = await field.addSubgroupbyID(access_token, id, data)
      console.log(res, "this is data")
      notify("Added Successfully")
      setTimeout(() => {
        router.reload()
      }, 1000)
    } catch (e) {
      console.log(e)
    }

  }


  const handleAddButtonClick = () => {
    setInputHigh(true)
  }

  const editgroup = () => {
    router.push(`/dashboard/root/field-management/editGroup?id=${id}`)
  }

  const Delete = () => {
    setDeleteOpen(!deleteOPen)
    console.log(deleteOPen, "this is a delete")
  }





  return (
    <>
      <MainLayout User={user} isScroll={true}>
        <div className='flex justify-between mb-4 px-2'>

          <div className='flex items-center cursor-pointer space-x-2' onClick={() => router.back()}>
            <LeftArrowIcon />
            <Text1 size="2xl" weight="medium">
              {name}
            </Text1>

          </div>
          <div>
            <Button onClick={handleAddButtonClick} variant="contained" className="mr-2"> CREATE SUB GROUP</Button>

            <Button onClick={editgroup} className="mb-2 mr-2 bg-green-500 hover:border-green-500 hover:bg-[#7CC270] hover:text-white px-6 py-2 rounded transition transform  ">
              EDIT GROUP
            </Button>

            <Button onClick={Delete} variant='danger' className="mb-2 bg-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded transition transform  ">
              DELETE GROUP
            </Button>
          </div>

        </div>

        {
          getsubGroup?.length === 0 ?
            <>
              <div className=' rounded-md flex items-center justify-center inset-y-2/4 inset-x-2/4  mt-[350px] overflow-hidden'>
                <div className='text-center'>
                  <Nodata className={'flex justify-center'} />
                  <div className='mt-3'>
                    <span className='text-gray-600'> No Added Sub-group</span>
                    {/* <span className='text-blue-600 underline underline-offset-4'>Know how?</span> */}
                  </div>
                </div>
              </div>
            </> : null
        }

        {getsubGroup?.map((component) => (
          <>
            <div key={component._id} className=" py-2  px- 4 mb-2">
              <div className="flex justify-between">
                <div className='flex'>
                  <Text1 size='lg' weight='medium'>
                    {component.subgroupName}
                  </Text1>
                  {
                    component?.isMandatory === true && <><div className=' '>
                      <svg className="w-2 h-2 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div></>
                  }
                </div>
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
                      return (
                        <>

                          <div className="border rounded-md p-3 bg-[#F7F7F7]">
                            {groupField?.name}

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
        <AddtextField open={textHigh} close={() => setTextHigh(false)} id={selectedId} access_token />
        <DeleteConfirm
          check={deleteOPen}
          close={() => setDeleteOpen(!deleteOPen)}
          id={id}
          access_token={access_token}
        />
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

