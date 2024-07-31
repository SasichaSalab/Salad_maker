"use client";
import React from 'react';
import Image from 'next/image';

interface CategoryCardProps {
  imagePath: string;
  cardName: string;
  selected: boolean;
  onSelect: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imagePath, cardName, selected, onSelect }) => {
  return (
    <div
      className={`w-32 h-32 bg-white rounded-xl flex flex-col items-center justify-center relative cursor-pointer ${
        selected ? ' shadow-md shadow-tertiary' : ''
      }`}
      onClick={onSelect}
    >
      {selected && (
        <div className="absolute top-2 right-2 rounded-full">
          <Image src="/assets/icons/checked.png" alt="Selected" width={18} height={18} />
        </div>
      )}
      <div className='p-2 flex flex-col items-center justify-center gap-1'>
      <Image
        src={imagePath}
        alt={cardName}
        width={60}
        height={60}
        className='object-contain'
      />
      <span className='mt-2 text-center text-md font-medium text-tertiary'>
        {cardName}
      </span>
    </div></div>
  );
};

export default CategoryCard;
