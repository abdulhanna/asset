import React from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
const DialogPage = ({
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
                    className={`inline-block w-full  ${width} p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}
                  >
                    <div className="flex flex-row">
                      <div className="flex-1" />
                      {/* <CloseIcon onClick={close} classname="cursor-pointer" /> */}
                      <p  className="cursor-pointer" onClick={close}>X</p>
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

  export default DialogPage