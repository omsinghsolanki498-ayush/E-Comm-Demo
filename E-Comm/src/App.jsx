import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Pages
import Register from "./createuser/Register";
import Login from "./createuser/login";
import Dashboard from "./Main/Dashboard";
import AddCart from "./Main/AddCart";
import Payment from "./Main/Payment";
import Checkout from "./Main/Checkout";

// Protected Routes
import Protected from "./Protected/Protecte";
import AdminProtected from "./Adminn/Adminnproteceted";

// Admin Pages
import Admin from "./Adminn/Admin";
import Product from "./Adminn/Product";
import Reveanue from "./Adminn/Reveanue";

// Other Pages
import About from "./component/About";
import Contact from "./component/Contat";

// New Home/Dashboard
import OneDashboard from "./newMain/OneDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= HOME ================= */}
        <Route
          path="/"
          element={<OneDashboard />}
        />

        {/* ================= AUTH ================= */}
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ================= USER PAGES ================= */}

        <Route
          path="/AddCart/:id"
          element={<AddCart />}
        />

        <Route
          path="/About"
          element={<About />}
        />

        <Route
          path="/Contact"
          element={<Contact />}
        />

        {/* ================= CHECKOUT ================= */}

        <Route
          path="/checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>
          }
        />

        {/* ================= PAYMENT ================= */}

        <Route
          path="/payment"
          element={
            <Protected>
              <Payment />
            </Protected>
          }
        />

        {/* ================= USER DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />

        {/* ================================================= */}
        {/*                    ADMIN ROUTES                   */}
        {/* ================================================= */}

        {/* Admin Home */}
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <Admin />
            </AdminProtected>
          }
        />

        {/* Admin Revenue */}
        <Route
          path="/admin/revenue"
          element={
            <AdminProtected>
              <Reveanue />
            </AdminProtected>
          }
        />

        {/* Admin Products */}
        <Route
          path="/admin/products"
          element={
            <AdminProtected>
              <Product />
            </AdminProtected>
          }
        />

       

      </Routes>
    </BrowserRouter>
  );
}

export default App;