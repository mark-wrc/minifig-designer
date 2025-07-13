import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { CartProject } from '@/types';

// Base selectors
export const selectCartState = (state: RootState) => state.MinifigBuilderCart;

export const selectAllProjects = (state: RootState) => state.MinifigBuilderCart.projects;

export const selectTotalItems = (state: RootState) => state.MinifigBuilderCart.totalItems;

export const selectTotalPrice = (state: RootState) => state.MinifigBuilderCart.totalPrice;

// Derived selectors
export const selectProjectByName = (
  state: RootState,
  projectName: string,
): CartProject | undefined => state.MinifigBuilderCart.projects[projectName];

export const selectProjectNames = createSelector([selectAllProjects], (projects) =>
  Object.keys(projects),
);

export const selectProjectsArray = createSelector([selectAllProjects], (projects) =>
  Object.values(projects),
);

export const selectIsCartEmpty = createSelector(
  [selectAllProjects],
  (projects) => Object.keys(projects).length === 0,
);

export const selectProjectItemCount = (state: RootState, projectName: string): number => {
  const project = state.MinifigBuilderCart.projects[projectName];
  return project ? project.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
};

export const selectItemsByProject = (state: RootState, projectName: string) => {
  const project = state.MinifigBuilderCart.projects[projectName];
  return project ? project.items : [];
};

export const selectCartSummary = createSelector(
  [selectAllProjects, selectTotalItems, selectTotalPrice],
  (projects, totalItems, totalPrice) => ({
    totalProjects: Object.keys(projects).length,
    totalItems,
    totalPrice,
    isEmpty: Object.keys(projects).length === 0,
  }),
);
