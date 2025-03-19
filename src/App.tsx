import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import {LandingPage} from "./shared/Pages/LandingPage/LandingPage.tsx";
import {LoginPage} from "./shared/Pages/LoginPage/LoginPage.tsx";
import {MenuPage} from "./shared/Pages/MenuPage/MenuPage.tsx";
import {NotFoundPage} from "./shared/Pages/NotFoundPage/NotFoundPage.tsx";


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage text="Landing page is working" />} />
            <Route path="/login/sign-in" element={<LoginPage />} />
            <Route path="/login/sign-up" element={<LoginPage />} />
            <Route path="/menu" element={<MenuPage />} />

            <Route path="*" element={<NotFoundPage />} />
            </Routes>
    </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);