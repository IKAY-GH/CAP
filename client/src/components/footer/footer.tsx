import "./footer.css";
import { Link } from "react-router";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Cap – Tous droits réservés</p>
      <ul className="footer-links">
        <li>
          <Link to="/mentions-legales">Mentions légales</Link>
        </li>
        <li>
          <Link to="/CGU">CGU</Link>
        </li>
        <li>
          <Link to="/creator">Créatrice</Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
