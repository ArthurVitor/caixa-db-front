import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";

import  RootPage  from "./components/RootPage";
import { CashierPage } from "./components/cashier/CashierPage";
import { SalePage } from "./components/sale/SalePage";
import { ProductPage } from "./components/product/ProductPage";
import { ItemSellPage } from "./components/itemsell/ItemSellPage";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route path="/caixas" element={<CashierPage />} />
      <Route path="/vendas" element={<SalePage />} />
      <Route path="/produtos" element={<ProductPage />} />
      <Route path="/itemsell" element={<ItemSellPage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
