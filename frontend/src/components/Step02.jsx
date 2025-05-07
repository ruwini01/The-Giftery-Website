import React, { useState } from 'react';
import Button from './Button';
import { Link, useParams } from 'react-router-dom';
import { icons } from '../constants/icon';

export default function Step02() {
    const [selectedOption, setSelectedOption] = useState('');
    const { occasion } = useParams();

    const options = [
        { id: 'diy', label: 'Do It Yourself Surprise' },
        { id: 'team', label: 'Fully Arranged by Team' },
        { id: 'remote', label: 'Remote Surprise' }
    ];

    return (
        <div className="dm-sans flex justify-center items-center h-screen">
            <div className="px-8 md:px-32 w-11/12 md:w-7/8 rounded-xl bg-[#493c0422] py-16">
                <h1 className="text-lg font-semibold mb-6 text-brown-800">Pick a surprise type</h1>

                <div className="space-y-6">
                    {options.map((option) => (
                        <label
                            key={option.id}
                            className="flex justify-between items-center cursor-pointer pr-[600px] px-4s rounded-lg"
                        >
                            <span className="text-md text-[#7B3F00] font-medium">{option.label}</span>
                            <span style={{ position: 'relative' }}>
                                <input
                                    type="radio"
                                    name="surpriseType"
                                    value={option.id}
                                    checked={selectedOption === option.id}
                                    onChange={() => setSelectedOption(option.id)}
                                    style={{
                                        appearance: 'none',
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: '2px solid #7B3F00',
                                        cursor: 'pointer',
                                        outline: 'none',
                                        position: 'relative',
                                        backgroundColor: 'white'
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
                                            borderRadius: '50%',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                )}
                            </span>
                        </label>
                    ))}
                </div>

                <div className="items-end justify-end flex flex-col gap-10 mt-10">
                    <Link to={`/surprise/${occasion}/step01`}>
                        <Button text="Start Planning" customstyles="w-[200px] mt-4" icon={icons.go} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
