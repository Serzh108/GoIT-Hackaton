'use client';
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

type Props = { children?: React.ReactNode; show: boolean; onClose: () => void };

function Modal({ children, show, onClose }: Props) {
  return (
    <Transition.Root as={Fragment} show={show}>
      <Dialog
        // onClose={function (value: boolean): void {
        //   throw new Error('Function not implemented.');
        // }}
        onClose={onClose}
        as="div"
        className=" flex justify-center items-center fixed inset-0 z-50 "
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/60 " />
        </Transition.Child>
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all p-4 w-125 h-65">
          {children}
        </Dialog.Panel>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
