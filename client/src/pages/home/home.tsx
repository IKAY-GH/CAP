import "./home.css";

function Home() {
  function handleClick() {}
  return (
    <main className="accueil-container">
      <h1>
        CAP<span className="exclamation-mark">!</span>
      </h1>
      <button className="btn-start" onClick={handleClick} type="button">
        Recherche
      </button>
    </main>
  );
}

export default Home;
