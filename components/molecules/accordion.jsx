import { Disclosure } from '@headlessui/react'
// import { DropDownIcon } from '../atoms/icons'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react'
import { ToggleButton,ToggleOnButton } from '../atoms/icons';
import { Text1 } from '../atoms/field';


const Accordion =()=> {
  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full  rounded-2xl bg-white p-2">
       
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Do you offer technical support?</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
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

export const Accordin = (props) => {
    const [isActive, setIsActive] = useState(false)
    const toggle = () => {
        setIsActive(!isActive)
    }

    const handleToggle = (e)=>{
        props.handleClick(e)
    }
    return (
        <motion.div className="w-full my-2">
            <AnimatePresence>
                <motion.div
                    key="question"
                    className="  rounded-t-md shadow-sm px-2 py-3 bg-transparent cursor-pointer font-open border w-full"
                    
                >
                  
                    <motion.div className="flex justify-between  items-center space-x-2 w-full  font-bold ml-1">
                        
                        <p> {props.label} </p>
                <div className='flex gap-4'>
                        <div className='flex space-x-4'>
                                <div className='flex items-center'>
                                    <Text1>All Access</Text1>
                                    <div >{props.data.allAccess ? <ToggleOnButton onClick={()=>{
                                        // alert(!props.data.allAccess)
                                        handleToggle({allAccess:(!props.data.allAccess),id:props.id})
                                    }}/> : <ToggleButton onClick={()=>{
                                        // alert(!props.data.allAccess)/
                                        handleToggle({allAccess:(!props.data.allAccess),id:props.id})
                                    }}/>}</div>
                                </div>
                                <div className='flex items-center'>
                                    <Text1>Remove Access</Text1>
                                    <div> {props.data.removeAccess ? <ToggleOnButton  onClick={()=>{
                                          handleToggle({removeAccess:(!props.data.removeAccess),id:props.id})
                                    }}/> : <ToggleButton  onClick={()=>{
                                        handleToggle({removeAccess:(!props.data.removeAccess),id:props.id})
                                    }}/>} </div>
                                </div>
                        </div>
                        <ChevronUpIcon
                  className={`${
                    isActive ? 'rotate-180 transform' : ''
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
                            className=" px-2 py-4  text-sm text-gray-700 border rounded-b-md border-gray-300"
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



