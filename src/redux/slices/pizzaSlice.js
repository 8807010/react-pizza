import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get(
            `https://629bc30acf163ceb8d1d9f29.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
        return data
    }
);

const initialState = {
    items: [],
    status: 'loading',  //loading | success | error
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';

        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        },
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer; 