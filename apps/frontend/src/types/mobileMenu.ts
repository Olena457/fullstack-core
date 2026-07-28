import { ReactNode } from "react";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isHome: boolean;
}

export interface MobileMenuItemProps {
  href: string;
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  endIcon?: ReactNode; 
}
