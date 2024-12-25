import { createSlice } from "@reduxjs/toolkit";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const storedCartItems = userInfo && userInfo.id
    ? JSON.parse(localStorage.getItem(`cartItems_${userInfo.id}`)) || []
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
                localStorage.setItem(`cartItems_${userInfo.id}`, JSON.stringify(state.cartItems));
            }
        },
        removeFromCart: (state, action) =>
        {
            if (userInfo && userInfo.id)
            {
                // Retrieve the current cart from localStorage
                const storedCart = JSON.parse(localStorage.getItem(`cartItems_${userInfo.id}`)) || [];

                // Filter out the item to be removed
                const updatedCart = storedCart.filter((item) => item.id !== action.payload.id);

                // Update localStorage with the modified cart
                localStorage.setItem(`cartItems_${userInfo.id}`, JSON.stringify(updatedCart));

                // Update the Redux state with the modified cart
                state.cartItems = updatedCart;
            }
        },

        resetCart: (state) =>
        {
            // Clear the cart
            state.cartItems = [];

            // Remove cart items from localStorage
            if (userInfo && userInfo.id)
            {
                localStorage.removeItem(`cartItems_${userInfo.id}`);
            }
        },
    },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
