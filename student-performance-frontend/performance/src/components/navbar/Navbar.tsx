import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Student Performance
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-400 transition">
            Turmas
          </Link>
          <Link
            to="/cadastrar-aluno"
            className="hover:text-gray-400 transition"
          >
            Cadastrar Aluno
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
