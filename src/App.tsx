import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./shared/store/store.ts";
import "./index.css";
import { LandingPage } from "./shared/Pages/LandingPage/LandingPage.tsx";
import { LoginPage } from "./shared/Pages/LoginPage/LoginPage.tsx";
import { MenuPage } from "./shared/Pages/MenuPage/MenuPage.tsx";
import { NotFoundPage } from "./shared/Pages/NotFoundPage/NotFoundPage.tsx";

import DoctorsPage from "./shared/Pages/DoctorsPage/DoctorsPage.tsx";
import { SettingsPage } from "./shared/Pages/SettingsPage/SettingsPage.tsx";
import PrivateRoute from "./shared/PrivateRoute";
import BookingPage from "./shared/Pages/BookingsPage/BookingPage.tsx";
import {AppointmentPage} from "./shared/Pages/AppointmentPage/AppointmentPage.tsx";
import {AppointmentDetailsForPatient} from "./components/AppointmentsPage/AppointmentDetailsForPatient.tsx";
import {AppointmentDoctor} from "./components/AppointmentsPage/AppointmentDoctor.tsx";



const App = () => (

    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage text="Landing page is working" />} />
                <Route path="/login/sign-in" element={<LoginPage />} />
                <Route path="/login/sign-up" element={<LoginPage />} />
                <Route path="/menu" element={<MenuPage />} />

                <Route element={<PrivateRoute />}>
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/appointments" element={<AppointmentPage />} />
                    <Route path="/appointments/patient/:appointmentId" element={<AppointmentDetailsForPatient />} />
                    <Route path="/appointments/doctor/::appointmentId" element={<AppointmentDoctor />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    </Provider>

);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
