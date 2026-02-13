import React, { useState, useEffect, useRef } from 'react';
import './StoreSelector.css';

const STORE_DATA = [
    { id: 1, franchiseName: 'CartNet Supermart', location: 'MG Road', district: 'Ernakulam' },
    { id: 2, franchiseName: 'CartNet Express', location: 'Edappally', district: 'Ernakulam' },
    { id: 3, franchiseName: 'CartNet Fresh', location: 'Kaloor', district: 'Ernakulam' },
    { id: 4, franchiseName: 'CartNet Daily', location: 'Vyttila', district: 'Ernakulam' },
    { id: 5, franchiseName: 'CartNet Mart', location: 'Aluva', district: 'Ernakulam' },
];

const StoreSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState(STORE_DATA[0]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleStoreSelect = (store) => {
        setSelectedStore(store);
        setIsOpen(false);
    };

    return (
        <div className="store-selector-container" ref={dropdownRef}>
            <button
                className={`store-selector-btn ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select Store"
            >
                <span className="store-icon">📍</span>
                <div className="store-info">
                    <div className="store-label">{selectedStore.franchiseName}</div>
                    <div className="store-current">
                        {selectedStore.location}, {selectedStore.district}
                    </div>
                </div>
                <span className={`store-chevron ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className="store-dropdown">
                    <div className="store-dropdown-header">
                        Select your nearest store
                    </div>
                    <div className="store-list">
                        {STORE_DATA.map((store) => (
                            <button
                                key={store.id}
                                className={`store-item ${selectedStore.id === store.id ? 'selected' : ''}`}
                                onClick={() => handleStoreSelect(store)}
                            >
                                <div className="store-item-icon">🏪</div>
                                <div className="store-item-details">
                                    <div className="store-item-name">{store.franchiseName}</div>
                                    <div className="store-item-location">{store.location}, {store.district}</div>
                                </div>
                                {selectedStore.id === store.id && <span className="check-icon">✓</span>}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreSelector;
