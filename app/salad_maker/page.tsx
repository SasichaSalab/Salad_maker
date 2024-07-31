"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import Ingredients from '@/components/Ingredients';
import RecipeDialog from '@/components/RecipeDialog';
import categories from '../../public/data/categories.json'

interface Category {
  imagePath: string;
  cardName: string;
}

interface Ingredient {
  id: number;
  ingredient: string;
  category: string;
  image: string | null;
  calories: number;
  count?: number; // Add optional count property
}

const Page: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/api/ingredients');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Ingredient[] = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const toggleCategory = (cardName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cardName)
        ? prev.filter((name) => name !== cardName)
        : [...prev, cardName]
    );
  };

  const handleCountChange = (index: number, newCount: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], count: newCount };
    setIngredients(updatedIngredients);
  };

  const handleCreateRecipe = (recipeName: string) => {
    alert(`Recipe "${recipeName}" created successfully!`);
    setShowDialog(false);
  };

  return (
    <div className='relative flex flex-col min-h-screen'>
      {/* Main Content */}
      <div className='flex flex-col sm:px-4 gap-8 pb-64'>
        {/* Header Section */}
        <div className='flex flex-wrap justify-between items-center gap-5'>
          <p className='text-3xl font-bold'>Let's Create...your own salad!!!</p>
          <SearchBar />
        </div>

        {/* Image Section */}
        <div className='relative flex flex-row justify-start items-start bg-fourth lg:h-52 h-64 rounded-xl w-full'>
          <div className='w-1/4 h-full sm:flex items-start flex-col justify-end hidden'>
            <Image
              src="/icons/circle_1.png"
              alt="Circle 1"
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/4 h-full sm:flex flex-col items-start justify-start hidden'>
            <Image
              src="/assets/icons/circle_2.png"
              alt="Circle 2"
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/2 sm:w-1/4 h-full items-end flex flex-col justify-end'>
            <Image
              src="/assets/icons/salad_2.png"
              alt="Salad 1"
              width={350}
              height={350}
            />
          </div>
          <div className='w-1/2 sm:w-1/4 h-full lg:-ml-16 xl:-ml-3'>
            <Image
              src="/assets/icons/salad_1.png"
              alt="Salad 2"
              width={350}
              height={350}
            />
          </div>
          <div className='absolute inset-0 flex flex-col justify-center items-start text-primary text-start p-5 gap-2'>
            <h1 className='text-3xl font-bold'>Fresh &</h1>
            <h1 className='text-3xl font-bold'>Tasty Salads</h1>
            <div>
              <h4 className='text-lg mt-2'>Relax please, we've got you</h4>
              <h4 className='text-lg'>covered every day of the week</h4>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className='flex flex-col justify-center items-start gap-5'>
          <p className='text-2xl font-bold'>Select Category</p>
          <div className='flex flex-wrap items-start sm:justify-start justify-center gap-5'>
            {categories.map((category: Category, index) => (
              <CategoryCard
                key={index}
                imagePath={category.imagePath}
                cardName={category.cardName}
                selected={selectedCategories.includes(category.cardName)}
                onSelect={() => toggleCategory(category.cardName)}
              />
            ))}
          </div>
        </div>
        {/* Choose your ingredients to make a salad */}
        <div className='flex flex-col justify-center items-start gap-5 w-full'>
          <p className='text-2xl font-bold'>Choose your ingredients to make a salad</p>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {ingredients
              .filter((ingredient) =>
                selectedCategories.length > 0
                  ? selectedCategories.includes(ingredient.category)
                  : true
              )
              .map((ingredient, index) => (
                <Ingredients
                  key={ingredient.id}
                  imagePath={ingredient.image || ''}
                  name={ingredient.ingredient}
                  value_cal={ingredient.calories}
                  count={ingredient.count || 0}
                  onCountChange={(newCount) => handleCountChange(index, newCount)}
                />
              ))}
          </div>
        </div>
      </div>
      {/* Fixed Tab */}
      <div className='fixed bottom-0 left-0 lg:pl-60 pl-20 w-full lg:h-20 h-auto py-3 bg-white shadow-[250px_-5px_5px_2px_rgba(0,0,0,0.05)] flex flex-wrap items-center justify-center z-10'>
        <div className='p-1 md:w-5/6 w-full lg:h-full h-14'>
          <div className=' bg-secondary rounded-xl w-full h-full text-center flex flex-row items-center justify-between px-3 text-xl font-bold text-white'>
            <div className='flex flex-row gap-2 items-center justify-center'>
              <div className='w-8 h-8 rounded-lg text-secondary bg-white'>3</div>
              <h4 className=' sm:block hidden'>Your Ingredients</h4>
            </div>
            <h4>76 Cal</h4>
          </div>
        </div>
        <div className='p-1 md:w-1/6 w-full lg:h-full h-14'>
          <div
            onClick={() => setShowDialog(true)}
            className=' bg-green-500 rounded-xl w-full h-full flex flex-row items-center text-center justify-center text-xl font-bold text-white cursor-pointer'
          >
            <h4>Create Recipe</h4>
          </div>
        </div>
      </div>

      {/* Recipe Dialog */}
      <RecipeDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onCreate={handleCreateRecipe}
      />
    </div>
  );
};

export default Page;
