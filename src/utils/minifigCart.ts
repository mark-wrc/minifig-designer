// This PART_CONFIG is primarily for base images and fallback names.

import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { MINIFIG_CONFIG } from '@/constants/Minifig';
import { MinifigPartType } from '@/types';
import {
  CartSummary,
  IApiMinifigSelectedPart,
  IBaseMinifigPart,
  IMinifigProject,
  MinfigProjectSummary,
} from '@/types/Minifig';

// Data source will now come from the IMinifigProject.selectedItems directly.
const PART_CONFIG = {
  HEAD: {
    key: 'head' as const,
    baseImage: BaseMinifigParts[MinifigPartType.HEAD]?.image,
    fallbackName: 'Head',
  },
  TORSO: {
    key: 'torso' as const,
    baseImage: BaseMinifigParts[MinifigPartType.TORSO]?.image,
    fallbackName: 'Torso',
  },
  LEGS: {
    key: 'legs' as const,
    baseImage: BaseMinifigParts[MinifigPartType.LEGS]?.image,
    fallbackName: 'Legs',
  },
} as const;

// Checks if a part is custom (different from base part)
const isMinifigPart = (partImage: string | undefined, baseImage: string | undefined): boolean => {
  return Boolean(partImage && partImage !== baseImage);
};

/**
 * Transforms an IApiMinifigSelectedPart (from API response) into a MinifigPartData (for application use).
 * This maps the API's field names to the application's domain model field names.
 */
const transformApiPartToMinifigPartData = (apiPart: IApiMinifigSelectedPart): IBaseMinifigPart => {
  return {
    _id: apiPart.id,
    minifig_part_type: apiPart.type,
    product_name: apiPart.name,
    product_description_1: apiPart.description,
    image: apiPart.image,
    price: apiPart.price,
    stock: apiPart.stock,
    product_color: {
      _id: apiPart.color || 'default-color-id',
      name: apiPart.color || 'Unknown Color',
    },
  };
};

// Extracts all added parts from a character, transforming them to MinifigPartData
export const getCustomPartsForMinifigProject = (project: IMinifigProject): IBaseMinifigPart[] => {
  if (!project) return [];
  const minifigParts: IBaseMinifigPart[] = [];

  MINIFIG_CONFIG.PART_TYPES.forEach((partType) => {
    const config = PART_CONFIG[partType];
    const selectedApiPart = project.selectedItems?.[config.key]; // This is IApiMinifigSelectedPart

    if (selectedApiPart && isMinifigPart(selectedApiPart.image, config.baseImage)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const transformedPart = transformApiPartToMinifigPartData(selectedApiPart);
      minifigParts.push(transformedPart);
    }
  });
  return minifigParts;
};

// Creates a summary for a single project
export const createProjectSummary = (project: IMinifigProject): MinfigProjectSummary => {
  const customParts = getCustomPartsForMinifigProject(project);
  // Calculate totalPrice by summing the price of each custom part
  const totalPrice = customParts.reduce((sum, part) => sum + (part.price ?? 0), 0);
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
