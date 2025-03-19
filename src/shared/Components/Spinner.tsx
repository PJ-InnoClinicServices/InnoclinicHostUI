import React from "react";
import { HashLoader } from "react-spinners";

type Props = {
    loading: boolean;
    color?: string;
};

export const Spinner: React.FC<Props> = ({ loading, color = "#22c55e" }) => {
    return (
        <div className="flex items-center justify-center">
            <HashLoader
                color={color}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};
