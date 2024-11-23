import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./slice/userSlice"
import { biddingReducer } from "./slice/biddingSlice"
import { biddingInfoReducer } from "./slice/biddingInfo"
import { biddingUserReducer } from "./slice/biddingUserSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        bidding: biddingReducer,
        biddingInfo: biddingInfoReducer,
        biddingUser: biddingUserReducer
    }
})

export default store