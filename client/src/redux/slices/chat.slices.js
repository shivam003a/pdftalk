import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllChats = createAsyncThunk('chat/getAllChats', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BE_URI}/api/chat/`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            credentials: 'include'
        })

        const body = await response.json()

        if (!response.ok) {
            return thunkAPI.rejectWithValue(body?.message || "Something Went Wrong")
        }

        return body?.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e?.message || "Unable to Fetch Chats")
    }
})

export const getChatById = createAsyncThunk('chat/getChatById', async (chatId, thunkAPI) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BE_URI}/api/chat/${chatId}`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            credentials: 'include'
        })

        const body = await response.json()

        if (!response.ok) {
            return thunkAPI.rejectWithValue(body?.message || "Something Went Wrong")
        }

        return body?.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e?.message || "Unable to Fetch Chat By Id")
    }
})

export const deleteChatById = createAsyncThunk('chat/deleteChatById', async (payload, thunkAPI) => {
    try {
        const { deleteChatId, chatId } = payload
        const response = await fetch(`${import.meta.env.VITE_BE_URI}/api/chat/${deleteChatId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            credentials: 'include'
        })

        const body = await response.json()

        if (!response.ok) {
            return thunkAPI.rejectWithValue(body?.message || "Something Went Wrong")
        }
        thunkAPI.dispatch(getAllChats())

        return {
            data: body?.data,
            redirect: deleteChatId === chatId
        };
    } catch (e) {
        return thunkAPI.rejectWithValue(e?.message || "Unable to Fetch Chat By Id")
    }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],
        chat: null,
        currentChatId: null,
        loading: true,
        error: null
    },
    reducers: {
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllChats.pending, (state) => {
                state.error = null;
                state.loading = true
            })
            .addCase(getAllChats.fulfilled, (state, action) => {
                state.chats = action.payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(getAllChats.rejected, (state, action) => {
                state.chats = []
                state.error = action.payload
                state.loading = false;
            })
            .addCase(getChatById.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getChatById.fulfilled, (state, action) => {
                state.chat = action.payload
                state.error = null;
                state.loading = false
            })
            .addCase(getChatById.rejected, (state, action) => {
                state.error = action.payload;
                state.chat = null;
                state.loading = false;
            })
            .addCase(deleteChatById.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteChatById.fulfilled, (state, action) => {
                if (action.payload?.redirect) {
                    state.chat = null;
                    state.currentChatId = null;
                }
                state.error = null;
                state.loading = false;
            })
            .addCase(deleteChatById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export const { setCurrentChatId } = chatSlice.actions;
export default chatSlice.reducer