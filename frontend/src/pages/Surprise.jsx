import React from 'react'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { images } from '../constants/images'
import SurpriseCard from '../components/SurpriseCard'


const Occasions = [
  {
    image: images.carsuprice,
    title: "Anniversary",
    description: "Romantic music, balloons, and fairy lights inside a decorated cars, rooms, or any place.",
    buttonColor: "#B32E38",
    buttonhoverColor: "#D94F54",
  },
  {
    image: images.marryme,
    title: "Proposal",
    description: "Light letters, rose carpet, candles on the beaches, rooftops or any place.",
    buttonColor: "#28A9BA",
    buttonhoverColor: "#3CC4D9",
  },
  {
    image: images.cake,
    title: "Midnight Cake Surprise",
    description: "Delivered at 12 AM with sparklers & balloons.",
    buttonColor: "#B9A736",
    buttonhoverColor: "#D9C94D",
  },

  {
    image: images.carsuprice,
    title: "Anniversary",
    description: "Romantic music, balloons, and fairy lights inside a decorated cars, rooms, or any place.",
    buttonColor: "#B32E38",
    buttonhoverColor: "#D94F54",
  },
  {
    image: images.carsuprice,
    title: "Birthday",
    description: "Surprise your loved ones with a special birthday gift.",
    buttonColor: "#B32E38",
    buttonhoverColor: "#D94F54",
  },
  {
    image: images.carsuprice,
    title: "Graduation",
    description: "Celebrate your graduation with a special gift.",
    buttonColor: "#B32E38",
    buttonhoverColor: "#D94F54",
  },
]

export default function Surprise() {
  return (
    <>
    <h1 className='px-32 py-12 dm-sans font-semibold text-xl pb-8'>What's the Occasion?</h1>
      <div className=" items-center justify-center flex flex-col gap-10">
        
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>
            {Occasions.map((card, index) => (
              <SurpriseCard
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
                buttonColor={card.buttonColor}
                buttonhoverColor={card.buttonhoverColor}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col dm-sans w-lg rounded-2xl border-1 border-[#7e382d25] overflow-hidden shadow-md justify-center items-center hover:shadow-xl transition-shadow duration-300 ease-in-out px-6 py-10 mb-10">
          <div className='flex flex-row justify-between items-center pb-5'>
            <img
              className="w-24 object-cover mr-5"
              src={images.cake}
              alt="Card Image"
            />
            <h2 className="text-xl font-semibold mb-2">Tell us about your customize idea</h2>
          </div>
          <div className="p-5">

            <textarea
              rows="4"
              cols="50"
              type="text"
              placeholder="What kind of surprise occasion you are looking for? Ex: Baby Shower, Thank You, etc."
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full" />
            <button
              className="cursor-pointer px-4 w-full py-2 text-white bg-[#7E382D] hover:bg-[#7e382dee] rounded-lg transition duration-300 ease-in-out"
            >
              Select
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
