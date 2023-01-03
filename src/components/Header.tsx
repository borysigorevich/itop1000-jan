import React from 'react';
import {useGetUERRateQuery, useGetUSDRateQuery} from "../store/currencyService";

const currBox = "flex gap-1"
const currName = "text-gray-700"
const currRate = "text-[#4c6ce0]"

export const Header = () => {
    const {data: usdRate} = useGetUSDRateQuery('')
    const {data: eurRate} = useGetUERRateQuery('')

    console.log(usdRate, eurRate)

    return (
        <header className='mb-10'>
            <nav className='flex justify-center gap-16 py-4 max-w-3xl mx-auto border-b-2 text-2xl'>
                <div className={currBox}>
                    <span className={currName}>USD:</span>
                    <span className={currRate}>₴{usdRate?.rates.UAH.toFixed(3)}</span>
                </div>
                <div className={currBox}>
                    <span className={currName}>EUR:</span>
                    <span className={currRate}>₴{eurRate?.rates.UAH.toFixed(3)}</span>
                </div>
            </nav>
        </header>
    );
};