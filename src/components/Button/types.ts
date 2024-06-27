import type { PropsWithChildren } from "react";

export interface IButtonProps extends PropsWithChildren {
    children: string;
    onClick: () => void;
}
