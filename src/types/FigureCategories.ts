import { MinifigPartType } from './MinifigActions';

export interface ICategoryItem {
  id: number;
  title: MinifigPartType;
  image: string;
  type?: MinifigPartType;
}
