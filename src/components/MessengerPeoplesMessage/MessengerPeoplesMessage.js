import { useDispatch, useSelector } from "react-redux";
import "./MessengerPeoplesMessage.css";
import {
  selectMessages,
  toggleActiveUser,
} from "../../store/slices/messages/messagesSlice";

function MessengerPeoplesMessage({ name, active, img, id }) {
  const { activeUserId } = useSelector(selectMessages);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(toggleActiveUser(id))}
      className="Messenger-left-col-people-message"
      style={{
        backgroundColor: id === activeUserId ? "lightgray" : "white",
      }}
    >
      <div className="Messsage-img">
        <img src={img} alt="" />
      </div>
      <div className="Message-info">
        <p>{name}</p>
        <p>{active}</p>
      </div>
    </div>
  );
}

export default MessengerPeoplesMessage;
