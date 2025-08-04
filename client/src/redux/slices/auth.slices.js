import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BE_URI}/api/auth/check-auth`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            credentials: 'include'
        })
        const body = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(body?.message || 'Unauthorized')
        }

        return body.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e?.message || "Something Went Wrong")
    }
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BE_URI}/api/auth/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            credentials: 'include'
        })
        const body = await response.json();

        if (!response.ok) {
            return thunkAPI.rejectWithValue(body?.message || 'Logout Failed')
        }
        return body;

    } catch (e) {
        return thunkAPI.rejectWithValue(e?.message || "Something Went Wrong")
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null
    },
    reducers: {
        authSuccess: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true;
            state.error = null;
            state.loading = false;
        },
        authFailed: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.error = null;
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false;
            })
    }
})

export const {
    authSuccess,
    authFailed,
    setLoading
} = authSlice.actions;

export default authSlice.reducer;