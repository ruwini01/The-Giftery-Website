import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-dropdown-select';
import { Link, useParams } from 'react-router-dom';
import Button from './Button';
import { icons } from '../constants/icon';
import Calendar from 'react-calendar';

export default function Step01() {
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);
    const { occasion } = useParams();

    const countryOptions = [
        { value: 'LK', label: 'Sri Lanka' },
        { value: 'IN', label: 'India' },
        { value: 'US', label: 'United States' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'AU', label: 'Australia' },
        { value: 'CA', label: 'Canada' },
        { value: 'SG', label: 'Singapore' },
        { value: 'MY', label: 'Malaysia' }
    ];


    const timeOptions = [
        { value: '1', label: 'Any Time (8 AM - 6PM)' },
        { value: '2', label: 'Day Time (11 AM - 5 PM)' },
        { value: '3', label: 'Evening Time (5 PM- 8PM)' },
        { value: '3', label: 'Mid Night (12 AM)' },

    ];

    // Hide calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="dm-sans flex justify-center items-center h-screen">
            <div className="px-8 md:px-32 gap-10 w-11/12 md:w-7/8 rounded-xl bg-[#493c0422] py-16">
                <h1 className="text-md font-semibold mb-6">
                    To which country are you sending this surprise?
                </h1>

                <div>
                    <Select
                        options={countryOptions}
                        onChange={setSelectedCountry}
                        values={selectedCountry}
                        placeholder="Select a country"
                        dropdownPosition="auto"
                        searchable={true}
                        style={{
                            width: '250px',
                            height: '40px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <div className='flex flex-row  justify-between items-center'>
                    <div className="mt-10">
                        <h1 className="text-md font-semibold mb-3">Delivery Date</h1>

                        <button
                            className="w-[250px] px-4 py-2 border border-gray-300 rounded-md bg-white text-left"
                            onClick={() => setShowCalendar(!showCalendar)}
                        >
                            {date.toDateString()}
                        </button>

                        {/* Calendar Dropdown */}
                        {showCalendar && (
                            <div
                                ref={calendarRef}
                                className="absolute z-50 mt-2 bg-white shadow-lg rounded-md p-4 border"
                            >
                                <Calendar
                                    onChange={(d) => {
                                        setDate(d);
                                        setShowCalendar(false);
                                    }}
                                    value={date}
                                    className="react-calendar"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="mt-10">
                            <h1 className="text-md font-semibold mb-3">Delivery Time</h1>
                            <Select
                                options={timeOptions}
                                onChange={setSelectedTime}
                                values={selectedTime}
                                placeholder="Select a preferred time"
                                dropdownPosition="auto"
                                searchable={true}
                                style={{
                                    width: '250px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        </div>
                    </div>
                    </div>

                    <div className="items-end justify-end flex flex-col gap-10 mt-20">
                        <Link to={`/surprise/${occasion}/step02`}>
                            <Button
                                text="Continue"
                                customstyles="w-[150px] mt-4"
                                icon={icons.go}
                            />
                        </Link>
                    </div>
                
            </div>
        </div>
    );
}
