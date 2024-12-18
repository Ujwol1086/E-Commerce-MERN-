import { Outlet } from "react-router-dom";
import Navigation from "./Pages/Auth/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <main className="ml-20">
        <Outlet />
      </main>
    </>
  );
}

export default App;
