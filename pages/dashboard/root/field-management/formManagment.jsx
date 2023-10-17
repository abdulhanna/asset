import React, { useState } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { Nodata } from '@/components/atoms/icons'
import { AddStep } from 'pages/testComponents/addInputDiv'
import DialogPage from '@/components/molecules/dialog'
import field from 'helpers/use-api/fieldmanagment'
import { ToastContainer, toast } from 'react-toastify';



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

// Main formMangement Component
const FieldGroup = ({ user, access_token, allgroups }) => {



    const [inputHigh, setInputHigh] = useState(false);
    const [show, setShow] = useState(true)

    const notify = (msg) => toast.success(msg)
    const error = (msg) => toast.danger(msg)

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

    return (
        <>
            <MainLayout User={user}>
                <div className='flex justify-between mb-4 px-2'>

                    <div className='flex items-center cursor-pointer space-x-2' onClick={() => router.back()}>
                        <LeftArrowIcon />
                        <Text1 size="2xl" weight="medium">
                            Form Managment
                        </Text1>
                    </div>
                    <div>
                        <Button onClick={handleAddButtonClick} variant="contained" className="mr-3"> ADD STEPS</Button>

                        <Button className="mb-2 bg-green-500 hover:border-green-500 hover:bg-[#7CC270] hover:text-white px-6 py-2 rounded transition transform  ">
                            FORM PREVIEW
                        </Button>
                    </div>

                </div>

                <div className=' rounded-md flex items-center justify-center inset-y-2/4 inset-x-2/4  mt-[320px] overflow-hidden'>
                    <div className='text-center'>
                        <Nodata className={'flex justify-center'} />
                        <div className='mt-3'>
                            <span className='text-gray-600'> No Added Sub-group</span>
                            {/* <span className='text-blue-600 underline underline-offset-4'>Know how?</span> */}
                        </div>
                    </div>
                </div>

                <AddInputField getAllgroups={allgroups} open={inputHigh} close={() => setInputHigh(false)} showData={showData} setShow={setShow} />
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



    return {
        props: {
            user: auth,
            access_token,
            allgroups: getAllgroups.data || []
        }
    }

}



export default FieldGroup