import { toast } from "sonner";

// ✅ Success Message (Green)
export const successMessage = (message) => {
    toast.success(message, {
        duration: 3000, 
        style: {
            backgroundColor: '#38a169', // Tailwind green-600
            color: '#ffffff',
            borderRadius: '0.5rem',
            padding: '1rem 1.5rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        },
        className: 'transition-all duration-300 ease-in-out opacity-0 translate-y-2',
        onOpen: (toastId) => {
            setTimeout(() => {
                toast.update(toastId, { className: 'opacity-100 translate-y-0' });
            }, 0);
        },
    });
};

// ❌ Error Message (Red)
export const errorMessage = (message) => {
    toast.error(message, {
        duration: 4000, // Slightly longer duration for errors
        style: {
            backgroundColor: '#E53E3E', // Tailwind red-600
            color: '#ffffff',
            borderRadius: '0.5rem',
            padding: '1rem 1.5rem',
            boxShadow: '0 4px 12px rgba(255, 0, 0, 0.3)',
            borderLeft: '5px solid #C53030', // Adds a professional touch
        },
        className: 'transition-all duration-300 ease-in-out opacity-0 translate-y-2',
        onOpen: (toastId) => {
            setTimeout(() => {
                toast.update(toastId, { className: 'opacity-100 translate-y-0' });
            }, 0);
        },
    });
};

// ⚠️ Invalid Message (Yellow)
export const invalidMessage = (message) => {
    toast.warning(message, {
        duration: 3500, 
        style: {
            backgroundColor: '#D69E2E', // Tailwind yellow-600
            color: '#ffffff',
            borderRadius: '0.5rem',
            padding: '1rem 1.5rem',
            boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)',
            borderLeft: '5px solid #B7791F', // Adds a professional look
        },
        className: 'transition-all duration-300 ease-in-out opacity-0 translate-y-2',
        onOpen: (toastId) => {
            setTimeout(() => {
                toast.update(toastId, { className: 'opacity-100 translate-y-0' });
            }, 0);
        },
    });
};
