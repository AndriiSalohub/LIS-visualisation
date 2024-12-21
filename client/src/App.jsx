import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Homepage /> */}
    </>
  );
};

export default App;
