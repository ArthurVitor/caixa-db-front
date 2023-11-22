import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";

import  RootPage  from "./components/RootPage";
import { CashierPage } from "./components/cashier/CashierPage";
import { SalesPage } from "./components/sale/SalesPage";
import { ProductPage } from "./components/product/ProductPage";
import { ItemSellPage } from "./components/itemsell/ItemSellPage";

import "./App.css";
import CreateProductPage from "./components/product/CreateProductPage";
import CreateSalePage from "./components/sale/create/CreateSalePage";
import CashierDetailsPage from "./components/cashier/CashierDetailsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route path="/caixas" element={<CashierPage />} />
      <Route path="/caixas/:id" element={<CashierDetailsPage />} />
      <Route path="/vendas" element={<SalesPage />} />
      <Route path="/vendas/:id/criar-venda" element={<CreateSalePage />} />
      <Route path="/produtos" element={<ProductPage />} />
      <Route path="/produtos/criar-produto" element={<CreateProductPage />} />
      <Route path="/itemsell" element={<ItemSellPage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
