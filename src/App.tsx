import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";

import { RootPage } from "./components/RootPage";
import { CashierPage } from "./components/CashierPage";
import { SalePage } from "./components/SalePage";
import { ProductPage } from "./pages/product/ProductPage";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route path="/caixas" element={<CashierPage />} />
      <Route path="/vendas" element={<SalePage />} />
      <Route path="/produtos" element={<ProductPage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
