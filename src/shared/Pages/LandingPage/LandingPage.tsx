import * as React from "react";
import { useState, useEffect } from "react";
import { TopNavbar } from "../../../components/LandingPage/Navbar/TopNavbar";
import { HeroSection } from "../../../components/LandingPage/HeroSection/HeroSection";
// @ts-ignore
import HeroImage from "../../../assets/images/Landing-Page-Background.png";
import { Spinner } from "../../Components/Spinner";


const LandingPage = () => {
    const [loading, setLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState(0);
    const totalImages = 2;

    const handleImageLoad = () => {
        setLoadedImages((prev) => prev + 1);
    };

    useEffect(() => {
        if (loadedImages >= totalImages) {
            setLoading(false);
        }
    }, [loadedImages]);

    return (
        <div className="max-h-screen overflow-y-hidden">
            {loading && (
                <div className="flex items-center justify-center h-screen mt-5">
                    <Spinner loading={true} color="#22c55e" />
                </div>
            )}

            <div className={loading ? "hidden" : ""}>
                <TopNavbar />
                <section className="flex flex-col h-[100vh] items-center justify-between bg relative">
                    <img
                        src={HeroImage}
                        className="absolute max-h-full mx-auto opacity-30 pointer-events-none"
                        alt=""
                        onLoad={handleImageLoad}
                        onError={handleImageLoad}
                        style={{ display: loading ? "none" : "block" }}
                    />
                    <HeroSection onImageLoad={handleImageLoad} />
                </section>
            </div>
        </div>
    );
};

export default LandingPage;