export interface IIngredient {
  name: string;
  id: number;
  image: string;
  possibleUnits: string[];
}

export interface IRecipeIngredient {
  aisle: string;
  amount: number;
  id: number;
  image: string;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
  unitLong: string;
  unitShort: string;
}

export interface IRecipe {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: IRecipeIngredient[];
  title: string;
  unusedIngredients: IRecipeIngredient[];
  usedIngredientCount: number;
  usedIngredients: IRecipeIngredient[];
}
