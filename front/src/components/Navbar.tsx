import { useState } from 'react';
import { FaGithub, FaBars } from 'react-icons/fa6'; // Vérifiez le bon chemin d'import pour les icônes

export const Navbar = () => {
  const currentPath = window.location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="flex flex-row-reverse md:flex-row items-center justify-between py-4 mb-4 max-w-6xl mx-auto px-4 w-full">
      <a href="/" className="text-3xl font-bold z-10 hidden md:block">
        Quizz
      </a>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-20 ml-auto">
        <FaBars />
      </button>
      <div className="flex-1 flex items-center justify-between md:justify-end">
        <div className="md:hidden flex-1"></div>
        <ul className={`hidden md:flex flex-row gap-4 justify-center flex-1`}>
          <li>
            <a href="/" className={currentPath === "/" ? "font-bold" : ""}>
              Home
            </a>
          </li>
          <li>
            <a href="/room-list" className={currentPath === "/room-list" ? "font-bold" : ""}>
              Room list
            </a>
          </li>
          <li>
            <a href="/create-quiz" className={currentPath === "/create-quiz" ? "font-bold" : ""}>
              Create quiz
            </a>
          </li>
        </ul>
        <a href="/" className="hidden border rounded-full border-[#21888e] px-4 py-2 hover:bg-[#21888e] hover:text-[#fff6ec] transition-colors md:flex items-center gap-2">
          <FaGithub />
          GitHub
        </a>
      </div>
      {isMenuOpen && (
        <div
          className={`absolute top-14 right-0 z-20 h-full w-full bg-white p-5 shadow-lg transform ${isMenuOpen ? "menu-enter-active" : "menu-exit-active"} md:hidden`}>
          <ul className="flex flex-col gap-4">
            <li>
              <a href="/" className={currentPath === "/" ? "font-bold" : ""}>
                Home
              </a>
            </li>
            <li>
              <a href="/room-list" className={currentPath === "/room-list" ? "font-bold" : ""}>
                Room list
              </a>
            </li>
            <li>
              <a href="/create-quiz" className={currentPath === "/create-quiz" ? "font-bold" : ""}>
                Create quiz
              </a>
            </li>
          </ul>
        </div>
      )}
      <a href="/" className="text-3xl font-bold z-10 md:hidden absolute left-1/2 transform -translate-x-1/2 top-4">
        Quizz
      </a>
    </nav>
  );
};
