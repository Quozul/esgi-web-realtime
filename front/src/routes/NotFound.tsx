import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="h-[75vh] flex flex-col justify-center items-center gap-8">
      <div className="bg-teal-700 flex flex-col justify-center items-center text-center p-4 rounded-lg shadow">
        <h1 className="text-6xl font-bold text-teal-100 mb-4">404</h1>
        <p className="text-xl font-semibold text-teal-100 mb-8">Page non trouvée</p>
        <p className="text-lg text-teal-100">Oups ! La page que vous cherchez semble ne pas exister.</p>
      </div>
        <Link to="/"
              className="inline-block bg-teal-700 text-teal-100 p-4 rounded-lg shadow hover:bg-teal-800 transition duration-150 ease-in-out">
          Retour à l'accueil
        </Link>
    </main>
  );
}
