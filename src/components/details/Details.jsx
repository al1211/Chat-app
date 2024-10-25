import { onAuthStateChanged } from "firebase/auth";
import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/UserStore";
import { useChatStore } from "../../lib/ChatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "@firebase/firestore";

const Details = () => { 
   const {ChatId,user,isCurrentsUserBlocked,  isRecieverBlocked,   changeBlock} = useChatStore();
  
const {  currentUser} = useUserStore();
const handleBlock= async()=>{ 
  if(!user) return; 
  const userDocRef=doc(db,"users",currentUser.id);
try{
await updateDoc(userDocRef,{
  blocked:isRecieverBlocked?arrayRemove(user.id):arrayUnion(user.id),
});
changeBlock()
}catch(err){
  console.log(err);
}
}
  return (
    <div className="details">
      <div className="user">
        <img src={user?.image || "./avatar.png"} alt="" />
        <h2>{user?.name}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="titel">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="titel">
            <span>Privacy % help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="titel">
            <span>Share Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="titel">
            <span>Shared files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="photos">
          <div className="photoItem">
            <div className="photoDetails">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/025/525/161/small/thick-white-smoke-on-a-dark-background-ai-generated-image-photo.jpg"
                alt=""
              />
              <span>photo_2024_2.png</span>
            </div>
            <img src="./download.png" className="icon" />
          </div>
          <div className="photoItem">
            <div className="photoDetails">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/025/525/161/small/thick-white-smoke-on-a-dark-background-ai-generated-image-photo.jpg"
                alt=""
              />
              <span>photo_2024_2.png</span>
            </div>
            <img src="./download.png" className="icon" />
          </div>
          <div className="photoItem">
            <div className="photoDetails">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/025/525/161/small/thick-white-smoke-on-a-dark-background-ai-generated-image-photo.jpg"
                alt=""
              />
              <span>photo_2024_2.png</span>
            </div>
            <img src="./download.png" className="icon" />
          </div>
          <div className="photoItem">
            <div className="photoDetails">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/025/525/161/small/thick-white-smoke-on-a-dark-background-ai-generated-image-photo.jpg"
                alt=""
              />
              <span>photo_2024_2.png</span>
            </div>
            <img src="./download.png" className="icon" />
          </div>
          
        </div>

        <button onClick={handleBlock}>{
          isCurrentsUserBlocked?"You are Blocked":isRecieverBlocked?"User Blocked":"Block User"
          }</button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  );
};

export default Details;
