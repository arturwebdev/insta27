import React, { useEffect, useRef } from "react";
import "./Login.css";
import IMAGES from "../../images";
import { useDispatch, useSelector } from "react-redux";
import LoginFooter from "../LoginFooter/LoginFooter";

import LoginPart from "../LoginPart/LoginPart";
import Form from "../Form/Form";
import InfoParts from "../InfoParts/InfoParts";
import { selectUsers } from "../../store/slices/users/userSlice";
import { fetchUsers } from "../../store/slices/users/usersAPI";
function Login() {
  const dispatch = useDispatch();

  const { usersData } = useSelector(selectUsers);

  useEffect(() => {
    if (!usersData.length) {
      dispatch(fetchUsers());
    }
  }, []);

  return (
    <div className="formContainer">
      <div className="flexDiv">
        <LoginPart />
        <div>
          <Form />
          <InfoParts />
        </div>
      </div>
      <LoginFooter />
    </div>
  );
}

export default Login;
