import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isLoading: false,
    error: undefined
}

export const fetchUser = createAsyncThunk('user/getUser', async () => {
    const result = await fetch('https://randomuser.me/api/?results=5');

    return await result.json();
})

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducer: {
        addUser: (state, { payload }) => {
            state.users.push(payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload.results;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;