import { SUB_COLLECTION_TO_PART_TYPE } from '@/constants/MinifigMapping';
import { MinifigPartType } from '@/types';
import type {
  IMinifigProject,
  IApiMinifigSelectedPart,
  IBaseMinifigPart,
  MinfigProjectSummary,
  MinifigPartData,
  CartSummary,
  IMinifigProductBaseDetails,
} from '@/types/Minifig';

const ORDERED_KEYS = ['hair', 'head', 'torso', 'legs'] as const;
type SelectedKey = (typeof ORDERED_KEYS)[number];

const derivePartType = (
  subCollections?: IMinifigProductBaseDetails[],
): { key: MinifigPartType; label: string } => {
  if (!subCollections?.length) {
    return { key: 'unknown' as MinifigPartType, label: 'Unknown' };
  }

  const first = subCollections[0];
  const key = (SUB_COLLECTION_TO_PART_TYPE[first.name] ?? 'accessory') as MinifigPartType;

  return { key, label: first.name };
};

export const normalizeToApiSelectedPart = (
  part?: IApiMinifigSelectedPart | MinifigPartData | null,
): IApiMinifigSelectedPart | null => {
  if (!part) return null;

  if ('type' in part && 'id' in part) return part as IApiMinifigSelectedPart;

  if ('minifig_part_type' in part) {
    const p = part as MinifigPartData;
    const { key, label } = derivePartType(p.product_sub_collections);

    return {
      id: p._id,
      type: key,
      displayType: label,
      name: p.product_name,
      description: p.product_description_1,
      price: p.price,
      stock: p.stock,
      color: p.product_color?.name ?? 'Unknown Color',
      product_images: p.product_images,
    };
  }

  return null;
};

export const isCustomByImage = (
  part: IApiMinifigSelectedPart,
  baseImages?: Partial<Record<SelectedKey, string>>,
): boolean => {
  if (!baseImages || !part.type) return true;
  const key = part.type.toLowerCase() as SelectedKey;
  return !baseImages[key];
};

export const toBaseMinifigPart = (
  apiPart: IApiMinifigSelectedPart,
  slotIndex?: number,
): IBaseMinifigPart => {
  const basePart: IBaseMinifigPart = {
    _id: apiPart.id,
    minifig_part_type: apiPart.type ?? 'unknown',
    product_name: apiPart.name,
    product_description_1: apiPart.description,
    price: apiPart.price,
    stock: apiPart.stock,
    product_color: {
      _id: apiPart.color || 'default-color-id',
      name: apiPart.color || 'Unknown Color',
    },
    product_images: apiPart.product_images || [],
  };

  if (slotIndex !== undefined && apiPart.type?.toLowerCase() === 'accessory') {
    basePart.product_name += ` (Slot ${slotIndex + 1})`;
  }

  return basePart;
};

export const getCustomPartsForMinifigProject = (
  project?: IMinifigProject | null,
  baseImages?: Partial<Record<SelectedKey, string>>,
): IBaseMinifigPart[] => {
  if (!project?.selectedItems) return [];

  const regularParts = ORDERED_KEYS.flatMap((key) => {
    const apiPart = normalizeToApiSelectedPart(project.selectedItems[key]);
    return apiPart && isCustomByImage(apiPart, baseImages) ? [toBaseMinifigPart(apiPart)] : [];
  });

  const accessories =
    project.selectedItems.accessory?.flatMap((slot, idx) => {
      const apiPart = normalizeToApiSelectedPart(slot);
      return apiPart ? [toBaseMinifigPart(apiPart, idx)] : [];
    }) ?? [];

  return [...regularParts, ...accessories];
};

export const createProjectSummary = (
  project: IMinifigProject,
  baseImages?: Partial<Record<SelectedKey, string>>,
): MinfigProjectSummary => {
  const minifigPart = getCustomPartsForMinifigProject(project, baseImages);
  const totalPrice = minifigPart.reduce((sum, p) => sum + (p.price ?? 0), 0);

  return {
    project,
    minifigPart,
    totalPrice,
    hasCustomParts: minifigPart.length > 0,
  };
};

export const createCartSummary = (
  minifig?: IMinifigProject[] | null,
  baseImages?: Partial<Record<SelectedKey, string>>,
): CartSummary => {
  const projectSummaries =
    minifig
      ?.filter(Boolean)
      .map((p) => createProjectSummary(p, baseImages))
      .filter((s) => s.hasCustomParts) ?? [];

  return {
    validProjects: projectSummaries.length,
    totalItems: projectSummaries.reduce((sum, s) => sum + s.minifigPart.length, 0),
    totalPrice: projectSummaries.reduce((sum, s) => sum + s.totalPrice, 0),
    projectSummaries,
  };
};
