


export interface ButtonProps {
    bgColor: string;
    text: string;
    width: string;
    fontSize: string;
    type?: "button" | "submit" | "reset";
    isDisabled?: boolean;
    hoverColor?: string;
    onClick?: () => void;
}