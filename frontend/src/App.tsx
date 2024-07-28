import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import "./index.css";
import { IPokemon } from "./models/Pokemon.model";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize currentPage from localStorage or default to 1
    return Number(localStorage.getItem("currentPage")) || 1;
  });
  const [totalPages, setTotalPages] = useState(0);
  const [pageWindow, setPageWindow] = useState<number[]>([]); // Specify the type here

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // This effect ensures the page window is updated when totalPages or currentPage changes
    updatePageWindow(currentPage, totalPages);
  }, [currentPage, totalPages]);

  const fetchPokemons = async (page: number) => {
    console.log("page", page);
    try {
      const response = await fetch(
        `http://localhost:3000/pokemon?page=${page}`
      );
      const data = await response.json();
      setPokemons(data.results);
      setTotalPages(data.totalPages);
      localStorage.setItem("currentPage", page.toString());
    } catch (error) {
      console.error("Failed to fetch pokemons:", error);
    }
  };

  const updatePageWindow = (page: number, totalPages: number) => {
    const windowSize = 10;
    const startPage = Math.floor((page - 1) / windowSize) * windowSize + 1;
    setPageWindow(
      Array.from(
        { length: Math.min(windowSize, totalPages - startPage + 1) },
        (_, i) => startPage + i
      )
    );
  };
  console.log(pokemons);

  return (
    <div className="app">
      <div className="pokemon-grid">
        {pokemons.map((pokemon: IPokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          «« First
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          « Prev
        </button>
        {pageWindow.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage >= totalPages}
        >
          Next »
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage >= totalPages}
        >
          Last »»
        </button>
      </div>
    </div>
  );
};

export default App;
