import React, { useState, Fragment, useRef } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { Nodata } from '@/components/atoms/icons'
import { AddStep, EditStep } from 'pages/testComponents/addInputDiv'
import DialogPage from '@/components/molecules/dialog'
import field from 'helpers/use-api/fieldmanagment'
import { ToastContainer, toast } from 'react-toastify';
import { FieldActionTable } from '@/components/organism/tablecomp'
import { DateTime } from 'luxon'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'





// MOdal adding steps
const AddInputField = ({ open, getAllgroups, close, showData, setShow }) => {

    const getData = ({ data }) => {

        console.log(data, "yes this dta")
    }

    const handleSave = (data) => {
        console.log(data, "this is data")
        showData(data)

        setShow(true)
        close()
    };
    return (
        <>
            <DialogPage open={open} close={close}>
                <AddStep getAllgroups={getAllgroups} Heading="Create Step" subheading="Add Group" getData={getData} handleSave={handleSave} />
            </DialogPage>
        </>
    );
};



// Editing steps
const EditStepform = ({ open, editStep, getAllgroups, close, setShow, handleSave }) => {

    const getData = ({ data }) => {

        console.log(data, "yes this dta")
    }



    return (
        <>
            <DialogPage open={open} close={close}>
                <EditStep getAllgroups={getAllgroups} Heading="Edit Create Step" subheading="Add Group" getData={getData} handleSave={handleSave} editStep={editStep} />
            </DialogPage>
        </>
    )
}



// Confirm Delete MOdal
const DeleteConfirm = ({ check, close, callDelete }) => {
    console.log(check, "Delete Confirm")

    const [open, setOpen] = useState(check)



    const cancelButtonRef = useRef(null)

    const deleteData = async (data) => {
        console.log(data, "showData")
        callDelete()
        close()


    }

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
                                        onClick={deleteData}
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


// Main formMangement Component
const FieldGroup = ({ user, access_token, allgroups, allSteps }) => {



    const [inputHigh, setInputHigh] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [show, setShow] = useState(true)
    const [steps, setSteps] = useState(allSteps.stepForms);
    const [stepData, setStepData] = useState('')
    const [deleteOPen, setDeleteOpen] = useState(false);
    const [deleteid, setDeleteid] = useState('')
    const [stepId, setStepId] = useState('')

    console.log(steps, "this is a step")

    const Headersteps = [
        { label: "Step no.", name: "stepNo" },
        { label: "Step Name", name: "stepName" },
        { label: "Total No of groups under step", name: "groupsCount" },
        { label: "Created on", name: "createdAt" },
        { label: "Action", name: "action" },

    ];

    const notify = (msg) => toast.success(msg)
    // const error = (msg) => toast.danger(msg)

    const router = useRouter()

    const handleAddButtonClick = () => {
        setInputHigh(true)
    }

    const showData = async (data) => {
        console.log(data, "ths is stepform")
        try {
            const res = await field.addStep(access_token, data)
            console.log(res)
            notify(res.data.message)
            // router.push('/dashboard/root/field-management')
        } catch (e) {
            console.log(e)

        }

    }

    const editStep = async (e) => {
        setStepId(e._id)
        try {
            const res = await field.getStepsbyId(access_token, e._id)
            console.log(res?.data?.formStepDataById, "this is a stepdetaild by id")
            setStepData(res?.data?.formStepDataById)
            notify(res.data.message)
            // router.push('/dashboard/root/field-management')
        } catch (e) {
            console.log(e)

        }

        setEditPopup(true)

    }

    const handleUpdate = async (data) => {
        console.log(data, stepId, "this is update")
        try {
            const res = await field.updateStepbyID(access_token, stepId, data)
            console.log(res, "this is data")
            notify("Updated Successfully")

            setTimeout(() => {
                router.reload()
            }, 1000)
        } catch (e) {
            console.log(e)
        }
        setShow(true)
        close()
    };

    const Delete = async (e) => {
        console.log(e, "delete")
        setDeleteid(e)
        setDeleteOpen(!deleteOPen)

    }

    const callDelete = async () => {

        try {
            const res = await field.deleteSteps(access_token, deleteid)
            console.log(res, "this is data")
            notify("Deleted Successfully")

            setTimeout(() => {
                router.reload()
            }, 1000)
        } catch (e) {
            console.log(e)
        }
    }

    console.log(stepData, "this is edit step")

    return (
        <>
            <MainLayout User={user} isScroll={true}>
                <div className='flex justify-between items-end'>

                    <div className=' cursor-pointer space-x-2' onClick={() => router.back()}>
                        <div className='flex items-center'>
                            <LeftArrowIcon />
                            <Text1 size="2xl" weight="medium">
                                Form Managment
                            </Text1>
                        </div>
                        <div className='ml-6'>
                            <Text1 size="xs" weight="normal">
                                Form Managment
                            </Text1>
                        </div>
                    </div>
                    <div>
                        <Button onClick={handleAddButtonClick} variant="contained" className="mr-3"> ADD STEPS</Button>

                        <Button className="mb-2 bg-green-500 hover:border-green-500 hover:bg-[#7CC270] hover:text-white px-6 py-2 rounded transition transform  ">
                            FORM PREVIEW
                        </Button>
                    </div>

                </div>

                {
                    steps.length == 0 ?
                        <>
                            <div className=' rounded-md flex items-center justify-center inset-y-2/4 inset-x-2/4  mt-[320px] overflow-hidden'>
                                <div className='text-center'>
                                    <Nodata className={'flex justify-center'} />
                                    <div className='mt-3'>
                                        <span className='text-gray-600'> No Added Sub-group</span>

                                    </div>
                                </div>

                            </div>
                        </>
                        :
                        <>

                            <FieldActionTable
                                className="py-0"
                                response={steps.map((row) => {
                                    return (
                                        {
                                            ...row,
                                            createdAt: DateTime.fromISO(row.createdAt).toLocaleString(
                                                DateTime.DATETIME_SHORT
                                            ),
                                        }
                                    )
                                })}
                                headers={Headersteps}
                                // checkedData={checkedNewData}
                                // responseData={(e) => onNewCheck(e)}
                                //  clickAll={clickAll}
                                onClick={(e) => console.log(e, 'clickAll')}
                                //  checkAllStatus={allClick}
                                onDelete={Delete}
                                onEdit={editStep}

                            />

                        </>
                }

                <EditStepform getAllgroups={allgroups} open={editPopup} editStep={stepData} close={() => setEditPopup(false)} setShow={setShow} handleSave={handleUpdate} />
                <AddInputField getAllgroups={allgroups} open={inputHigh} close={() => setInputHigh(false)} showData={showData} setShow={setShow} />
                <DeleteConfirm
                    deleteid={deleteid}
                    access_token={access_token}
                    check={deleteOPen}
                    close={() => setDeleteOpen(!deleteOPen)}
                    callDelete={callDelete}
                />
            </MainLayout>
        </>
    )
}

export const getServerSideProps = async (appCtx) => {
    let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;
    const auth = await authApi.WhoAmI(appCtx)

    if (!auth) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };

    }

    const getAllgroups = await field.getAllGroups(access_token)
    const getAllSteps = await field.getAllSteps(access_token)


    return {
        props: {
            user: auth,
            access_token,
            allgroups: getAllgroups?.data || [],
            allSteps: getAllSteps?.data || []
        }
    }

}



export default FieldGroup