"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import store, { AppDispatch } from "../store/store";
import { fetchUserData } from "../features/authSlice";

interface ReduxProviderProps {
    children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

const FetchUserData: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return null;
};

export default function AppProvider({ children }: ReduxProviderProps) {
    return (
        <ReduxProvider>
            <FetchUserData />
            {children}
        </ReduxProvider>
    );
}
