export enum MinifigPartType {
  HEAD = 'HEAD',
  TORSO = 'TORSO',
  LEGS = 'LEGS',
}

export interface MinifigPart {
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
