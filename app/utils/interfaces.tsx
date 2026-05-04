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

export interface IFullRecipe {
  id: number;
  image: string;
  imageType: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number | null;
  cookingMinutes: number | null;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: IExtendedIngredient[];
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: IAnalyzedInstruction[];
  language: string;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
}

interface IMeasureUnit {
  amount: number;
  unitShort: string;
  unitLong: string;
}

interface IExtendedIngredient {
  id: number;
  aisle: string | null;
  image: string | null;
  consistency: "SOLID" | "LIQUID";
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: IMeasureUnit;
    metric: IMeasureUnit;
  };
}

interface IInstructionIngredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

interface IInstructionEquipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

interface IInstructionLength {
  number: number;
  unit: string;
}

interface IInstructionStep {
  number: number;
  step: string;
  ingredients: IInstructionIngredient[];
  equipment: IInstructionEquipment[];
  length?: IInstructionLength;
}

interface IAnalyzedInstruction {
  name: string;
  steps: IInstructionStep[];
}