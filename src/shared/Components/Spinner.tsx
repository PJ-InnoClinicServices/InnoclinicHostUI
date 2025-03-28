import { HashLoader } from "react-spinners";

type SpinnerProps = {
    loading: boolean;
    color?: string;
};

export const Spinner = ({ loading, color = "#22c55e" }: SpinnerProps) => {
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
