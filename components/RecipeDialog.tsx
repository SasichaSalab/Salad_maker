import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface RecipeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const RecipeDialog: React.FC<RecipeDialogProps> = ({ isOpen, onClose, onCreate }) => {
  const [recipeName, setRecipeName] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000); // Hide alert after 3 seconds

      return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }
  }, [alertMessage]);

  if (!isOpen) return null;

  const handleCreateRecipe = () => {
    if (recipeName.trim()) {
      onCreate(recipeName);
      setRecipeName(''); // Clear the input field
      onClose(); // Close the dialog
    } else {
      setAlertMessage('Please enter a recipe name.');
    }
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50'>
      <div className='bg-white rounded-lg p-4 shadow-lg w-96 relative'>
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
        {alertMessage && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white border-2 border-secondary text-black p-2 rounded-md shadow-lg w-96 h-28 text-center flex flex-row items-center justify-center">
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDialog;
