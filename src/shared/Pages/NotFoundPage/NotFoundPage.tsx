import { Link } from "react-router-dom";
import { BackgroundWithSpinner } from "../../Components/BackgroundWithSpinner";

export const NotFoundPage = () => {
    return (
        <BackgroundWithSpinner>
            <div className="h-fit my-auto p-20 rounded-full flex flex-col items-center justify-center text-center backdrop-blur-md w-fit">
                <h1 className="text-6xl font-bold text-green-500">404</h1>
                <p className="text-xl font-semibold mt-2">Oops! You got lost...</p>
                <Link to="/" className="mt-4 text-green-500 underline italic">
                    Go back home
                </Link>
            </div>
        </BackgroundWithSpinner>
    );
};
