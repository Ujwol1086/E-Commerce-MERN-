import { Outlet } from "react-router-dom";
import Navigation from "./Pages/Auth/Navigation";
import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );
  return (
    <>
      <Navigation userInfo={userInfo} />
      <main className="ml-20">
        <Outlet context={{ setUserInfo }} />
      </main>
    </>
  );
}

export default App;
