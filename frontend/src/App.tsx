import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { Router } from "./routes/index";

export const App = () => (
  <>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </>
);
