import { MinifigPartType } from './MinifigActions';

export enum IFigureCategories {
  HatsAndHair = 'Hats and Hair',
  Head = 'Head',
  Bodies = 'Bodies',
  Legs = 'Legs',
  Display = 'Display',
  Extras = 'Extras',
}

export interface ICategoryItem {
  id: number;
  title: IFigureCategories;
  image: string;
  type?: MinifigPartType;
}
