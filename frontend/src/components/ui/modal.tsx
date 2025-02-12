import React, { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
    children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, size = 'sm', position = 'center', children }) => {
    if (!isOpen) return null;

    const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
        sm: 'w-full max-w-xs',
        md: 'w-full max-w-sm',
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-xl',
    };

    const positionClasses: Record<'center' | 'top' | 'bottom' | 'left' | 'right', string> = {
        center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        top: 'top-4 left-1/2 transform -translate-x-1/2',
        bottom: 'bottom-4 left-1/2 transform -translate-x-1/2',
        left: 'top-1/2 left-4 transform -translate-y-1/2',
        right: 'top-1/2 right-4 transform -translate-y-1/2',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className={`fixed p-1 ${positionClasses[position]} ${sizeClasses[size]} bg-white rounded-2xl shadow-lg`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <CloseIcon />
                </button>
                <div className="flex flex-col">{children}</div>
            </div>
        </div>
    );
};

export const ModalHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="border-b p-4 font-semibold text-lg">{children}</div>
);

export const ModalBody: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="p-4">{children}</div>
);

export const ModalFooter: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="border-t p-4 flex justify-end space-x-2">{children}</div>
);

export default Modal;
