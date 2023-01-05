import React, {ReactElement, useState, useEffect} from 'react';
import type {MouseEvent, ChangeEvent} from 'react'
import {CgArrowsExchange} from 'react-icons/cg'
import {TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti'
import {useConvertCurrencyQuery} from "../store/currencyService";

const symbol = "text-xl mr-1 text-blue-400"
const curr = "font-semibold text-xl"

const currency: {
    [key: string]: ReactElement
} = {
    UAH: <>
        <span className={symbol}>₴</span>
        <span className={curr}>UAH</span>
    </>,
    USD: <>
        <span className={symbol}>$</span>
        <span className={curr}>USD</span>
    </>,
    EUR: <>
        <span className={symbol}>€</span>
        <span className={curr}>EUR</span>
    </>
}

const regex = /^[0-9]+$|^[0-9]+\.[0-9]+$/

//styles
const container = "pt-10 md:bg-[url('/home-bg.png')] bg-no-repeat bg-cover h-[75vh] grid place-content-center mx-10 rounded-xl"
const exchangeBox = "w-full md:min-w-[740px] mx-auto flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 items-center py-24 md:py-64 bg-[#2A2E93cc] rounded-lg px-10 md:h-[320px]"
const sendBox = "grid gap-5"
const title = "text-white text-2xl font-semibold"
const ul = "text-white relative"
const selectedLi = (isOpen: boolean) => `p-3 border font-semibold border-gray-200 rounded-t relative 
                    ${isOpen ? 'rounded-b-0' : 'rounded-b'} cursor-pointer`
const liBox = (isOpen: boolean) => `${isOpen ? 'h-[105px]' : 'h-0'} transition-all duration-200 overflow-hidden
 absolute w-full bg-[#4246a8] md:bg-[#2A2E93]`
const li = "md:hover:bg-[#4246a8] hover:bg-[#2A2E93] transition cursor-pointer p-3 border-r-[1px] border-l-[1px] last:border-b-[1px] last:rounded-bl last:rounded-br"
const iconBox = "w-10 h-10 grid place-content-center rounded-full bg-[#383ec8] cursor-pointer"
const icon = "text-3xl text-[#fff5]"
const input = "rounded focus:outline-none text-[#453dad] h-[52px] px-3 w-[275px]"
const arrow = "absolute right-4 top-1/2 -translate-y-1/2"
//***

export const Exchange = () => {
    const [send, setSend] = useState(3000)
    const [get, setGet] = useState(0)
    const [openLeft, setOpenLeft] = useState(false)
    const [openRight, setOpenRight] = useState(false)

    const [select, setSelect] = useState({
        send: 'USD',
        get: 'UAH'
    })

    const {data, refetch} = useConvertCurrencyQuery({from: select.send, to: select.get})

    const handleLeftContainerOpen = (event: MouseEvent) => {
        event.stopPropagation()
        setOpenLeft(prev => !prev)
    }
    const handleRightContainerOpen = (event: MouseEvent) => {
        event.stopPropagation()
        setOpenRight(prev => !prev)
    }

    const changeSelectCurrency = (side: string, currency: string) => () => setSelect(prev => ({
        ...prev,
        [side]: currency
    }))

    const handleSelectClose = () => {
        setOpenLeft(false)
        setOpenRight(false)
    }

    const handleSend = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value

        if (!value) {
            setSend(0)
            return
        }

        if (value[value.length - 1] === '.') value = value.substring(0, value.length - 1)

        if (!regex.test(value)) return

        get !== 0 && setGet(0)
        setSend(Number(value))
    }

    const handleGet = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value

        if (!value) {
            setGet(0)
            return
        }

        if (value[value.length - 1] === '.') value = value.substring(0, value.length - 1)

        if (value[0] === '.') value = value.substring(0, value.length - 1)
        if (!regex.test(value)) return

        send !== 0 && setSend(0)
        setGet(Number(value))
    }

    const handleFlipCurrency = () => setSelect(prev => ({get: select.send, send: select.get}))

    useEffect(() => {
        refetch()
    }, [select])


    return (
        <div
            className={container}
            onClick={handleSelectClose}
        >
            <div
                className={exchangeBox}>

                <div className={sendBox}>
                    <h2 className={title}>Send:</h2>
                    <ul className={ul} onClick={handleLeftContainerOpen}>
                        <li className={selectedLi(openLeft)}>
                            {currency[select.send]}
                            {openLeft
                                ? <TiArrowSortedUp className={arrow}/>
                                : <TiArrowSortedDown className={arrow}/>
                            }
                        </li>
                        <div
                            className={liBox(openLeft)}>
                            {Object.keys(currency).map(item => {
                                    if (select.send !== item) {
                                        return <li
                                            onClick={changeSelectCurrency('send', item)}
                                            key={item}
                                            className={li}>{currency[item]}</li>
                                    }
                                }
                            )}
                        </div>
                    </ul>
                    <input
                        className={input}
                        type="text"
                        value={get === 0 ? send : (get / (data?.info.rate ? data?.info.rate : 1)).toFixed(2)}
                        onChange={handleSend}
                    />
                </div>
                <div className={iconBox} onClick={handleFlipCurrency}>
                    <CgArrowsExchange className={icon}/>
                </div>
                <div className={sendBox}>
                    <h2 className={title}>Get:</h2>
                    <ul
                        className={ul}
                        onClick={handleRightContainerOpen}
                    >
                        <li className={selectedLi(openRight)}>
                            {currency[select.get]}
                            {openRight
                                ? <TiArrowSortedUp className={arrow}/>
                                : <TiArrowSortedDown className={arrow}/>
                            }
                        </li>
                        <div
                            className={liBox(openRight)}>
                            {Object.keys(currency).map(item => {
                                    if (select.get !== item) {
                                        return <li
                                            onClick={changeSelectCurrency('get', item)}
                                            key={item}
                                            className={li}>{currency[item]}</li>
                                    }
                                }
                            )}
                        </div>
                    </ul>
                    <input
                        className={input}
                        type="text"
                        value={send === 0 ? get : send * (data?.info.rate ? data?.info.rate : 1).toFixed(2)}
                        onChange={handleGet}
                    />
                </div>
            </div>
        </div>
    );
};