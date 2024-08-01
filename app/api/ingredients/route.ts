import { NextResponse } from 'next/server';
import ingredientsData from '../../../public/data/ingredient.json'; // Adjust the path as necessary

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const searchTerm = url.searchParams.get('search')?.toLowerCase() || '';

  let filteredIngredients = ingredientsData;

  if (category) {
    // Filter ingredients by category
    filteredIngredients = filteredIngredients.filter(
      (ingredient) => ingredient.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (searchTerm) {
    // Filter ingredients by search term (name or calories)
    filteredIngredients = filteredIngredients.filter(
      (ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchTerm) ||
        ingredient.calories.toString().includes(searchTerm)
    );
  }

  return NextResponse.json(filteredIngredients);
}