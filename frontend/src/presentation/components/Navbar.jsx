import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 relative">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          RentDirect
        </Link>

        {/* Botón hamburguesa SIEMPRE visible */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl hover:opacity-80 transition"
          >
            ☰
          </button>

          {/* Dropdown flotante */}
          {isOpen && (
  <div className="absolute right-0 mt-3 w-56 bg-white text-black rounded-xl shadow-xl p-4 flex flex-col gap-3 animate-fadeIn">
    <Link
      to="/"
      onClick={() => setIsOpen(false)}
      className="hover:text-blue-600"
    >
      Inicio
    </Link>

    <Link
      to="/login"
      onClick={() => setIsOpen(false)}
      className="hover:text-blue-600"
    >
      Login
    </Link>

    <Link
      to="/register"
      onClick={() => setIsOpen(false)}
      className="hover:text-blue-600"
    >
      Registro
    </Link>

    <Link
      to="/profile"
      onClick={() => setIsOpen(false)}
      className="hover:text-blue-600"
    >
      Perfil
    </Link>

    {/* Separador */}
    <div className="border-t my-2"></div>

    {/* Botón cerrar sesión */}
    <button
      onClick={() => {
        // aquí luego pondremos la lógica real
        console.log("Cerrar sesión");
        setIsOpen(false);
      }}
      className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-medium"
    >
      Cerrar sesión
    </button>
  </div>
)}
        </div>
      </div>
    </nav>
  );
}