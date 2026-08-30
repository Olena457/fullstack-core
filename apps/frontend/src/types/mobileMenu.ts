import { ReactNode } from "react";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface MobileMenuItemProps {
  href: string;
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  endIcon?: ReactNode; 
}
