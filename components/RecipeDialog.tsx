import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface RecipeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const RecipeDialog: React.FC<RecipeDialogProps> = ({ isOpen, onClose, onCreate }) => {
  const [recipeName, setRecipeName] = useState('');

  if (!isOpen) return null;

  const handleCreateRecipe = () => {
    if (recipeName.trim()) {
      onCreate(recipeName);
      setRecipeName(''); // Clear the input field
      onClose(); // Close the dialog
    } else {
      alert('Please enter a recipe name.');
    }
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50'>
      <div className='bg-white rounded-lg p-4 shadow-lg w-96'>
        <div className='flex flex-col gap-4 items-center justify-center'>
          <div className='w-full flex justify-end items-center'>
            <FaTimes onClick={onClose} className='text-tertiary text-lg cursor-pointer'>
              &times;
            </FaTimes>
          </div>
          <Image
            src="/assets/icons/food.png"
            alt="food_icon"
            width={60}
            height={60}
            className='-mt-6'
          />
          <h3 className='text-xl font-bold'>Recipe Name</h3>
          <div className='w-full px-4'>
            <input
              type='text'
              placeholder='Recipe Name'
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className='border rounded-lg p-2 w-full'
            />
          </div>
          <div className='flex justify-center gap-4 w-full px-4'>
            <button
              onClick={onClose}
              className='rounded-lg px-2 py-2 w-1/2 hover:shadow-xl'
            >
              Cancel
            </button>
            <button
              onClick={handleCreateRecipe}
              className='bg-green-500 rounded-lg px-2 py-2 text-white w-1/2 hover:shadow-xl'
            >
              Create New Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDialog;
