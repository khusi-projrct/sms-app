import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast && (
                <div
                    className={`toast show position-fixed bottom-0 end-0 m-4 bg-${
                        toast.type === "error" ? "danger" : "success"
                    } text-white`}
                    style={{ minWidth: "250px", zIndex: 9999 }}
                >
                    <div className="toast-body">
                        {toast.message}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}