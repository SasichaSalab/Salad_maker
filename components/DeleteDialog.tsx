import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  id:number;
  onDelete: (id: number) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, onClose, onDelete,id }) => {

  if (!isOpen) return null;

  const handleDeleteRecipe = () => {
      onDelete(id);
      onClose(); // Close the dialog
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-40'>
      <div className='bg-white rounded-lg p-4 shadow-lg w-96'>
        <div className='flex flex-col gap-4 items-center justify-center'>
          <div className='w-full flex justify-end items-center'>
            <FaTimes onClick={onClose} className='text-tertiary text-lg cursor-pointer'>
              &times;
            </FaTimes>
          </div>
          <Image
            src="/assets/icons/danger.png"
            alt="danger"
            width={60}
            height={60}
            className='-mt-6'
          />
          <h3 className='text-xl font-bold'>Delete Recipe</h3>
          <div className='flex justify-center gap-4 w-full px-4'>
            <button
              onClick={onClose}
              className='rounded-lg px-2 py-2 w-1/2 hover:shadow-xl'
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteRecipe}
              className='bg-custom_red rounded-lg px-2 py-2 text-white w-1/2 hover:shadow-xl'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
