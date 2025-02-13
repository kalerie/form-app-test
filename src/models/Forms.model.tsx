export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export type MyDatePickerProps = {
  onDateChange: (date: Date | null) => void;
};
