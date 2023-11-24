import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from "react-router-dom";

import  RootPage  from "./components/RootPage";
import { CashierPage } from "./components/cashier/CashierPage";
import { SalesPage } from "./components/sale/SalesPage";
import { ProductPage } from "./components/product/ProductPage";
import { ItemSellPage } from "./components/itemsell/ItemSellPage";

import "./App.css";

import ViewSalesDetailsPage from "./components/sale/ViewSalesDetailsPage";
import CreateProductPage from "./components/product/CreateProductPage";
import CreateSalePage from "./components/sale/CreateSalePage";
import CashierDetailsPage from "./components/cashier/CashierDetailsPage";
import EditProductPage from "./components/product/EditProductPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route path="/" element={<Navigate to="/caixas" />}></Route>
      <Route path="*" element={<Navigate to="/caixas" />}></Route>
      <Route path="/caixas/:parametroBooleano" element={<CashierPage />} />
      <Route path="/caixas" element={<CashierPage />} />
      <Route path="/caixas/:parametroBooleano/:id" element={<CashierDetailsPage />} />
      <Route path="/vendas" element={<SalesPage />} />
      <Route path="/vendas/:id" element={<ViewSalesDetailsPage />} />
      <Route path="/vendas/:id/criar-venda" element={<CreateSalePage />} />
      <Route path="/produtos" element={<ProductPage />} />
      <Route path="/produtos/criar-produto" element={<CreateProductPage />} />
      <Route path="/produtos/editar-produto/:id" element={<EditProductPage />} />
      <Route path="/itemsell" element={<ItemSellPage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
