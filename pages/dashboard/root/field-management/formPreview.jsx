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

function FormPreview({ user, allSteps, stepsHead }) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [steps, setSteps] = useState(stepsHead?.stepForms)

    const router = useRouter();

    useEffect(() => {
        showSteps()
    }, [steps])

    const showSteps = () => {
        stepsHead?.stepForms.map((groupname) => {
            setSteps(groupname.stepNo)
        })
    }


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

    const renderFields = (fields) => {
        return fields.map((field) => {
            switch (field.fieldType) {
                case 'Input text':
                    return (
                        <div key={field._id}>
                            <label>{field.name}</label>
                            <input type="text" />
                        </div>
                    );
                case 'Dropdown':
                    return (
                        <div key={field._id}>
                            <label>{field.name}</label>
                            <select>
                                {field.listOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                case 'Radio':
                    return (
                        <div key={field._id}>
                            <label>{field.name}</label>
                            {field.listOptions.map((option, index) => (
                                <div key={index}>
                                    <input type="radio" value={option} name={field.name} />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </div>
                    );
                default:
                    return null; // Handle other field types if needed
            }
        });
    };

    const renderSubgroups = (subgroups) => {
        return subgroups.map((subgroup, subgroupIndex) => {
            return (
                <div key={subgroupIndex}>
                    <h3>{subgroup.subgroupName}</h3>
                    {renderFields(subgroup.fields)}
                </div>
            );
        });
    };

    const renderSteps = (stepsData) => {
        return stepsData.map((group, groupIndex) => {
            return (
                <div key={groupIndex}>
                    <h2>{group.groupName}</h2>
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
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const stepsData = generateStepsData(allSteps);

    return (
        <>
            <MainLayout User={user} isScroll={true}>
                <div className="w-full flex justify-between items-center py-4">
                    <div>
                        <div className="flex items-center cursor-pointer" onClick={() => router.back()}>
                            <LeftArrowIcon />
                            <Text1 size="2xl" >
                                FORM PREVIEW
                            </Text1>
                        </div>
                        <Text1 className="pl-4" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
                    </div>
                </div>

                {renderSteps(stepsData)}

                <StyledEngineProvider injectFirst>
                    <Box sx={{ width: "100%" }}>
                        <Stepper activeStep={activeStep} style={{ padding: '16px 0', borderRadius: '16px' }} >
                            {stepsHead?.stepForms?.map((label, index) => {
                                {
                                    console.log(label.stepNo, "this is step")
                                }
                                const stepProps = {};
                                const labelProps = {};
                                return (

                                    <Step key={label._id} {...stepProps} onClick={() => setActiveStep(label.stepNo)}>
                                        <StepLabel {...labelProps}>{label.stepName}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button onClick={handleNext}>
                                        {activeStep === stepsHead?.stepForms?.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </StyledEngineProvider>
            </MainLayout>
        </>
    );
}

export default FormPreview;





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


    const getAllSteps = await field.stepsForm(access_token)
    const stepsHead = await field.allStepsShow(access_token)


    return {
        props: {
            user: auth,
            access_token,
            allSteps: getAllSteps?.data || [],
            stepsHead: stepsHead?.data || []
        }
    }

}