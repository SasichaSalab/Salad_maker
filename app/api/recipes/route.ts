import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const recipesFilePath = path.join(process.cwd(), 'public/data/recipe.json');

const readRecipesFromFile = async (): Promise<any[]> => {
  const data = await fs.readFile(recipesFilePath, 'utf8');
  return JSON.parse(data);
};

const writeRecipesToFile = async (recipes: any[]): Promise<void> => {
  await fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2), 'utf8');
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      // If no ID is provided, return all recipes
      const recipes = await readRecipesFromFile();
      return NextResponse.json(recipes);
    }

    const recipes = await readRecipesFromFile();
    const recipeId = parseInt(id, 10);

    if (isNaN(recipeId)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const recipe = recipes.find(recipe => recipe.id === recipeId);

    if (recipe) {
      return NextResponse.json(recipe);
    } else {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const { id, name, ingredients } = await request.json();
    if (!id || !name || !ingredients) {
      return NextResponse.json({ message: 'ID, name, and ingredients are required' }, { status: 400 });
    }

    const recipes = await readRecipesFromFile();

    const existingRecipe = recipes.find(recipe => recipe.id === id);
    if (existingRecipe) {
      return NextResponse.json({ message: 'Recipe already exists' }, { status: 400 });
    }

    const newRecipe = { id, name, ingredients };
    recipes.push(newRecipe);
    await writeRecipesToFile(recipes);

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    // Read and parse the JSON data
    const recipes = await readRecipesFromFile();
    const recipeId = Number(id);

    // Filter out the recipe with the given ID
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);

    // Write the updated data back to the file
    await writeRecipesToFile(updatedRecipes);

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // Parse the request body
    const { id, ingredients } = await request.json();

    // Check if the required fields are provided
    if (!id || !Array.isArray(ingredients)) {
      return NextResponse.json({ message: 'ID and ingredients are required' }, { status: 400 });
    }

    // Read the current recipes from the file
    const recipes = await readRecipesFromFile();
    const recipeIndex = recipes.findIndex(recipe => recipe.id === id);

    // Check if the recipe exists
    if (recipeIndex === -1) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    // Update the recipe's ingredients
    recipes[recipeIndex].ingredients = ingredients;

    // Write the updated recipes back to the file
    await writeRecipesToFile(recipes);
    return NextResponse.json(recipes[recipeIndex], { status: 200 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}



export async function PATCH(request: Request) {
  try {
    const { id, ingredientId } = await request.json();
    if (!id || !ingredientId) {
      return NextResponse.json({ message: 'ID and ingredient ID are required' }, { status: 400 });
    }

    const recipes = await readRecipesFromFile();

    const recipe = recipes.find(recipe => recipe.id === id);
    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    const updatedIngredients = recipe.ingredients.filter((ingredient: any) => ingredient.id !== ingredientId);
    if (updatedIngredients.length === recipe.ingredients.length) {
      return NextResponse.json({ message: 'Ingredient not found in recipe' }, { status: 404 });
    }

    recipe.ingredients = updatedIngredients;
    await writeRecipesToFile(recipes);
    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
