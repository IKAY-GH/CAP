import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import HomeButton from "./homeButton";
import "./navigation.css";

function Navigation() {
  const [openMenu, setOpenMenu] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const animationClose = () => {
      if (!openMenu || closeMenu) return;

      setCloseMenu(true);
      setOpenMenu(false);
      setCloseMenu(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        animationClose();
      }
    };
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu, closeMenu]);

  useEffect(() => {
    const closeMenuAvecAnimation = () => {
      if (!openMenu || closeMenu) return;

      setCloseMenu(true);
      setOpenMenu(false);
      setCloseMenu(false);
    };

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenuAvecAnimation();
      }
    }
    if (openMenu) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu, closeMenu]);

  return (
    <>
      <nav className="menu-nav" ref={menuRef}>
        <HomeButton />
        {openMenu && (
          <ul className="links">
            <li>
              <Link to={"/log_in"}>Connexion</Link>
            </li>
            <li>
              <Link to={"/sign_up"}>Inscription</Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setCloseMenu(true);
                  setOpenMenu(false);
                }}
                to="/advanced_search"
              >
                Recherche avancée
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setCloseMenu(true);
                  setOpenMenu(false);
                }}
                to="/a_propos"
              >
                A propos
              </Link>
            </li>
          </ul>
        )}
        <button
          ref={btnRef}
          type="button"
          className="floating-btn"
          onClick={() => setOpenMenu((prev) => !prev)}
          aria-label={openMenu ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32"
            />
          </svg>
        </button>
      </nav>
    </>
  );
}

export default Navigation;
