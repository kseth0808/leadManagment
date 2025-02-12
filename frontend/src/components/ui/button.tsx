import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => {
    return (
        <button className={` px-4 py-2 text-sm font-medium class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-color shadow h-9" ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
