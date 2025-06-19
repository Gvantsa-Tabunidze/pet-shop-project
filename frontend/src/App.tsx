import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Aboutus from "./pages/AboutUs";
import PetsLayout from "./layouts/PetsLayout";
import PetDetail from "./pages/PetDetails";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PetsLayout />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"wishlist"} element={<Wishlist />} />
          <Route path={"cart"} element={<Cart />} />
          <Route path={"about"} element={<Aboutus />} />
          <Route path={"pet/:id"} element={<PetDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
