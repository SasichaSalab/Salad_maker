"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import Ingredients from '@/components/Ingredients';
import RecipeDialog from '@/components/RecipeDialog';
import categories from '../../public/data/categories.json';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateCartItem,clearCart } from '../../store/cartSlice'; // Import actions
import { RootState } from '@/store/store';
import { incrementCount, decrementCount,resetCounts } from '@/store/ingredientsSlice';
interface Category {
  imagePath: string;
  cardName: string;
}

interface Ingredient {
  id: number;
  name: string;
  category: string;
  image: string | null;
  calories: number;
  count: number; // Ensure count is required
}

const Page: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch(); // Initialize dispatch
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const query = new URLSearchParams();
        if (selectedCategories.length > 0) {
          query.append('category', selectedCategories.join(','));
        }
        if (searchTerm) {
          query.append('search', searchTerm);
        }

        const response = await fetch(`/api/ingredients?${query.toString()}`);
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
  }, [selectedCategories, searchTerm]);

  const toggleCategory = (cardName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cardName)
        ? prev.filter((name) => name !== cardName)
        : [...prev, cardName]
    );
  };

  const handleAddToCart = (id: number, count: number) => {
    if (count > 0) {
      dispatch(addToCart({ id, count }));
    }
  };

  const handleRemoveFromCart = (id: number, newCount: number) => {
    // Update local state to reflect the new count
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, count: newCount } : ingredient
      )
    );

    // Dispatch an action to update the cart in Redux
    if (newCount <= 0) {
      dispatch(removeFromCart(id)); // Assuming removeFromCart is your action for removal
    } else {
      dispatch(updateCartItem({ id, count: newCount })); // Ensure you have an action for this
    }
  };

  const totalCart = useSelector((state: RootState) => state.cart.total);
  const totalCal = useSelector((state: RootState) => state.cart.totalCal);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const generateUniqueNumericId = () => {
    const timestamp = Date.now(); // Get the current timestamp
    const random = Math.floor(Math.random() * 1000); // Generate a random number
    return timestamp + random; // Combine them to create a unique ID
  };
  
  const handleCreateRecipe = async (recipeName: string) => {
    // Generate a unique numeric ID
    const uniqueId = generateUniqueNumericId();
  
    // Prepare the recipe data
    const recipeData = {
      id: uniqueId,
      name: recipeName,
      ingredients: cartItems.map(item => ({
        id: item.id,
        amount: item.count,
      })),
    };
    console.log(recipeData)
  
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Recipe created successfully:', result);
  
      // Show success message or handle successful creation
      alert(`Recipe "${recipeName}" created successfully!`);
      setShowDialog(false);
      dispatch(clearCart());
    dispatch(resetCounts());
    } catch (error) {
      console.error('Error creating recipe:', error);
      // Show error message or handle failure
      alert('Failed to create recipe. Please try again.');
    }
  };
  const handleIncrement = (id: number) => {
    // Dispatch increment count action
    dispatch(incrementCount(id));

    // Add or update item in cart
    const newCount = (ingredientCounts[id] || 0) + 1;
    if (cartItems[id]) {
      dispatch(updateCartItem({ id, count: newCount }));
    } else {
      dispatch(addToCart({ id, count: newCount }));
    }
  };

  const handleDecrement = (id: number) => {
    // Dispatch decrement count action
    dispatch(decrementCount(id));

    // Remove item from cart if count is 0
    const newCount = (ingredientCounts[id] || 0) - 1;
    if (newCount <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCartItem({ id, count: newCount }));
    }
  };
  const ingredientCounts = useSelector((state: RootState) => state.ingredients.ingredients);
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  return (
    <div className='relative flex flex-col min-h-screen'>
      {/* Main Content */}
      <div className='flex flex-col sm:px-4 gap-8 pb-64'>
        {/* Header Section */}
        <div className='flex flex-wrap justify-between items-center gap-5'>
          <p className='text-3xl font-bold'>Let's Create...your own salad!!!</p>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Image Section */}
        <div className='relative flex flex-row justify-start items-start bg-fourth lg:h-52 h-64 rounded-xl w-full'>
          <div className='h-full w-1/5 md:flex items-start flex-col justify-end hidden'>
            <div className='xl:w-56 xl:h-24 w-32 h-14 sm:flex items-start flex-col justify-end relative'>
              <Image
                src="/assets/icons/circle_1.png"
                alt="Circle 1"
                fill
                sizes='20vh'
              />
            </div>
          </div>
          <div className='h-full w-1/5 md:flex items-start flex-col justify-start hidden'>
            <div className='xl:w-56 xl:h-24 w-32 h-14 sm:flex items-start flex-col justify-start relative'>
              <Image
                src="/assets/icons/circle_2.png"
                alt="Circle 2"
                fill
                sizes='20vh'
              />
            </div>
          </div>
          <div className='absolute flex flex-row h-full right-0 items-center md:w-3/5 w-full'>
            <div className='h-full w-full flex items-end flex-col justify-end xl:-mr-5'>
              <div className='xl:w-80 xl:h-32 lg:w-56 lg:h-24 md:w-48 md:h-20 w-1/2 h-1/3 block md:flex items-start flex-col justify-end md:relative absolute'>
                <Image
                  src="/assets/icons/salad_2.png"
                  alt="Salad 2"
                  fill
                  sizes='20vh'
                />
              </div>
            </div>
            <div className='h-full w-full md:flex block items-start flex-col justify-start'>
              <div className='xl:w-96 xl:h-52 lg:w-64 lg:h-40 md:w-48 md:h-28 w-1/2 h-1/2 block sm:flex items-start flex-col justify-start md:relative absolute'>
                <Image
                  src="/assets/icons/salad_1.png"
                  alt="Salad 1"
                  fill
                  sizes='20vh'
                />
              </div>
            </div>
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
              .filter(ingredient =>
                selectedCategories.length === 0 || selectedCategories.includes(ingredient.category)
              )
              .map(ingredient => (
                <Ingredients
                  key={ingredient.id}
                  imagePath={ingredient.image || '/assets/ingredients/no-image.png'}
                  name={ingredient.name}
                  value_cal={ingredient.calories}
                  id={ingredient.id}
                  count={ingredientCounts[ingredient.id] || 0} // Get count from Redux store
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              ))}
          </div>
        </div>
      </div>
      {/* Fixed Tab */}
      <div className='fixed bottom-0 left-0 lg:pl-60 pl-20 w-full lg:h-20 h-auto py-3 bg-white shadow-[250px_-5px_5px_2px_rgba(0,0,0,0.05)] flex flex-wrap items-center justify-center z-10'>
        <div className='p-1 lg:w-10/12 md:w-8/12 w-full lg:h-full h-14'>
          <div className='bg-secondary rounded-xl w-full h-full flex flex-row justify-between items-center p-2 md:gap-2 font-bold text-white px-8'>
            <div className='flex flex-row items-center justify-center gap-2'>
              <div className='bg-white text-secondary w-7 h-7 flex items-center justify-center text-center rounded-lg'>
              <p className='text-lg font-bold'>{totalCart}</p></div>
              <p className='text-xl font-bold hidden sm:flex'>Your Ingredients</p>
            </div>
            <div className='flex flex-row items-center justify-center gap-1'>
              <p className='text-xl font-bold'>{totalCal}</p>
              <p className='text-xl font-bold'>Cal</p>
            </div>
          </div>
        </div>
        <div className='p-1 lg:w-2/12 md:w-4/12 w-full lg:h-full h-14'>
        <button
            className='bg-emerald-500 text-white w-full h-full px-2 py-2 rounded-lg font-bold text-xl'
            onClick={() => setShowDialog(true)}
          >
            Create Recipe
          </button></div>
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
