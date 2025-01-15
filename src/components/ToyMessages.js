import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/toys/toysSlice";
import "./ToyMessages.scss";

const ToyMessages = ({ toy }) => {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState("");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleAddMessage = () => {
    if (messageText.trim()) {
      const message = {
        id: `m${Date.now()}`,
        txt: messageText,
        by: {
          _id: user?._id || "u999",
          fullname: user?.fullname || "Guest User",
        },
      };
      dispatch(addMessage({ toyId: toy.id, message }));
      setMessageText("");
    } else {
      alert("Message cannot be empty.");
    }
  };

  return (
    <div className="toy-messages">
      <h3>Messages</h3>
      {toy.messages.length > 0 ? (
        <ul>
          {toy.messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.by.fullname}:</strong> {msg.txt}
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages yet. Be the first to add one!</p>
      )}
      <div className="add-message">
        <input
          type="text"
          placeholder="Write a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={handleAddMessage}>Add Message</button>
      </div>
    </div>
  );
};

export default ToyMessages;
