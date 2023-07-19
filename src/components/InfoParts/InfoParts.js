import IMAGES from "../../images";
import "./InfoParts.css";

function InfoParts() {
  return (
    <div>
      <div className="infoPart4">
        <p className="info">Don't have an account?</p>
        <a className="signPart">Sign up</a>
      </div>
      <div className="infoPart5">
        <p className="info">Get the app.</p>
      </div>
      <div className="infoPart6">
        <img src={IMAGES.loginPart2} />
      </div>
    </div>
  );
}

export default InfoParts;
