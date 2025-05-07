import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from './Button';
import { icons } from '../constants/icon';
import Step01 from './Step01';


export default function Description() {
    const { occasion } = useParams();
    return (
        <>
            <div className="dm-sans flex justify-center items-center h-screen">
                <div className="px-8 md:px-32 gap-10 w-11/12 md:w-7/8 rounded-xl bg-[#493c0422] py-16">
                    <h1 className="text-lg font-bold mb-6">
                        Let’s Plan an Amazing {occasion}!”
                    </h1>

                    <p className="david-libre text-gray-700 mb-4">
                        “You're planning a memorable {occasion} surprise! We’ll guide you through a few quick steps to make it unforgettable.”
                    </p>

                    <div className='items-end justify-end flex flex-col gap-10'>
                        <Link to = {`/surprise/${occasion}/step01`}><Button text="Start Planning" customstyles="w-[200px] mt-4" icon={icons.go}/></Link>
                    </div>
                </div>
            </div>
        </>

    )
}
