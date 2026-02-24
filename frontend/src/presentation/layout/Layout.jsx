import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}