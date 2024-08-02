"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DeleteDialog from '@/components/DeleteDialog';

interface RecipeProps {
  recipename: string;
  cal: number;
  id: number;
  fetchRecipes: () => void;
}

const Recipe: React.FC<RecipeProps> = ({ recipename, cal, id, fetchRecipes }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async (id: number) => {
    const response = await fetch(`/api/recipes?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Delete successful:', result);
      setAlertMessage('Delete successful!');
      fetchRecipes();
    } else {
      console.error('Delete failed:', await response.json());
      setAlertMessage('Delete failed. Please try again.');
    }

    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  return (
    <>
      <div className='relative w-full h-72 bg-secondary rounded-xl flex flex-col justify-between items-center overflow-hidden'>
        <div className='absolute -bottom-16 ml-5 transform -translate-x-1/2 w-60 h-60 opacity-45 bg-custom_green rounded-full z-10'></div>
        <div className='absolute -top-16 -ml-20 transform -translate-x-1/2 w-56 h-56 bg-orange-500 rounded-full z-0'></div>

        <div className='w-full h-full p-4 flex flex-col items-center justify-between z-10'>
          <div className='w-full h-1/2 p-2 bg-white rounded-xl flex flex-col items-start justify-center font-bold gap-2'>
            <h4 className='text-sm text-tertiary'>{recipename}</h4>
            <div className='flex flex-row items-center gap-2 font-bold'>
              <h4 className='text-2xl'>{cal}</h4>
              <h4 className='text-secondary text-2xl'>Cal</h4>
            </div>
          </div>
          <div className='flex flex-row items-center justify-between w-full gap-2'>
            <div
              className='bg-white rounded-full w-1/2 flex flex-row gap-1 justify-center items-center p-2 font-semibold cursor-pointer'
              onClick={handleDeleteClick}
            >
              <Image
                src="/assets/icons/trash.png"
                alt="trash"
                width={20}
                height={20}
              />
              <h4 className='text-custom_red text-sm'>Delete</h4>
            </div>
            <Link href={`/recipe/edit/${id}`} className='bg-white rounded-full w-1/2 flex flex-row gap-1 justify-center items-center p-2 font-semibold cursor-pointer'>
              <Image
                src="/assets/icons/edit.png"
                alt="edit"
                width={20}
                height={20}
              />
              <h4 className='text-black text-sm'>Edit</h4>
            </Link>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && (
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleDeleteClose}
          onDelete={() => handleDeleteConfirm(id)}
          id={id}
        />
      )}

      {alertMessage && (
        <div className="fixed top-10 right-10 bg-white border-2 border-secondary text-black p-4 rounded-md shadow-lg z-50">
          {alertMessage}
        </div>
      )}
    </>
  );
};

export default Recipe;
