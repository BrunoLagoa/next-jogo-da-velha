export interface CellProps {
  value: string;
  index: number;
  disabled: boolean;
  onClick: (index: number) => void;
}