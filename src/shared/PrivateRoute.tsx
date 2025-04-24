import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store.ts";
import { refreshAccessToken } from "./Services/authService.ts";
import { setAccessToken } from "./store/tokenStore/tokenSlice.ts";
import {Spinner} from "./Components/Spinner.tsx";
import {fetchUser} from "./store/userStore/userSlice.ts";

const PrivateRoute = () => {
    const dispatch = useDispatch<AppDispatch>();
    const accessToken = useSelector((state: RootState) => state.token.accessToken);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const refreshToken = async () => {
            if (isRefreshing) return;

            setIsRefreshing(true);
            try {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    dispatch(setAccessToken(newAccessToken));
                    dispatch(fetchUser());
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
            } finally {
                setLoading(false);
                setIsRefreshing(false);
            }
        };

        if (!accessToken) {
            refreshToken();
        } else {
            setLoading(false);
        }
    }, [accessToken, dispatch, isRefreshing]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner loading={true} />
            </div>
        );
    }

    if (!accessToken) {
        return <Navigate to="/login/sign-in" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
