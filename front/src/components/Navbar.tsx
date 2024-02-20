import { useState } from 'react';
import { FaGithub, FaBars } from 'react-icons/fa6'; // Vérifiez le bon chemin d'import pour les icônes
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const currentPath = window.location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="flex flex-row-reverse md:flex-row items-center justify-between mb-4 mx-auto p-4 md:px-0 w-full container">
      <Link to="/" className="text-3xl font-bold z-10 hidden md:block">
        Quizz
      </Link>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-20 ml-auto">
        <FaBars />
      </button>
      <div className="flex-1 flex items-center justify-between md:justify-end">
        <div className="md:hidden flex-1"></div>
        <ul className={`hidden md:flex flex-row gap-4 justify-center flex-1`}>
          <li>
            <Link to="/" className={currentPath === "/" ? "font-bold" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/room-list" className={currentPath === "/room-list" ? "font-bold" : ""}>
              Room list
            </Link>
          </li>
          <li>
            <Link to="/create-quiz" className={currentPath === "/create-quiz" ? "font-bold" : ""}>
              Create quiz
            </Link>
          </li>
        </ul>
        <Link to="/" className="hidden border rounded-full border-custom-secondary px-4 py-2 hover:bg-custom-secondary hover:text-custom-tertiary transition-colors md:flex items-center gap-2">
          <FaGithub />
          GitHub
        </Link>
      </div>
      {isMenuOpen && (
        <div
          className={`absolute top-14 right-0 z-20 h-full w-full bg-white p-5 shadow-lg transform ${isMenuOpen ? "menu-enter-active" : "menu-exit-active"} md:hidden`}>
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/" className={currentPath === "/" ? "font-bold" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/room-list" className={currentPath === "/room-list" ? "font-bold" : ""}>
                Room list
              </Link>
            </li>
            <li>
              <Link to="/create-quiz" className={currentPath === "/create-quiz" ? "font-bold" : ""}>
                Create quiz
              </Link>
            </li>
          </ul>
        </div>
      )}
      <Link to="/" className="text-3xl font-bold z-10 md:hidden absolute left-1/2 transform -translate-x-1/2 top-4">
        Quizz
      </Link>
    </nav>
  );
};
