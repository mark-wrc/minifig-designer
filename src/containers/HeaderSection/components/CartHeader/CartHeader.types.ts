export interface ICartHeaderProps {
  items: {
    totalItems: number;
    totalPrice: number;
  };
  onClose: () => void;
}
