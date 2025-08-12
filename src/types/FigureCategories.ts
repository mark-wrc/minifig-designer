import { MinifigPartType } from './MinifigActions';

export enum IFigureCategories {
  HatsAndHair = 'Hats and Hair',
  Head = 'Head',
  Torso = 'Torso',
  Legs = 'Legs',
  Display = 'Display',
  Extras = 'Extras',
}

export interface ICategoryItem {
  id: number;
  title: MinifigPartType;
  image: string;
  type?: MinifigPartType;
}
