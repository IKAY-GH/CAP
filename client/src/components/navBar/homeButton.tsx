import { useNavigate } from "react-router";
import logoImage from "../../assets/images/5a71058a-208f-4820-963a-69c5f7e0c922.png";

function HomeButton() {
  const navigate = useNavigate();

  function handleclick() {
    navigate("/");
  }
  return (
    <button onClick={handleclick} type="button" className="logo-button">
      <img
        src={logoImage}
        alt="Logo"
        className="logo-image"
        width="40"
        height="40"
      />
    </button>
  );
}

export default HomeButton;
