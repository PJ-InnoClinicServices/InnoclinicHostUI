import React, { useState } from "react";
import { MenuPageCardsList } from "../../../components/MenuPage/MenuPageCardsList";
// @ts-ignore
import HeroImage from "../../../assets/images/Landing-Page-Background.png";
import { Spinner } from "../../Components/Spinner";

export const MenuPage: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (


        <section className="flex flex-col h-[100vh] items-center justify-between relative">
            {loading && (
                <div className="flex items-center justify-center h-screen mt-5">
                    <Spinner loading={true} color="#22c55e" />
                </div>
            )}

            <img
                src={HeroImage}
                className="absolute max-h-full mx-auto opacity-30"
                alt="Menu Background"
                onLoad={handleImageLoad}
                onError={handleImageLoad}
                style={{ display: loading ? "none" : "block" }}
            />

            {!loading && (
                <div className="flex flex-col items-center justify-center h-screen ">
                    <MenuPageCardsList />
                </div>
            )}
        </section>
    );
};
