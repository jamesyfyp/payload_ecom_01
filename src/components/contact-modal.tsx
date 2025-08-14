'use client'

import React from 'react'
import { X } from 'lucide-react'

type ModalWithFormProps = {
  buttonText: string
}

export default function ContactModalButton({ buttonText }: ModalWithFormProps) {
  return (
    <>
      <button
        className="btn bg-accent"
        onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()}
      >
        {buttonText}
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box relative">
          <X
            className="absolute top-2 right-2 hover:cursor-pointer"
            onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.close()}
          />
          <h3 className="font-bold text-lg">Contact Us</h3>

          <form method="dialog" className="space-y-4 py-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              pattern="^\d{3}-\d{3}-\d{4}$"
              title="Phone number must be 10 digits with no spaces or symbols"
              className="input input-bordered w-full"
              required
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Tell us about your dream blown to order glass piece"
              required
            ></textarea>
            <div className="modal-action">
              <button className="btn btn-primary w-full" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
