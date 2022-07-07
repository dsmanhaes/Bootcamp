import React from "react";
import { Route, Routes } from "react-router-dom";

import { Dashboard } from "../pages/index";

export const Router: React.FC = () => (
    <Routes>
        <Route path='/' element={<Dashboard />} />
    </Routes>
);
