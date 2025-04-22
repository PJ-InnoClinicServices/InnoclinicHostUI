import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import {LoginPage} from "./shared/Pages/LoginPage/LoginPage.tsx";
import {MenuPage} from "./shared/Pages/MenuPage/MenuPage.tsx";
import {NotFoundPage} from "./shared/Pages/NotFoundPage/NotFoundPage.tsx";
import {LandingPage} from "./shared/Pages/LandingPage/LandingPage.tsx";
import { store } from "./shared/store/store.ts";
import { Provider } from "react-redux";

const App = () => (

    <Provider store={store}>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login/sign-in" element={<LoginPage />} />
            <Route path="/login/sign-up" element={<LoginPage />} />
            <Route path="/menu" element={<MenuPage />} />

            <Route path="*" element={<NotFoundPage />} />
            </Routes>
    </BrowserRouter>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);