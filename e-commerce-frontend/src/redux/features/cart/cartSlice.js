import { createSlice } from "@reduxjs/toolkit";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const storedCartItems = userInfo && userInfo.id
    ? JSON.parse(localStorage.getItem(`cartItems`)) || []
    : [];

const initialState = {
    cartItems: storedCartItems,
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) =>
        {
            const itemExist = state.cartItems.find((item) => item.id === action.payload.id && item.name === action.payload.name);
            if (itemExist)
            {
                // Increment quantity of the existing item
                itemExist.quantity += 1;
            } else
            {
                // Add the new item with quantity 1
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }

            // Save the updated cart to localStorage
            if (userInfo && userInfo.id)
            {
                localStorage.setItem(`cartItems`, JSON.stringify(state.cartItems));
            }
        },

        removeFromCart: (state, action) =>
        {
            const index = state.cartItems.findIndex(
                (item) => item.id === action.payload.id && item.name === action.payload.name
            );

            if (index !== -1)
            {
                // Decrement quantity or remove item
                if (state.cartItems[index].quantity > 1)
                {
                    state.cartItems[index].quantity -= 1;
                } else
                {
                    state.cartItems.splice(index, 1);
                }

                // Update totals
                state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
                state.cartTotalAmount = state.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

                // Save updated cart to localStorage
                if (userInfo && userInfo.id)
                {
                    localStorage.setItem(`cartItems`, JSON.stringify(state.cartItems));
                }
            }
        },
        resetCart: (state) =>
        {
            // Clear the cart
            state.cartItems = [];

            // Remove cart items from localStorage
            if (userInfo && userInfo.id)
            {
                localStorage.removeItem(`cartItems`);
            }
        },
    },
});


export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
