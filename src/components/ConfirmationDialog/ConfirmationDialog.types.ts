export type IActionButtons = {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  showClosebtn?: boolean;
};

export type IEmojiProps = {
  text: string;
  emojiStyles: string;
};

export type containerStyles = {
  className?: string;
  descriptionContainerStyle?: string;
  actionContainerStyles?: string;
  emoji?: IEmojiProps;
};

export interface IConfirmationDialogProps extends IActionButtons, containerStyles {
  title?: string;
  description?: string;
  icon?: React.ElementType | string;
}
