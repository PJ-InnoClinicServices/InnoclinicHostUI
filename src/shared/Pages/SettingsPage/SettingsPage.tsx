import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../store/store";
import { fetchUser } from "../../store/userStore/userSlice";
import { Spinner } from "../../Components/Spinner.tsx";
import { EditUserForm } from "../../../components/SettingsPage/EditUserForm.tsx";
// @ts-ignore
import HeroImage from "../../../assets/images/Landing-Page-Background.png";

export const SettingsPage = () => {
    const dispatch = useDispatch<AppDispatch>();


    const user = useSelector((state: RootState) => state.user.user);
    const isUserLoading = useSelector((state: RootState) => state.user.loading);
    const error = useSelector((state: RootState) => state.user.error);


    const [isImageLoading, setIsImageLoading] = useState(true);

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const handleUpdateUser = (updatedUser: { id: string; username: string; email: string }) => {
        console.log(updatedUser);
    };

    return (
        <section className="flex flex-col h-[100vh] items-center justify-between relative">

            {(isUserLoading || isImageLoading) && (
                <div className="flex items-center justify-center h-screen mt-5">
                    <Spinner loading={true} color="#22c55e" />
                </div>
            )}


            <img
                src={HeroImage}
                className="absolute max-h-full mx-auto opacity-30 pointer-events-none"
                alt="Menu Background"
                onLoad={handleImageLoad}
                onError={handleImageLoad}
                style={{ display: isImageLoading ? "none" : "block" }}
            />


            {!isImageLoading && (
                <div className="relative p-20 text-xl min-h-screen">
                    <h2 className="text-2xl font-bold mb-4 text-center">User Settings</h2>


                    {isUserLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
                            <Spinner loading={true} />
                        </div>
                    )}


                    {!isUserLoading && error && (
                        <p className="text-red-500">Error: {error}</p>
                    )}


                    {!isUserLoading && user && (
                        <EditUserForm
                            user={{
                                id: user.id,
                                username: user.userName,
                                email: user.email
                            }}
                            updateUser={handleUpdateUser}
                        />
                    )}


                    {!isUserLoading && !user && !error && (
                        <p className="text-red-500">User not logged in</p>
                    )}
                </div>
            )}
        </section>
    );
};
