export interface IIngredient {
  name: string;
  id: number;
  image: string;
  possibleUnits: string[];
}

export interface ISlimRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface IRecipeSearchResponse {
  results: ISlimRecipe[];
  number: number;
  totalResults: number;
  offset: number;
}
