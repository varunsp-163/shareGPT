import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = () => {




  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/" element={<LoginPage />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
