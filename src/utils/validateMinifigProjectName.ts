import { IMinifigProject } from '@/types/Minifig';

export interface IValidateMinifigProjectName {
  newProjectName: string;
  existingProjects: IMinifigProject[];
}

export const validateMinifigProjectName = ({
  newProjectName,
  existingProjects,
}: IValidateMinifigProjectName): { isValid: boolean; error?: string } => {
  if (!newProjectName?.trim()) {
    return { isValid: false, error: 'Please enter a project name' };
  }

  const isDuplicate = existingProjects?.some(
    (project) => project.name.toLowerCase() === newProjectName?.trim().toLowerCase(),
  );

  if (isDuplicate) {
    return {
      isValid: false,
      error: 'A project with this name already exists. Please choose a different name.',
    };
  }

  return { isValid: true };
};
