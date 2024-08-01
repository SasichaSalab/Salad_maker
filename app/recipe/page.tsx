"use client";
import React, { useEffect, useState } from 'react';
import Recipe from '@/components/Recipe';

const Page = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCaloriesById = async (ingredientId: number) => {
      try {
        const response = await fetch(`/api/ingredients?caloriesById=${ingredientId}`);
        if (response.ok) {
          const data = await response.json();
          return data.calories; // Assuming the API returns { calories: number }
        } else {
          console.error(`Failed to fetch calories for ingredient ID ${ingredientId}`);
          return 0;
        }
      } catch (error) {
        console.error('Error fetching ingredient calories:', error);
        return 0;
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (response.ok) {
          const data = await response.json();
          const recipesWithCalories = await Promise.all(
            data.map(async (recipe: any) => {
              const totalCalories = await calculateTotalCalories(recipe.ingredients);
              return { ...recipe, totalCalories };
            })
          );
          setRecipes(recipesWithCalories);
        } else {
          console.error('Failed to fetch recipes');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    const calculateTotalCalories = async (ingredientsList: { id: number; amount: number }[]) => {
      let total = 0;
      for (const ingredient of ingredientsList) {
        const calories = await fetchCaloriesById(ingredient.id);
        total += calories * ingredient.amount;
      }
      return total;
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='relative flex flex-col min-h-screen'>
      <div className='flex flex-col sm:px-4 gap-8 pb-64'>
        <div className='flex flex-wrap justify-between items-center gap-5'>
          <p className='text-3xl font-bold'>Recipe</p>
        </div>
        <div className='flex flex-col p-4 bg-white w-full rounded-xl gap-5'>
          <p className='text-xl font-bold'>Your Recipe</p>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {recipes.map((recipe) => (
              <Recipe
                key={recipe.id}
                recipename={recipe.name}
                cal={recipe.totalCalories}
                id={recipe.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
