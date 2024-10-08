import { useEffect, useState } from "react";
import "./ChatList.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/UserStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const ChatList = () => {
  const [changeicon, setCahangeIcon] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
          const items = res.data().chats;

        const promise = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promise);
        console.log(chatData);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);
 
  const changeicons = () => {
    setCahangeIcon(!changeicon);
  };
  return (
    <div className="chatlist">
      <div className="Search">
        <div className="Searchbar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={changeicon ? `./minus.png` : "./plus.png"}
          alt=""
          className="add"
          onClick={changeicons}
        />
      </div>
      {chats.map((chat) => (
        <div className="item" key={chat.id}>
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {changeicon && <AddUser />}
    </div>
  );
};

export default ChatList;
// http://localhost:5173/node_modules/.vite/deps/firebase_firestore.js?v=c5118008