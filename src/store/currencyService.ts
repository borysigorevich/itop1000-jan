import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const currencyService = createApi({
    reducerPath: 'currency',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: "https://api.apilayer.com/exchangerates_data/",
            prepareHeaders: (headers) => {
                headers.set('apikey', 'KT8WOP8ZpyOyG0ysJQDBDidroohk7BnQ')
                return headers
            }
        }),
    endpoints: (build) => ({
        getUSDRate: build.query({
            query: () => ({
                url: 'latest?symbols=UAH&base=USD'
            })
        }),
        getUERRate: build.query({
            query: () => ({
                url: 'latest?symbols=UAH&base=EUR'
            })
        }),
        convertCurrency: build.query({
            query: ({from, to}) => ({
                url: `convert?to=${to}&from=${from}&amount=5`
            })
        })
    })
})

export const {useGetUSDRateQuery, useConvertCurrencyQuery, useGetUERRateQuery} = currencyService

