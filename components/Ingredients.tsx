import React, { useState } from 'react';
import Image from 'next/image';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

interface IngredientProps {
    imagePath: string;
    name: string;
    value_cal: number;
    count: number;
    onCountChange: (newCount: number) => void;
}

const Ingredient: React.FC<IngredientProps> = ({ imagePath, name, value_cal, count, onCountChange }) => {
    const handleIncrement = () => {
        onCountChange(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) onCountChange(count - 1);
    };

    return (
        <div className='w-full bg-white rounded-xl p-4 flex flex-col justify-between items-center'>
            <div className='w-full h-56 lg:h-32 md:h-32 sm:h-56 xl:h-56 relative'>
                <Image
                    src={imagePath}
                    alt={name}
                    layout='fill'
                    className='object-contain'
                />
            </div>
            <div className='w-full h-24'>
                <h1 className='mt-3 text-md'>{name}</h1>
                <div className='flex flex-row items-center justify-start gap-2 font-bold'>
                    <h4 className='text-lg'>{value_cal}</h4>
                    <h4 className='text-secondary text-lg'>Cal</h4>
                </div>
                <div className='flex flex-row items-center justify-end gap-3 font-bold'>
                    {count > 0 && (
                        <FaMinusCircle
                            size={24}
                            className='text-secondary cursor-pointer'
                            onClick={handleDecrement}
                        />
                    )}
                    <h4 className='text-lg'>{count}</h4>
                    <FaPlusCircle
                        size={24}
                        className='text-secondary cursor-pointer'
                        onClick={handleIncrement}
                    />
                </div>
            </div>
        </div>
    );
};

export default Ingredient;
