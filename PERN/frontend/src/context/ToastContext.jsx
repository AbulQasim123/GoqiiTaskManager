import React, { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);
let idCounter = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback((message, type = 'error', duration = 4000) => {
        const id = ++idCounter;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), duration);
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map((t) => (
                    <div key={t.id} className={`app-toast app-toast-${t.type}`}>
                        <span>{t.message}</span>
                        <button className="app-toast-close" onClick={() => removeToast(t.id)}>&times;</button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);