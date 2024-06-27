export interface ISearchWidgetProps {
    activeSearch?: boolean;
    onClear: () => void;
    onApply: (value: string) => void;
}
