import { NextResponse } from 'next/server';
import ingredientsData from '../../../public/data/ingredient.json'; // Adjust the path as necessary

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  if (category) {
    // Filter ingredients by category
    const filteredIngredients = ingredientsData.filter(
      (ingredient) => ingredient.category.toLowerCase() === category.toLowerCase()
    );
    return NextResponse.json(filteredIngredients);
  }

  // Return all ingredients if no category is specified
  return NextResponse.json(ingredientsData);
}
