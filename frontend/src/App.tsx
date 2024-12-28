import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/page/login/Login";
import Layout from "../src/components/Layout";
import Dashboard from "./test/Dashboard";
import ManagerPage from "./test/ManagerPage";
import PageA from "./test/PageA";
import PageB from "./test/PageB";
import PageC from "./test/PageC";
import PageD from "./test/PageD";
import OrderMain from "./test/OrderMain";
import { NewOrderForm } from "./test/NewOrder";
import Product from "./test/Product"
import Warehouse from "./test/warehouse/Warehouse"
import PageWarehouseCreate from "./test/warehouse/WarehouseCreate";
import PageWarehouseEdit from "./test/warehouse/WarehouseEdit";
import PageCount from "./test/Count/Count";
import PageCountCreate from "./test/Count/CountCreate";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Layout />}>
          <Route path="manager" element={<ManagerPage />} />
          <Route path="page-a" element={<PageA />} />
          <Route path="/page-b/:warehouseID/:shelfID" element={<PageB />} />
          <Route path="/order" element={<OrderMain />} />
          <Route path="/newOrder" element={<NewOrderForm />} />
          <Route path="/product" element={<Product />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/warehouse/create" element={<PageWarehouseCreate />} />
          <Route path="/warehouse/edit/:id" element={<PageWarehouseEdit />} />
          <Route path="/count" element={<PageCount />} />
          <Route path="/count/create" element={<PageCountCreate />} />

        </Route>
        <Route path="/page-c" element={<PageC />} />
        <Route path="/page-d" element={<PageD />} />
      </Routes>
    </Router>
  );
};

export default App;

