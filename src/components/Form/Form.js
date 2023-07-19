import { useEffect, useRef } from "react";
import "./Form.css";
import IMAGES from "../../images";
import { useDispatch, useSelector } from "react-redux";
import { logIn, selectUsers } from "../../store/slices/users/userSlice";
import { useNavigate } from "react-router-dom";

function Form() {
  const { currentUser } = useSelector(selectUsers);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [{ value: username }, { value: password }] = formRef.current;

    dispatch(logIn({ username, password }));

    formRef.current.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form">
      <img src={IMAGES.logo} className="logoImg" />
      <input
        defaultValue={"bret"}
        placeholder="Phone number,username, or email"
        className="input"
      />
      <input
        defaultValue={"gwenborough"}
        placeholder="Password"
        className="input"
      />
      <button className="loginBtn" type="submit">
        Log in
      </button>
      <div className="logPart">
        <span className="line"></span>
        <p className="loginPart">OR</p>
        <span className="line"></span>
      </div>
      <span className="loginPart2">
        <img
          className="fbIcon"
          src="https://e7.pngegg.com/pngimages/106/850/png-clipart-facebook-icon-logo-blue-square-symbol-social-facebook-blue-rectangle.png"
        />
        Log in with Facebook
      </span>
      <p className="loginPart3">Forgot password?</p>
    </form>
  );
}

export default Form;
