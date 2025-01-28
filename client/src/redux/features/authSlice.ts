// store/authSlice.js
import { UserData } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
    status: boolean;
    userData: UserData | null;
    loading: boolean;
}

const initialState: AuthState = {
    status: false,
    userData: null,
    loading: true,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.status = true;
            state.userData = action.payload;
            state.loading = false;
        },
        logout(state) {
            state.status = false;
            state.userData = null;
            state.loading = false;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
});

export const { login, logout, setLoading } = authSlice.actions;

export const fetchUserData = () => async (dispatch: any) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-user-account-details`, {
            withCredentials: true
        });
        if (response.status === 200 && response.data.success) {
            dispatch(login(response.data.data));
        } else {
            dispatch(logout());
        }
    } catch (error) {
        console.error("Error is fetching data: ", error)
        dispatch(logout());
    }
};

export default authSlice.reducer;
