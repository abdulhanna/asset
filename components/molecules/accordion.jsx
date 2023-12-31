import { Disclosure } from '@headlessui/react'
// import { DropDownIcon } from '../atoms/icons'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react'
import { ToggleButton, ToggleOnButton, ToggleRemoveOnButton } from '../atoms/icons';
import { Text1 } from '../atoms/field';
import Button from '../atoms/button';


const Accordion = () => {
    return (
        <div className="w-full px-4 pt-16">
            <div className="mx-auto w-full  rounded-2xl bg-white p-2">

                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>Do you offer technical support?</span>
                                <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-purple-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                No.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    )
}


export const AccordionField = (props) => {
    const [isActive, setIsActive] = useState(false)
    console.log(props.data._id, "this is props_data")
    console.log(props.id, "this is prop")
    const toggle = () => {
        if (props.data._id === props.id) {

        }
        setIsActive(!isActive)
    }

    const handleToggle = (e) => {
        props.handleClick(e)
    }
    return (
        <motion.div className="w-full my-2">
            <AnimatePresence>
                <motion.div
                    key="question"
                    className={`rounded-t-md  shadow-sm px-2 py-2 bg-transparent cursor-pointer font-body border border-slate-300 w-full ${isActive ? 'border-b-0' : 'rounded-b-lg'}`}

                >
                    <motion.div className="flex justify-between capitalize items-center space-x-2 w-full ml-1">

                        {/* <p> {props.label} </p> */}
                        <Text1 size='lg'>{props.label}</Text1>
                        <div className='flex gap-4 items-center'>
                            <div className='flex gap-4'>
                                <div className='flex items-center gap-1 mt-2'>

                                    <Button onClick={props.handleClick} href={`/dashboard/root/field-management/fieldgroupdescription?id=${props?.id}`} className="mb-2 bg-blue-500 hover:bg-blue-600 hover:text-white px-6 py-2 mx-4 rounded transition transform hover:scale-110 ">
                                        Manage Group
                                    </Button>
                                </div>
                            </div>
                            <ChevronUpIcon
                                className={`${isActive ? '' : 'rotate-180 transform'
                                    } h-5 w-5 text-slate-300`}
                                onClick={toggle}
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {
                    isActive && (
                        <motion.div
                            key="answer"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.5,
                                },
                            }}
                            exit={{ opacity: 0 }}
                            className=" px-2 py-4 bg-[#F7F7F7] text-sm text-gray-700 border border-slate-300 rounded-b-md "
                        >
                            {props.children}
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.div>

    );
}



export const Accordin = (props) => {
    const [isActive, setIsActive] = useState(false)
    const toggle = () => {
        setIsActive(!isActive)
    }

    const handleToggle = (e) => {
        props.handleClick(e)
    }
    return (
        <motion.div className="w-full my-4">
            <AnimatePresence>
                <motion.div
                    key="question"
                    className={`rounded-t-md shadow-sm px-2 py-3 bg-transparent cursor-pointer font-body border border-slate-300 w-full ${isActive ? 'border-b-0' : 'rounded-b-lg'}`}

                >
                    <motion.div className="flex justify-between capitalize items-center space-x-2 w-full ml-1">

                        {/* <p> {props.label} </p> */}
                        <Text1 size='lg'>{props.label}</Text1>
                        <div className='flex gap-4'>
                            <div className='flex gap-4'>
                                <div className='flex items-center gap-1'>
                                    <Text1>All Access</Text1>
                                    <div >{props.data.allAccess ? <ToggleOnButton onClick={() => {
                                        // alert(!props.data.allAccess)
                                        handleToggle({ allAccess: (!props.data.allAccess), id: props.id })
                                    }} /> : <ToggleButton onClick={() => {
                                        // alert(!props.data.allAccess)/
                                        handleToggle({ allAccess: (!props.data.allAccess), id: props.id })
                                    }} />}</div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Text1>Remove Access</Text1>
                                    <div> {props.data.removeAccess ? <ToggleRemoveOnButton onClick={() => {
                                        handleToggle({ removeAccess: (!props.data.removeAccess), id: props.id })
                                    }} /> : <ToggleButton onClick={() => {
                                        handleToggle({ removeAccess: (!props.data.removeAccess), id: props.id })
                                    }} />} </div>
                                </div>
                            </div>
                            <ChevronUpIcon
                                className={`${isActive ? '' : 'rotate-180 transform'
                                    } h-5 w-5 text-slate-300`}
                                onClick={toggle}
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {
                    isActive && (
                        <motion.div
                            key="answer"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.5,
                                },
                            }}
                            exit={{ opacity: 0 }}
                            className=" px-2 py-4  text-sm text-gray-700 border border-slate-300 rounded-b-md "
                        >
                            {props.children}
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.div>

    );
}

export const AccordinRead = (props) => {
    const [isActive, setIsActive] = useState(false)
    const toggle = () => {
        setIsActive(!isActive)
    }


    return (
        <motion.div className="w-full my-4">
            <AnimatePresence>
                <motion.div
                    key="question"
                    className="  rounded-t-md shadow-sm px-2 py-3 bg-transparent cursor-pointer font-body border border-black w-full  "
                >

                    <motion.div className="flex justify-between capitalize items-center space-x-2 w-full ml-1">

                        {/* <p> {props.label} </p> */}
                        <Text1 size='lg'>{props.label}</Text1>
                        <div className='flex gap-4'>
                            <div className='flex gap-4'>
                                <div className='flex items-center gap-1'>
                                    <Text1>All Access</Text1>
                                    <div >{props.data.allAccess ? <ToggleOnButton /> : <ToggleButton />}</div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Text1>Remove Access</Text1>
                                    <div> {props.data.removeAccess ? <ToggleRemoveOnButton /> : <ToggleButton />} </div>
                                </div>
                            </div>
                            <ChevronUpIcon
                                className={`${isActive ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-slate-300`}
                            // onClick={toggle}
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {
                    isActive && (
                        <motion.div
                            key="answer"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.5,
                                },
                            }}
                            exit={{ opacity: 0 }}
                            className=" px-2 py-4  text-sm text-gray-700 border border-black rounded-b-md "
                        >
                            {props.children}
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.div>

    );
}

export default Accordion



