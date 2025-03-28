import { MenuPageCardsList } from "../../../components/MenuPage/MenuPageCardsList";
import { BackgroundWithSpinner } from "../../Components/BackgroundWithSpinner.tsx";

export const MenuPage = () => {
    return (
        <BackgroundWithSpinner>
            <MenuPageCardsList />
        </BackgroundWithSpinner>
    );
};