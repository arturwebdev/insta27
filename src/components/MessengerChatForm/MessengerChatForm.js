import "./MessengerChatForm.css";
import IMAGES from "../../images";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../../store/slices/users/userSlice";
import { addMessages } from "../../store/slices/messages/messagesSlice";

function MessengerChatForm() {
  const { currentUser } = useSelector(selectUsers);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = formRef.current[0].value;
    console.log(currentUser);
    dispatch(
      addMessages({
        fromId: currentUser.id,
        text,
      })
    );
    formRef.current.reset();
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="Chat-input">
        <label>
          <input type="text" placeholder="Message..." />
          <input style={{ display: "none" }} type="submit" />
          <img src={IMAGES.like} alt="" />
        </label>
      </div>
    </form>
  );
}

export default MessengerChatForm;
