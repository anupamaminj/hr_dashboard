"use client";

import { useState, useRef, useEffect } from 'react';

const MultiSelectDropdown = ({ options, selectedOptions, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value) => {
        let newSelectedOptions;
        if (selectedOptions.includes(value)) {
            newSelectedOptions = selectedOptions.filter((option) => option !== value);
        } else {
            newSelectedOptions = [...selectedOptions, value];
        }
        onChange(newSelectedOptions);
    };

    const displayValue = selectedOptions.length > 0
        ? selectedOptions.map(val => options.find(opt => opt.value === val)?.label || val).join(', ')
        : placeholder;

    return (
        <div className="relative min-w-[180px]" ref={dropdownRef}>
            <button
                type="button"
                onClick={handleToggle}
                className="w-full text-left bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
            >
                <span className="truncate">{displayValue}</span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-700 dark:border-gray-600 max-h-60 overflow-auto">
                    {options.length === 0 ? (
                        <div className="px-4 py-2 text-gray-500 dark:text-gray-400">No options available</div>
                    ) : (
                        options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-600 dark:border-gray-500"
                                    checked={selectedOptions.includes(option.value)}
                                    onChange={() => handleOptionClick(option.value)}
                                />
                                <span className="ml-2 text-gray-800 dark:text-gray-200">{option.label}</span>
                            </label>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;