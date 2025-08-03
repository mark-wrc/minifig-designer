import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { MinifigPartType } from '@/types';

import minifigDummyData from '@/api/dummyData.json';
import { CartSummary, CustomPart, IMinifigProject, MinfigProjectSummary } from '@/types/Minifig';
import { MINIFIG_CONFIG, MinifigPartTypeKey } from '@/constants/Minifig';

const PART_CONFIG = {
  HEAD: {
    key: 'head' as const,
    baseImage: BaseMinifigParts[MinifigPartType.HEAD]?.image,
    dataSource: minifigDummyData.HEAD,
    fallbackName: 'Head',
  },
  TORSO: {
    key: 'torso' as const,
    baseImage: BaseMinifigParts[MinifigPartType.TORSO]?.image,
    dataSource: minifigDummyData.TORSO,
    fallbackName: 'Torso',
  },
  LEGS: {
    key: 'legs' as const,
    baseImage: BaseMinifigParts[MinifigPartType.LEGS]?.image,
    dataSource: minifigDummyData.LEGS,
    fallbackName: 'Legs',
  },
} as const;

//  Checks if a part is custom (different from base part)

const isMinifigPart = (partImage: string | undefined, baseImage: string | undefined): boolean => {
  return Boolean(partImage && partImage !== baseImage);
};

// Creates a custom part object from character data

const createMinifigPart = (
  partType: MinifigPartTypeKey,
  character: IMinifigProject,
  partImage: string,
): CustomPart | null => {
  const config = PART_CONFIG[partType];
  if (!config) return null;

  const partData = config.dataSource.find((item) => item.image === partImage);
  const selectedItemName = character.selectedItems?.[config.key]?.name;

  return {
    type: partType,
    image: partImage,
    name: selectedItemName || config.fallbackName,
    stock: partData?.stock ?? 1,
    price: MINIFIG_CONFIG.PRICE_PER_ITEM,
  };
};

// Extracts all added parts from a character

export const getCustomPartsForMinifigProject = (project: IMinifigProject): CustomPart[] => {
  if (!project) return [];

  const minifigParts: CustomPart[] = [];

  MINIFIG_CONFIG.PART_TYPES.forEach((partType) => {
    const config = PART_CONFIG[partType];
    const partImage = project.selectedItems?.[config.key]?.image;

    if (isMinifigPart(partImage, config.baseImage)) {
      const minifigPart = createMinifigPart(partType, project, partImage!);
      if (minifigPart) {
        minifigParts.push(minifigPart);
      }
    }
  });

  return minifigParts;
};

// Creates a summary for a single project

export const createProjectSummary = (project: IMinifigProject): MinfigProjectSummary => {
  const customParts = getCustomPartsForMinifigProject(project);
  const totalPrice = customParts.length * MINIFIG_CONFIG.PRICE_PER_ITEM;

  return {
    project,
    minifigPart: customParts,
    totalPrice,
    hasCustomParts: customParts.length > 0,
  };
};

// Creates a complete cart summary from minifig array

export const createCartSummary = (minifig: IMinifigProject[] | null | undefined): CartSummary => {
  if (!minifig?.length) {
    return {
      validProjects: 0,
      totalItems: 0,
      totalPrice: 0,
      projectSummaries: [],
    };
  }

  const projectSummaries = minifig
    .filter(Boolean)
    .map(createProjectSummary)
    .filter((summary) => summary.hasCustomParts);

  const totalItems = projectSummaries.reduce(
    (sum, summary) => sum + summary.minifigPart.length,
    0,
  );
  const totalPrice = projectSummaries.reduce((sum, summary) => sum + summary.totalPrice, 0);

  return {
    validProjects: projectSummaries.length,
    totalItems,
    totalPrice,
    projectSummaries,
  };
};
