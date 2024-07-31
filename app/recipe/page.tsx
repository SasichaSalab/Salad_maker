import React from 'react'
import Recipe from '@/components/Recipe'
import recipesData from '../../public/data/recipes.json'

const page = () => {
  return (
    <div className='relative flex flex-col min-h-screen'>
      <div className='flex flex-col sm:px-4 gap-8 pb-64'>
        {/* Header Section */}
        <div className='flex flex-wrap justify-between items-center gap-5'>
          <p className='text-3xl font-bold'>Recipe</p>
        </div>
        <div className='flex flex-col p-4 bg-white w-full rounded-xl gap-5'>
            <p className='text-xl font-bold'>Your Recipe</p>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {recipesData.map((recipe) => (
                    <Recipe
                        key={recipe.id}
                        recipename={recipe.recipename}
                        cal={recipe.cal}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default page