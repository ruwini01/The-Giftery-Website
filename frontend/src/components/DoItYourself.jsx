import React, { useState } from 'react';
import Button from './Button';
import { Link, useParams } from 'react-router-dom';
import { icons } from '../constants/icon';
import { useBudget } from '../context/BudgetContext';

export default function DoItYourself() {
    const [selectedOption, setSelectedOption] = useState('');
    const [customBudget, setCustomBudget] = useState(1000);
    const {setBudget } = useBudget();
    const { occasion } = useParams();

    const handleSelect = (optionId) => {
        setSelectedOption(optionId);
        if (optionId === '1') setBudget(5000);
        else if (optionId === '2') setBudget(10000);
        else if (optionId === '3') setBudget(0); // Unlimited: maybe show as '∞' or 0
        else if (optionId === '4') setBudget(customBudget);
    };


    React.useEffect(() => {
        if (selectedOption === '4') {
            setBudget(customBudget);
        }
    }, [customBudget]);

    const options = [
        { id: '1', label: 'Rs. 5000' },
        { id: '2', label: 'Rs. 10000' },
        { id: '3', label: 'Unlimited' },
        { id: '4', label: `Rs. ${customBudget.toLocaleString()}`, isCustom: true }
    ];

    return (
        <div className="dm-sans flex justify-center items-center h-screen">
            <div className="px-8 md:px-32 gap-10 w-11/12 md:w-7/8 rounded-xl bg-[#493c0422] py-16">

                <p className="david-libre text-gray-700 mb-4 text-lg">
                    Plan and execute the surprise on your own with our platform providing digital tools and resources.
                </p>

                <h1 className="text-lg font-bold mb-6">
                    Set a Gift/Resource Budget
                </h1>

                <div className="space-y-6">
                    {options.map((option) => (
                        <label
                            key={option.id}
                            className="flex flex-col md:flex-row justify-between items-center cursor-pointer px-4 py-2 mr-[450px]"
                        >
                            <span className="text-md text-[#7B3F00] font-medium">{option.label}</span>

                            <span style={{ position: 'relative' }} className="mt-2 md:mt-0">
                                <input
                                    type="radio"
                                    name="surpriseType"
                                    value={option.id}
                                    checked={selectedOption === option.id}
                                    onChange={() => handleSelect(option.id)}

                                    style={{
                                        appearance: 'none',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: '2px solid #7B3F00',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                        position: 'relative'
                                    }}
                                />
                                {selectedOption === option.id && (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            left: '5px',
                                            width: '10px',
                                            height: '10px',
                                            backgroundColor: '#7B3F00',
                                            borderRadius: '50%'
                                        }}
                                    />
                                )}
                            </span>

                            {option.isCustom && selectedOption === option.id && (
                                <input
                                    type="range"
                                    min="1000"
                                    max="500000"
                                    step="500"
                                    value={customBudget}
                                    onChange={(e) => setCustomBudget(Number(e.target.value))}
                                    className="w-full md:w-1/2 mt-4 md:mt-0"
                                />
                            )}
                        </label>
                    ))}
                </div>

                <div className='items-end justify-end flex flex-col gap-10'>
                <p className="david-libre text-gray-700 text-xl font-semibold w-64 mt-[-100px]">
                    You'llbe able to choose gifts and add-ons in next steps
                </p>
                    <Link to={`/surprise/${occasion}/gifts`}>
                        <Button text="Continue" customstyles="w-[200px] mt-4" icon={icons.go} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
