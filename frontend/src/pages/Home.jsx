import React from 'react';
import Button from '../components/Button';
import { images } from '../constants/images';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <div className="flex flex-row items-center justify-between px-32 py-12">

                <div className="flex flex-col gap-10">
                    <h1 className="david-libre text-5xl font-bold ">
                        Plan the Perfect Surprise
                    </h1>
                    <p className="david-libre text-lg text-gray-700">
                        Make their special moments unforgettable – gifts, decor,
                        <br />
                        and memories, planned your way.
                    </p>
                    <Link to='surprise'><Button text="Book a surprise" customstyles="copse w-[200px]" /></Link>
                </div>

                <div className="flex-shrink-0">
                    <img
                        src={images.banner}
                        alt="banner"
                        className="w-[360px] h-auto object-contain"
                    />
                </div>

            </div>


            <div className="flex flex-col gap-10 items-center  py-10">
                <h1 className="david-libre text-5xl font-bold ">
                    Surprise Gift Box
                </h1>
                <p className="david-libre text-lg text-gray-700 text-center">
                    Create a personalized gift box with
                    <br />
                    your choice of items
                </p>
                <Link to='gifts'><Button text="Build Your Gift Box" customstyles="copse w-[200px]" /></Link>
            </div>


        </>
    );
}
