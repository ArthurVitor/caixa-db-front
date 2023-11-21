import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";

import  RootPage  from "./components/RootPage";
import { CashierPage } from "./components/cashier/CashierPage";
import { SalesPage } from "./components/sale/SalesPage";
import { ProductPage } from "./components/product/ProductPage";
import { ItemSellPage } from "./components/itemsell/ItemSellPage";

import "./App.css";
import SalePage from "./components/sale/SalePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route path="/caixas" element={<CashierPage />} />
      <Route path="/vendas" element={<SalesPage />} />
      <Route path="/vendas/:id" element={<SalePage />} />
      <Route path="/produtos" element={<ProductPage />} />
      <Route path="/itemsell" element={<ItemSellPage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
