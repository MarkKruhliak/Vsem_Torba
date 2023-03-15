import {createSlice} from "@reduxjs/toolkit";

const CartSLice = createSlice({
    name: 'testSlice',
    initialState: {
        products: [],
    },
    reducers: {

        addOneProductToCart: (state, action) => {
            const product = action.payload

            const isExistProduct = state.products.find(item => item.name === product.name)

            if (!isExistProduct) {
                state.products.push({id: Date.now(), ...product})
            }

        },
        deleteOneItemFromCart: (state, action) => {
            state.products = state.products.filter(value => value.name !== action.payload)

        },

        deleteALlProductsFromCart: (state, action) => {
            state.products = []
        }
    },

})

export const CartReducer = CartSLice.reducer
export const {addOneProductToCart, deleteALlProductsFromCart, deleteOneItemFromCart} = CartSLice.actions
