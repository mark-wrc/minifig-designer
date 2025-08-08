import type {
  IMinifigProject,
  IApiMinifigSelectedPart,
  IBaseMinifigPart,
  MinfigProjectSummary,
  CartSummary,
  MinifigPartData,
} from '@/types/Minifig';

/**
 * We support both BE shape (IApiMinifigSelectedPart) and legacy MinifigPartData.
 * This normalizer produces a consistent IApiMinifigSelectedPart shape.
 */
function normalizeToApiSelectedPart(
  part: IApiMinifigSelectedPart | MinifigPartData | undefined,
): IApiMinifigSelectedPart | null {
  if (!part) return null;

  if ('type' in part && 'id' in part) {
    // IApiMinifigSelectedPart
    return part as IApiMinifigSelectedPart;
  }

  // Legacy MinifigPartData shape -> map to API part shape
  if ('minifig_part_type' in part) {
    const p = part as MinifigPartData;
    return {
      id: p._id,
      type: p.minifig_part_type,
      name: p.product_name,
      description: p.product_description_1,
      image: p.image,
      price: p.price,
      stock: p.stock,
      color: p.product_color?.name ?? 'Unknown Color',
    };
  }

  return null;
}

const ORDERED_KEYS = ['head', 'torso', 'legs'] as const;
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
  return Boolean(part.image && part.image !== base);
}

/**
 * Transform an API selected part into the slimmer app-facing IBaseMinifigPart shape.
 */
function toBaseMinifigPart(apiPart: IApiMinifigSelectedPart): IBaseMinifigPart {
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
}

/**
 * Extracts all "custom" parts from a project.selectedItems.
 * - Cleanly supports both BE (IApiMinifigSelectedPart) and legacy MinifigPartData inputs.
 * - Optional baseImages lets you filter out base parts by image equality.
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

  for (const key of ORDERED_KEYS) {
    // selectedItems may be BE or legacy; normalize per part

    const raw = project.selectedItems[key] as
      | IApiMinifigSelectedPart
      | MinifigPartData
      | undefined;
    const apiPart = normalizeToApiSelectedPart(raw);
    if (!apiPart) continue;

    if (!isCustomByImage(apiPart, baseImages)) continue;

    parts.push(toBaseMinifigPart(apiPart));
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
