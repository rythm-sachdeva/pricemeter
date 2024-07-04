"use client";

import { Fragment, useState, FormEvent } from "react";
import { Dialog, DialogBackdrop,DialogPanel,DialogTitle,Button} from "@headlessui/react";
import Image from "next/image";
import { addUserEmailToProduct } from "@/lib/actions";

interface Props {
  productId:string
}


const Modal = ({productId}: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isSubmitting,setIssubmitting] = useState(false);
  const [validEmail,setValidEmail] = useState(false);
  const validateEmail= (e : React.ChangeEvent<HTMLInputElement>)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(e.target.value);
    if(emailRegex.test(e.target.value))
      {
        setValidEmail(true);
       
      }
    else{
      setValidEmail(false);
    }
  }
 const handleSubmit = async ( e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIssubmitting(true);
  await addUserEmailToProduct(productId,email);
   
  setIssubmitting(false)
  setEmail('')
  closeModal();
 }

  const [email,setEmail] = useState("");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
        Track
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 ease-in-out duration-150">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/50 ease-in-out duration-150" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white text-black p-6 backdrop-blur-2xl duration-150 ease-in-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {/* <div className="p-3  rounded-10">
    
              </div> */}
              <DialogTitle as="h3" className="text-base/7 flex flex-col">
              <div className="flex justify-between">
              <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={28}
            height={28}
            
            />
             <Image
            src="/assets/icons/x-close.svg"
            alt="logo"
            width={20}
            height={20}
            onClick={closeModal}
            className="hover:opacity-70 cursor-pointer"
            />
              </div>
            <div className="dialog-head_text px-2 pb-1">
              Stay updated with product pricing alerts right in your inbox!
            </div>
            <p className="px-2 text-sm text-black/50">
               Never miss a bargain again with our timely alerts!
              </p>
                <form className="flex flex-col px-2 mt-5" 
                onSubmit={handleSubmit}
                >
                 <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                 </label>
                 <div className="dialog-input_container">
                  <Image
                   src="/assets/icons/mail.svg"
                   alt='mail'
                   width={18}
                   height={18}
                   />
                   <input 
                   required
                   type="email"
                   id="email"
                   placeholder="Enter your email address"
                   value={email}
                   onChange={validateEmail}
                   />
                 </div>
                 <div className="px-2 text-xs mt-1 ml-3 text-red-500 opacity-80">
                 { email!=="" && !validEmail && "*Enter a valid email"}
                 </div>
                 <button type="submit" className="dialog-btn hover:opacity-90">
                    {isSubmitting ? "Submitting...": 'Track'}
                 </button>
    
                </form>
                
              </DialogTitle>
            </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
