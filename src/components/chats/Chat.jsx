import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../lib/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { useChatStore } from "../../lib/ChatStore";
import { useUserStore } from "../../lib/UserStore";
import upload from "../../lib/Upload";
const Chat = () => {
  const [chat, Setchat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState({
    file: null,
    url: "",
  });
  const endRef = useRef(null);
  const { currentUser } = useUserStore();
  const { ChatId, user ,isCurrentsUserBlocked,  isRecieverBlocked} = useChatStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", ChatId), (res) => {
      Setchat(res.data());
    });
    return () => {
      unSub();
    };
  }, [ChatId]);

  const handleemoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (image.file) {
        imgUrl = await upload(image.file);
      }
      await updateDoc(doc(db, "chats", ChatId), {
        message: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { image: imgUrl }),
        }),
      });
    console.log(image.url)
      const userId = [currentUser.id, user.id];

      userId.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatSnapshot = await getDoc(userChatRef);
        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();

          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === ChatId
          );

          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          // userChatData[chatIndex].lastMessage = text;
          // userChatData[chatIndex].isSeen = id === currentUser.id ? true : false;
          // userChatData[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
    setImage({
      file: null,
      url: "",
    });
    setText("");
    
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.image || "./avatar.png"} alt="" />
          <div className="texts">
            <span>
              {user?.name}
            </span>
              <p>Lorem ipsum dolor sit, amet. </p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.message?.map((messages, i) => (
          <div className={messages.senderId === currentUser?.id ? "message own ": "message"} key={i}>
            <div className="texts">
              {messages.img && <img src={messages.img} alt="" />}
              <p>{messages.text}</p>
              <span>1 min ago</span>
            </div>
          </div>
        ))}
        {image.url && (
          <div className="message own">
            <div className="texts">
              
              <img src={image.url} alt="" />
            </div>
          </div>
          
        )}
        
      </div>
      <div ref={endRef}></div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" onChange={handleImage} />
          </label>
          <input type="file" id="file" style={{ display: "none" }} />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          src="text"
          value={text}
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentsUserBlocked || isRecieverBlocked}
        />

        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen(!open)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleemoji} />
          </div>
          <button className="sendButton" onClick={handleSend} disabled={isCurrentsUserBlocked || isRecieverBlocked}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
