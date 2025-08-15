import type {
  IMinifigProject,
  IApiMinifigSelectedPart,
  IBaseMinifigPart,
  MinfigProjectSummary,
  MinifigPartData,
  CartSummary,
} from '@/types/Minifig';

function normalizeToApiSelectedPart(
  part: IApiMinifigSelectedPart | MinifigPartData | undefined,
): IApiMinifigSelectedPart | null {
  if (!part) return null;

  if ('type' in part && 'id' in part) {
    // IApiMinifigSelectedPart
    return part as IApiMinifigSelectedPart;
  }

  if ('minifig_part_type' in part) {
    const p = part as MinifigPartData;
    return {
      id: p._id,
      type: p.minifig_part_type,
      name: p.product_name,
      description: p.product_description_1,
      price: p.price,
      stock: p.stock,
      color: p.product_color?.name ?? 'Unknown Color',
      product_images: p.product_images,
    };
  }

  return null;
}

const ORDERED_KEYS = ['hair', 'head', 'torso', 'legs'] as const;
type SelectedKey = (typeof ORDERED_KEYS)[number];

/**
 * Returns true if the selected part is considered "custom"
 * - If baseImages provided, compares by image inequality.
 * - If no baseImages provided, any present part is treated as custom.
 */
function isCustomByImage(
  part: IApiMinifigSelectedPart,
  baseImages?: Partial<Record<SelectedKey, string>>,
) {
  if (!baseImages) return true;
  const key = part.type.toLowerCase() as SelectedKey;
  const base = baseImages[key];
  if (!base) return true;
}

/**
 * Transform an API selected part into the slimmer app-facing IBaseMinifigPart shape.
 */
function toBaseMinifigPart(
  apiPart: IApiMinifigSelectedPart,
  slotIndex?: number,
): IBaseMinifigPart {
  const basePart = {
    _id: apiPart.id,
    minifig_part_type: apiPart.type,
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

  if (slotIndex !== undefined && apiPart.type.toLowerCase() === 'accessory') {
    basePart.product_name = `${basePart.product_name} (Slot ${slotIndex + 1})`;
  }

  return basePart;
}

/**
 * Extracts all "custom" parts from a project.selectedItems.
 * - Cleanly supports both BE (IApiMinifigSelectedPart) and legacy MinifigPartData inputs.
 * - Optional baseImages lets you filter out base parts by image equality.
 * - Now handles accessory slots as individual items.
 *
 * Usage:
 *   getCustomPartsForMinifigProject(project, {
 *     head: BaseMinifigParts[MinifigPartType.HEAD]?.image,
 *     torso: BaseMinifigParts[MinifigPartType.TORSO]?.image,
 *     legs: BaseMinifigParts[MinifigPartType.LEGS]?.image,
 *   })
 */
export function getCustomPartsForMinifigProject(
  project: IMinifigProject | null | undefined,
  baseImages?: Partial<Record<SelectedKey, string>>,
): IBaseMinifigPart[] {
  if (!project?.selectedItems) return [];

  const parts: IBaseMinifigPart[] = [];

  // Process regular parts (hair, head, torso, legs)
  for (const key of ORDERED_KEYS) {
    const raw = project.selectedItems[key] as
      | IApiMinifigSelectedPart
      | MinifigPartData
      | undefined;
    const apiPart = normalizeToApiSelectedPart(raw);
    if (!apiPart) continue;

    if (!isCustomByImage(apiPart, baseImages)) continue;

    parts.push(toBaseMinifigPart(apiPart));
  }

  const accessorySlots = project.selectedItems.accessory;
  if (Array.isArray(accessorySlots)) {
    accessorySlots.forEach((slot, index) => {
      if (slot) {
        const apiPart = normalizeToApiSelectedPart(slot);
        if (apiPart) {
          parts.push(toBaseMinifigPart(apiPart, index));
        }
      }
    });
  }

  return parts;
}

/**
 * Creates a summary for a single project.
 * Pass baseImages if you want to filter out base parts (optional).
 */
export function createProjectSummary(
  project: IMinifigProject,
  baseImages?: Partial<Record<SelectedKey, string>>,
): MinfigProjectSummary {
  const customParts = getCustomPartsForMinifigProject(project, baseImages);
  const totalPrice = customParts.reduce((sum, part) => sum + (part.price ?? 0), 0);

  return {
    project,
    minifigPart: customParts,
    totalPrice,
    hasCustomParts: customParts.length > 0,
  };
}

// Builds a cart summary across projects.

export function createCartSummary(
  minifig: IMinifigProject[] | null | undefined,
  baseImages?: Partial<Record<SelectedKey, string>>,
): CartSummary {
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
    .map((p) => createProjectSummary(p, baseImages))
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
}
