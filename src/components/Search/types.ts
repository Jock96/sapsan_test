export interface ISearchProps {
    value?: string;
    onChange: (value: string) => void;
    showIcon?: boolean;
    clearable?: boolean;
    onClear?: () => void;
    placeholder?: string;
    className?: string;
}
