import { useEffect, useState } from "react";
import "./ChatList.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/UserStore";

import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/ChatStore";

const ChatList = () => {
  const [changeicon, setCahangeIcon] = useState(false);
  const [chats, setChats] = useState([]);
  const [input,setInput]=useState("");
  const { currentUser } = useUserStore();
  const { changeChat  } = useChatStore();
  // useEffect(() => {
  //   const unSub = onSnapshot(
  //     doc(db, "userchats", currentUser.id),
  //     async (res) => {
  //         const items = res.data().chats;

  //       const promises = items.map(async(item) => {
  //         const userDocRef = doc(db, "users", item.receiverId);
  //         const userDocSnap = await getDoc(userDocRef);
  //         const user = userDocSnap.data();
  //         return { ...item, user };
  //       });
  //       const chatData = await Promise.all(promises);
       
  //       setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
  //     }
  //   );

  //   return () => {
  //     unSub();
  //   };
  // }, [currentUser.id]);
  useEffect(() => {
    if (!currentUser) return;
  
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data()?.chats || [];
  
        try {
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.
              recieverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap.data();
            return { ...item, user };
          });
  
          const chatData = await Promise.all(promises);
          setChats(chatData.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
        } catch (error) {
          console.error("Error fetching chats: ", error);
        }
      }
    );
  
    return () => {
      unSub();
    };
  }, [currentUser]);
  
 
  const changeicons = () => {
    setCahangeIcon(!changeicon);
  };

  const handleSelect= async(chat)=>{
   
const userChats=chats.map((item)=>{ 
  const {user,...rest}=item;
  return rest;
});
const chatIndex=userChats.findIndex(item=>item.chatId===chat.chatId)
userChats[chatIndex].isSeen=true;

const userChatsRef=doc(db,"userchats",currentUser.id);
try{
await updateDoc(userChatsRef,{
  chats:userChats,
})
changeChat(chat.chatId,chat.user);
}catch(err){
console.log(err);
}

}
const filtedChat=chats.filter(c=>c.user.name.toLowerCase().includes(input.toLowerCase()));
  return (
    <div className="chatlist">
      <div className="Search">
        <div className="Searchbar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search"  onChange={(e)=>setInput(e.target.value)}/>
        </div>
        <img
          src={changeicon ? `./minus.png` : "./plus.png"}
          alt=""
          className="add"
          onClick={changeicons}
        />
      </div>
      {filtedChat.map((chat,i) => (
        <div className="item" key={i} onClick={()=>handleSelect(chat)} style={{
          backgroundColor:chat?.isSeen?"transparent":"#5183fe"
        }}>
          <img src={chat.user.image || "./avatar.png" } alt="" />
          <div className="texts">
            <span>{chat.user.name}</span>
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