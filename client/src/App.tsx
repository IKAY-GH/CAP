import "./assets/styles/global.css";
import { Outlet } from "react-router";
import Footer from "./components/footer/footer.tsx";
import Navigation from "./components/navBar/navigation.tsx";

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
