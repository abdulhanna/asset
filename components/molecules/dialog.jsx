import React,{useRef} from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {CloseIcon} from '../atoms/icons'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const DialogPage = ({
    children,
    open,
    label = 'DIALOG',
    close,
    width = 'max-w-3xl',
  }) => {
    return (
        <>
          <Transition appear show={open} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={close}
            >
              <div className="min-h-screen px-4 text-center ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div
                    style={{ background: 'rgba(0, 0, 0, 0.6)' }}
                    className="fixed inset-0 bg-opacity-25"
                    onClick={close}
                  />
                </Transition.Child>
  
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle "
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div
                    className={`inline-block  ${width} p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg`}
                  >
                    <div className="flex flex-row">
                      <div className="flex-1" />
                      {/* <CloseIcon onClick={close} classname="cursor-pointer" /> */}
                      <p  className="cursor-pointer" onClick={close}><CloseIcon/></p>
                    </div>
                    {children}
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </> 
        );
  };

export const DialogPage1 = ({
    children,
    open,
    label = 'DIALOG',
    close,
    width = 'max-w-3xl',
  }) => {
    return (
      <>
        <>
          <Transition appear show={open} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={close}
            >
              <div className="min-h-screen px-4 text-center ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div
                    style={{ background: 'rgba(0, 0, 0, 0.6)' }}
                    className="fixed inset-0 bg-opacity-25"
                    onClick={close}
                  />
                </Transition.Child>
  
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle "
                  aria-hidden="true"
                >
                  &#8203;
                </span>  
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div
                    className={`inline-block  ${width}  p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}
                  >
                    <div className="flex flex-row">
                      <div className="flex-1" />
                      {/* <CloseIcon onClick={close} classname="cursor-pointer" /> */}
                    </div>
                    {children}
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      </>
    );
  };

 export const DeleteConfirm = ({ check, close,callDelete,heading,para }) => {
    // console.log(check, "Delete Confirm")
  
  
    const cancelButtonRef = useRef(null)
    const deleteHandle = ()=>{
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
                          {heading}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                          {para}
                            {/* Are you sure you want to delete Group? All of your defined Sub groups & field will be permanently
                            removed. This action cannot be undone. */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={deleteHandle}
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

  export default DialogPage