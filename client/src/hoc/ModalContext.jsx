import React, { createContext, useState } from 'react';

// Create the modal context
const ModalContext = createContext();

// Create a modal provider component
const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Value object to be provided by the context
    const value = {
        isModalOpen,
        openModal,
        closeModal,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

export { ModalContext, ModalProvider };