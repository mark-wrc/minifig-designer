import React from 'react';

export interface GeneralCardProps {
  className?: string;
  children: React.ReactNode;
  onclick?: () => void;
  isSelected?: boolean;
}
