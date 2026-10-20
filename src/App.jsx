import { Route, Routes } from "react-router";
import Layout from "./Components/layout/Layout";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Register/Register";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
