import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ingredients from '../../../public/data/recipesData.json';
import {  FaChevronLeft } from 'react-icons/fa';

const Page = () => {
  return (
    <div className='relative flex flex-col min-h-screen'>
      <div className='flex flex-col sm:px-4 gap-8 pb-64'>
        {/* Header Section */}
        <div className='flex flex-wrap justify-start items-center gap-5'>
          <Link href="/recipe">
            <FaChevronLeft/>
          </Link>
          <p className='text-3xl font-bold'>Edit Recipe</p>
        </div>
        <div className='flex flex-col p-4 bg-white w-full rounded-xl gap-5'>
          <p className='text-xl font-bold'>Your ingredients to make a salad Recipe</p>
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} className='w-full h-20 flex flex-row items-center justify-between'>
              <div className='h-20 w-20 bg-white mr-5 flex items-center'>
                <Image src={ingredient.image} alt={ingredient.name} width={80} height={80} />
              </div>
              <div className='w-full flex flex-wrap items-center justify-between'>
                <div className='flex flex-col items-start justify-start text-lg'>
                  <h4 className='font-semibold'>{ingredient.name}</h4>
                  <div className='flex flex-row items-start justify-start gap-4 text-sm'>
                    <h4 className='text-tertiary'>x{ingredient.count}</h4>
                    <h4 className='underline text-custom_red'>Delete</h4>
                  </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-2 font-bold text-lg'>
                  <h4>+{ingredient.cal_value}</h4>
                  <h4 className='text-secondary'>Cal</h4>
                </div>
              </div>
            </div>
          ))}
          <div className='w-full h-px bg-tertiary opacity-30 my-5'></div>
          <div className='flex flex-row items-center justify-between w-full text-lg'>
            <h4>Total Calories</h4>
            <div className='flex flex-row items-center justify-center gap-2 font-semibold text-lg'>
              <h4>188</h4>
              <h4 className='text-secondary font-bold'>Cal</h4>
            </div>
          </div>
          <div className='flex flex-row items-center justify-center w-full text-sm bg-secondary rounded-xl p-2 text-white font-bold'>
            Update Recipe
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
