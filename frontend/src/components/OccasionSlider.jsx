import React, { useState, useEffect } from 'react'
import { icons } from '../constants/icon'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { images } from '../constants/images'
import OccasionTheme from './OccasionTheme'

function SampleNextArrow({ onClick }) {
    return (
        <div
            className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#7E382D] hover:text-[#5c241b]"
            onClick={onClick}
        >
            <FaChevronRight size={24} />
        </div>
    )
}

function SamplePrevArrow({ onClick }) {
    return (
        <div
            className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[#7E382D] hover:text-[#5c241b]"
            onClick={onClick}
        >
            <FaChevronLeft size={24} />
        </div>
    )
}

export default function OccasionSlider() {
    const [activeId, setActiveId] = useState(null)
    const [selectedOccasion, setSelectedOccasion] = useState(null)
    const { occasion } = useParams()

    const data = [
        { id: 1, name: 'Birthday', image: icons.bday, image_hover: icons.bday_w },
        { id: 2, name: 'Anniversary', image: icons.bday, image_hover: icons.bday_w },
        { id: 3, name: 'Proposal', image: icons.bday, image_hover: icons.bday_w },
        { id: 4, name: 'Wedding', image: icons.bday, image_hover: icons.bday_w },
        { id: 5, name: 'Thank You', image: icons.bday, image_hover: icons.bday_w },
        { id: 6, name: 'Get Well', image: icons.bday, image_hover: icons.bday_w },
        { id: 7, name: 'Baby Shower', image: icons.bday, image_hover: icons.bday_w },
        { id: 8, name: 'Valentine', image: icons.bday, image_hover: icons.bday_w },
        { id: 9, name: 'Graduation', image: icons.bday, image_hover: icons.bday_w },
        { id: 10, name: 'Farewell', image: icons.bday, image_hover: icons.bday_w },
    ]

    useEffect(() => {
        if (occasion) {
            const matched = data.find(d =>
                d.name.toLowerCase().replace(/\s+/g, '-') === occasion.toLowerCase()
            )
            if (matched) {
                setActiveId(matched.id)
                setSelectedOccasion(matched.name)
            }
        }
    }, [occasion])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 4 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 2 },
            },
        ],
    }

    const handleClick = (item) => {
        setActiveId(item.id)
        setSelectedOccasion(item.name)
    }

    return (
        <div className="w-full px-6 py-4 relative">
            <Slider {...settings}>
                {data.map((item) => {
                    const isActive = item.id === activeId
                    return (
                        <div key={item.id} className="flex justify-center">
                            <div
                                className={`flex flex-col items-center justify-center w-24 h-24 p-2 rounded-full transition-all duration-300 mx-auto border-2
                                    ${isActive ? 'bg-[#7E382D]' : 'bg-white'}
                                    ${isActive ? 'border-[#7E382D]' : 'border-[#7E382D]'}
                                    hover:bg-[#7E382D] cursor-pointer group relative`}
                                onClick={() => handleClick(item)}
                            >
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="relative w-10 h-10 mb-1">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 
                                                ${isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}
                                        />
                                        <img
                                            src={item.image_hover}
                                            alt={item.name}
                                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 
                                                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                        />
                                    </div>
                                    <p
                                        className={`text-xs text-center font-semibold transition-colors duration-300 
                                            ${isActive ? 'text-white' : 'text-[#7E382D] group-hover:text-white'}`}
                                    >
                                        {item.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
            <OccasionTheme selectedOccasion={selectedOccasion} />
        </div>
    )
}
