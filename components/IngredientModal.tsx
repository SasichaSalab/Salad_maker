import React, { useState } from 'react';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

interface Ingredient {
  id: number;
  name: string;
  image: string;
  calories: number;
}

interface IngredientModalProps {
  ingredients: Ingredient[];
  onClose: () => void;
  onSave: (selectedIngredients: { id: number; amount: number }[]) => void;
}

const IngredientModal: React.FC<IngredientModalProps> = ({ ingredients, onClose, onSave }) => {
  // Initialize selectedIngredients with 0 for each ingredient
  const initialSelectedIngredients = ingredients.reduce((acc, ingredient) => {
    acc[ingredient.id] = 0;
    return acc;
  }, {} as { [key: number]: number });

  const [selectedIngredients, setSelectedIngredients] = useState<{ [key: number]: number }>(initialSelectedIngredients);

  const handleAmountChange = (id: number, delta: number) => {
    setSelectedIngredients(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + delta, 0), // Ensure amount is not less than 0
    }));
  };

  const handleSave = () => {
    const result = Object.entries(selectedIngredients)
      .filter(([_, amount]) => amount > 0) // Include only ingredients with amount > 0
      .map(([id, amount]) => ({ id: Number(id), amount }));
    onSave(result);
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen'>
      <div className='relative bg-white rounded-xl w-11/12 max-w-lg h-96 my-10'>
        <div className='absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-white border-b'>
          <h2 className='text-xl font-bold w-1/2'>Add Ingredients</h2>
          <div className='flex flex-row items-end justify-end w-1/2 gap-2'>
            <button onClick={onClose} className='px-4 py-2 bg-gray-300 rounded'>Close</button>
            <button onClick={handleSave} className='px-4 py-2 bg-green-500 text-white rounded'>Save</button>
          </div>
        </div>
        <div className='pt-16 pb-12 overflow-auto h-full'>
          {ingredients.map(ingredient => (
            <div key={ingredient.id} className='flex items-center justify-between'>
              <div className='flex items-center'>
                <img src={ingredient.image} alt={ingredient.name} className='w-16 h-16 object-cover mr-4' />
                <span>{ingredient.name}</span>
              </div>
              <div className='flex items-center'>
                <FaMinusCircle
                  onClick={() => handleAmountChange(ingredient.id, -1)}
                  className='cursor-pointer'
                />
                <span className='mx-2'>{selectedIngredients[ingredient.id] || 0}</span>
                <FaPlusCircle
                  onClick={() => handleAmountChange(ingredient.id, 1)}
                  className='cursor-pointer'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientModal;
