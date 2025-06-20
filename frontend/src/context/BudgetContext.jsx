import React, { createContext, useState, useContext } from 'react';

const BudgetContext = createContext();

export const useBudget = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
    const [budget, setBudget] = useState(0);

    return (
        <BudgetContext.Provider value={{ budget, setBudget }}>
            {children}
        </BudgetContext.Provider>
    );
};
