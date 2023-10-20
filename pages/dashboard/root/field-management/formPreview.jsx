import React, { useEffect, useState } from 'react';
import MainLayout from 'proj-components/MainLayout';
import field from 'helpers/use-api/fieldmanagment';
import { LeftArrowIcon } from '@/components/atoms/icons';
import { Text1 } from '@/components/atoms/field';
import authApi from 'helpers/use-api/auth';
import { useRouter } from 'next/router';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { StyledEngineProvider } from '@mui/material/styles';
import Button from '@/components/atoms/button';
import { InputField, TextField } from '@/components/atoms/field';



// Main Component

function FormPreview({ user, intialStep, stepsHead, access_token }) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [steps, setSteps] = useState(stepsHead?.stepForms)

    const [stepGroupData, setStepGroupData] = useState(intialStep)
    const [count, setCount] = useState(stepGroupData[0]?.assetFormStepId.stepNo)

    const router = useRouter();

    useEffect(() => {
        showSteps()
    }, [steps])

    const showSteps = () => {
        stepsHead?.stepForms.map((groupname) => {
            setSteps(groupname.stepNo)
        })
    }

    const stepData = () => {

    }

    // Generating all data by given steps Value 
    const generateStepsData = (fieldData) => {
        return fieldData.map((group) => {
            return {
                groupName: group.groupName,
                subgroups: group.subgroups.map((subgroup) => {
                    return {
                        subgroupName: subgroup.subgroupName,
                        fields: subgroup.fields,
                    };
                }),
            };
        });
    };

    // REndering of fields 
    const renderFields = (fields) => {
        return (
            <>
                <div className="grid grid-cols-3 gap-5">
                    {
                        fields.map((field) => {
                            console.log(field.fieldInfo, "this is mandatory")
                            switch (field.fieldType) {
                                case 'Input text':
                                    return (
                                        <div key={field._id}>
                                            <label className='text-xs text-gray-500'>
                                                {field.name}
                                                {field.isMandatory && <span className="text-red-500">*</span>}
                                            </label>
                                            <InputField type="text" placeHolder="Input Text " />
                                        </div>
                                    );

                                case 'Input number':
                                    return (
                                        <div key={field._id}>
                                            <label className='text-xs text-gray-500'>{field.name}</label>
                                            <InputField type="number" placeHolder="Input Number " />
                                        </div>
                                    );

                                case 'Dropdown':
                                    return (
                                        <div key={field._id} className="mb-4">
                                            <label className="block text-gray-500 text-xs  '">{field.name}</label>
                                            <select className="block w-full bg-white border border-gray-300 text-gray-500  rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                {field.listOptions.map((option, index) => (
                                                    <option key={index} value={option} >
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    );
                                case 'Radio button':
                                    return (
                                        <div key={field._id} className="mb-4">
                                            <label className="block text-gray-500  text-xs ' ">{field.name}</label>
                                            <div className="flex flex-wra mt-5">
                                                {field.listOptions.map((option, index) => (
                                                    <div className="flex items-center mb-2 mr-4" key={index}>
                                                        <input type="radio" value={option} name={field.name} className="mr-2" />
                                                        <label className="text-sm">{option}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );


                                default:
                                    return null; // Handle other field types if needed
                            }
                        })
                    }
                </div>
            </>
        )

    };

    // REndering for SUbGRouPNAME
    const renderSubgroups = (subgroups) => {
        return subgroups.map((subgroup, subgroupIndex) => {
            return (
                <div key={subgroupIndex}>
                    <div className='flex'>

                        <h3 className='text-sm text-gray-500 font-normal py-3'>{subgroup.subgroupName}</h3>
                    </div>
                    {renderFields(subgroup.fields)}
                </div>
            );
        });
    };

    // RENDRING gROUP NAME 
    const renderSteps = (stepsData) => {
        return stepsData.map((group, groupIndex) => {
            return (
                <div key={groupIndex}>
                    <div className='flex '>
                        <h2 className='text-xl font-normal py-5'>{group.groupName}</h2>
                    </div>
                    {renderSubgroups(group.subgroups)}
                </div>
            );
        });
    };

    const handleNext = () => {
        let newSkipped = skipped;
        // if (isStepSkipped(activeStep)) {
        //     newSkipped = new Set(newSkipped.values());
        //     newSkipped.delete(activeStep);
        // }


        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCount((prevActiveStep) => prevActiveStep + 1)

        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setCount((prevActiveStep) => prevActiveStep - 1)
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const stepsData = generateStepsData(stepGroupData);

    useEffect(() => {
        // console.log(count)
        callStep()
    }, [count])

    const callStep = async () => {
        console.log('call api')
        // setCount(count)
        console.log(count, "ths is count")
        try {
            const res = await field.stepsForm(access_token, count)
            console.log(res.data, "this is count")
            setStepGroupData(res?.data)

            // router.push('/dashboard/root/field-management')
        } catch (e) {
            console.log(e)

        }
    }
    return (
        <>
            <MainLayout User={user} isScroll={true}>
                <div className="w-full flex justify-between items-center py-4">
                    <div>
                        <div className="flex items-center cursor-pointer" onClick={() => router.back()}>
                            <LeftArrowIcon />
                            <Text1 size="2xl" weight='medium'>
                                Form Preview
                            </Text1>
                        </div>
                        <Text1 className="pl-6 text-gray-600 p-2" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
                    </div>
                    <div>
                        {activeStep === steps.length ? (
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    You are Not Added Any Steps Yet!
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        isDisabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                        className={activeStep === 0 ? "cursor-not-allowed" : null}


                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button onClick={handleNext} variant='contained' className='ml-5 px-8' isDisabled={activeStep === stepsHead?.stepForms?.length - 1}>
                                        {activeStep === stepsHead?.stepForms?.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </div>
                </div>


                <StyledEngineProvider injectFirst>
                    <Box sx={{ width: "100%" }}>
                        <Stepper activeStep={activeStep} style={{ padding: '16px 0', borderRadius: '16px' }} >
                            {stepsHead?.stepForms?.map((label, index) => {

                                const stepProps = {};
                                const labelProps = {};
                                return (

                                    <Step key={label._id} {...stepProps} onClick={() => setActiveStep(activeStep)}>
                                        <StepLabel {...labelProps}>{label.stepName}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                    </Box>
                </StyledEngineProvider>
                <div className='w-full border border-white p-6 rounded-lg mt-2 bg-[#F7F7F7] '>

                    {renderSteps(stepsData)}
                </div>

            </MainLayout>
        </>
    );
}

export default FormPreview;





export const getServerSideProps = async (appCtx) => {
    let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;
    const auth = await authApi.WhoAmI(appCtx)

    const step = 1;

    if (!auth) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };

    }


    const getAllSteps = await field.stepsForm(access_token, step)
    const stepsHead = await field.allStepsShow(access_token)


    return {
        props: {
            user: auth,
            access_token,
            intialStep: getAllSteps?.data || [],
            stepsHead: stepsHead?.data || []
        }
    }

}