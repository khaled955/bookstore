import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div className="h-screen">
      <Navbar/>
     <div className="py-24 min-h-[53%] container mx-auto">
<Outlet></Outlet>   

  </div>
  <Footer/>
    </div>
  )
}

