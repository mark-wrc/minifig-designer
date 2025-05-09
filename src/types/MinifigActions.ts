export enum MinifigPartType {
  HATS_AND_HAIR = 'HATS_AND_HAIR',
  HEAD = 'HEAD',
  TORSO = 'TORSO',
  LEGS = 'LEGS',
  ACCESSORIES = 'ACCESSORIES',
}

export interface MinifigPart {
  id: string;
  type: MinifigPartType;
  image: string;
  selected?: boolean;
}

export interface MinifigState {
  selectedParts: {
    [key in MinifigPartType]?: MinifigPart;
  };
  skinTone: string;
  projectTitle: string;
}
