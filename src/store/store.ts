import {configureStore} from '@reduxjs/toolkit'
import {currencyService} from './currencyService'

export const store = configureStore({
    reducer: {
        [currencyService.reducerPath]: currencyService.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(currencyService.middleware)
})