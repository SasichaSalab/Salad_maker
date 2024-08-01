"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import IngredientModal from '@/components/IngredientModal'; // Adjust path as needed

interface Ingredient {
  id: number;
  name: string;
  image: string;
  calories: number;
}

interface IngredientWithAmount extends Ingredient {
  amount: number;
}

type SelectedIngredient = {
  id: number;
  amount: number;
};

interface RecipeIngredient {
  id: number;
  amount: number;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: RecipeIngredient[];
}

interface Params {
  id: number;
}

const Page: React.FC<{ params: Params }> = ({ params }) => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredientsWithAmount, setIngredientsWithAmount] = useState<IngredientWithAmount[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (params.id == null) {
      setError('Recipe ID is missing');
      setLoading(false);
      return;
    }

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes?id=${params.id}`);
        if (response.ok) {
          const data: Recipe = await response.json();
          setRecipe(data);

          if (Array.isArray(data.ingredients)) {
            const ingredientIds = data.ingredients.map((ingredient) => ingredient.id);
            const ingredientResponse = await fetch(`/api/ingredients?ids=${ingredientIds.join(',')}`);
            if (ingredientResponse.ok) {
              const allIngredients: Ingredient[] = await ingredientResponse.json();
              setAllIngredients(allIngredients);
              const filteredIngredients = allIngredients.filter(ingredient =>
                data.ingredients.some(recipeIngredient => recipeIngredient.id === ingredient.id)
              );
              const ingredientsWithAmount = filteredIngredients.map(ingredient => {
                const recipeIngredient = data.ingredients.find(ri => ri.id === ingredient.id);
                return {
                  ...ingredient,
                  amount: recipeIngredient ? recipeIngredient.amount : 1,
                };
              });
              setIngredientsWithAmount(ingredientsWithAmount);
            } else {
              setError('Failed to fetch ingredients');
            }
          } else {
            setError('Invalid ingredients data');
          }
        } else {
          setError('Failed to fetch recipe');
        }
      } catch (error) {
        setError('Error fetching recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.id]);

  const handleDelete = (id: number) => {
    setIngredientsWithAmount(prev => prev.filter(ingredient => ingredient.id !== id));
  };

  const handleAdd = (id: number) => {
    setIngredientsWithAmount(prev => {
      return prev.map(i =>
        i.id === id ? { ...i, amount: i.amount + 1 } : i
      );
    });
  };

  const handleSubtract = (id: number) => {
    setIngredientsWithAmount(prev => {
      return prev.map(i =>
        i.id === id && i.amount > 1 ? { ...i, amount: i.amount - 1 } : i
      );
    });
  };

  const handleUpdate = async () => {
    if (!recipe) return;

    const updatePayload = {
      id: recipe.id,
      ingredients: ingredientsWithAmount.map(i => ({
        id: i.id,
        amount: i.amount
      }))
    };

    try {
      const response = await fetch(`/api/recipes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log('Recipe updated successfully:', updatedData);
        router.push('/recipe');
      } else {
        const errorData = await response.json();
        console.error('Failed to update recipe:', errorData);
        setError('Failed to update recipe: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      setError('Error updating recipe');
    }
  };

  const handleShowModal = () => {
    const ingredientsNotInRecipe = allIngredients.filter(ingredient =>
      !ingredientsWithAmount.some(recipeIngredient => recipeIngredient.id === ingredient.id)
    );
    setShowModal(true);
  };

  const handleModalSave = (selectedIngredients: SelectedIngredient[]) => {
    setIngredientsWithAmount(prev => {
      const newIngredients = selectedIngredients.filter(
        sel => !prev.some(existing => existing.id === sel.id)
      ).map(sel => {
        const ingredient = allIngredients.find(ing => ing.id === sel.id);
        return ingredient ? { ...ingredient, amount: sel.amount } : undefined;
      }).filter((item): item is IngredientWithAmount => item !== undefined); // Ensure only defined items

      return [...prev, ...newIngredients];
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className='relative flex flex-col min-h-screen'>
      <div className='flex flex-col sm:px-4 gap-8 pb-64'>
        <div className='flex flex-wrap justify-start items-center gap-5'>
          <Link href="/recipe">
            <FaChevronLeft />
          </Link>
          <p className='text-3xl font-bold'>Edit Recipe</p>
        </div>
        <div className='flex flex-col p-4 bg-white w-full rounded-xl gap-5'>
          <p className='text-xl font-bold'>Your ingredients to make a salad Recipe</p>
          {ingredientsWithAmount.map((ingredient) => (
            <div key={ingredient.id} className='w-full h-20 flex flex-row items-center justify-between'>
              <div className='flex flex-row items-center gap-4'>
                <Image src={ingredient.image} alt={ingredient.name} width={80} height={80} />
                <div className='flex flex-col'>
                  <h4 className='font-semibold'>{ingredient.name}</h4>
                  <div className='flex items-center gap-1'>
                    <FaMinusCircle onClick={() => handleSubtract(ingredient.id)} />
                    <span>x{ingredient.amount}</span>
                    <FaPlusCircle onClick={() => handleAdd(ingredient.id)} />
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <span className='font-bold'>{ingredient.calories * ingredient.amount} Cal</span>
                <button onClick={() => handleDelete(ingredient.id)} className='text-red-500'>Delete</button>
              </div>
            </div>
          ))}
          <button
            className='flex items-center justify-center w-56 text-lg bg-custom_green rounded-xl p-2 text-white font-bold gap-2'
            onClick={handleShowModal}
          >
            <FaPlusCircle /> Add Ingredient
          </button>
          <div className='w-full h-px bg-tertiary opacity-30 my-5'></div>
      <div className='flex flex-row items-center justify-between w-full text-lg'>
            <h4>Total Calories</h4>
            <div className='flex flex-row items-center justify-center gap-2 font-semibold text-lg'>
              <h4>{ingredientsWithAmount.reduce((total, ingredient) => total + (ingredient.calories * ingredient.amount), 0)}</h4>
              <h4 className='text-secondary font-bold'>Cal</h4>
            </div>
          </div>

          <button
            className='flex flex-row items-center justify-center w-full text-lg bg-secondary rounded-xl p-2 text-white font-bold'
            onClick={handleUpdate}
          >
            Update Recipe
          </button>
        </div>
      </div>
      {showModal && (
        <IngredientModal
          ingredients={allIngredients}
          onClose={() => setShowModal(false)}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default Page;
