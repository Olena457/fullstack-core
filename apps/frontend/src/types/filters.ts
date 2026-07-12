export interface FilterSidebarProps {
  search: string;
  onSearchChange: (text: string) => void;
  selectedSort: string;
  selectedGender: string;
  selectedColor: string;
  selectedSize: string;
  onSortChange: (sort: string) => void;
  onGenderChange: (gender: string) => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}
