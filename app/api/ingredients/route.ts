import { NextResponse } from 'next/server';
import ingredientsData from '../../../public/data/ingredient.json'; // Adjust the path as necessary

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const searchTerm = url.searchParams.get('search')?.toLowerCase() || '';
  const id = url.searchParams.get('id'); // Parameter for finding by ID
  const caloriesById = url.searchParams.get('caloriesById'); // New parameter for getting calories by ID

  let filteredIngredients = ingredientsData;

  if (caloriesById) {
    // Get calories by ingredient ID
    const ingredient = ingredientsData.find(
      (ingredient) => ingredient.id === parseInt(caloriesById, 10)
    );
    if (ingredient) {
      return NextResponse.json({ id: ingredient.id, calories: ingredient.calories });
    } else {
      return NextResponse.json({ message: 'Ingredient not found' }, { status: 404 });
    }
  }

  if (id) {
    // Find ingredient by ID
    const ingredient = ingredientsData.find(
      (ingredient) => ingredient.id === parseInt(id, 10)
    );
    if (ingredient) {
      return NextResponse.json([ingredient]);
    } else {
      return NextResponse.json([]); // Return empty array if ID not found
    }
  }

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
        ingredient.name.toLowerCase().includes(searchTerm) ||
        ingredient.calories.toString().includes(searchTerm)
    );
  }

  return NextResponse.json(filteredIngredients);
}
