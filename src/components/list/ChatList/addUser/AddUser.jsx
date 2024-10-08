import "./addUser.css";
import { db } from "../../../../lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../../lib/UserStore";
const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser} = useUserStore();
  const handleSearch = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const username = formdata.get("username");

    try {
      const useref = collection(db, "users");
      const q = query(useref, where("name", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatRef = collection(db, "userchats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        message: [],
      });
   await updateDoc(doc(userChatRef,user.id),{
    chats:arrayUnion({
      chatId:newChatRef.id,
      lastMessage:"",
      recieverId:currentUser.id,
      updatedAt:Date.now(),
    }),
   });
   await updateDoc(doc(userChatRef,currentUser.id),{
    chats:arrayUnion({
      chatId:newChatRef.id,
      lastMessage:"",
      recieverId:user.id,
      updatedAt:Date.now(),
    }),
   });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Name" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="details">
            <img src={user.image || "./avatar.png"} alt="" />
            <span>{user.name}</span>
          </div>
          <button onClick={handleAdd}>add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
