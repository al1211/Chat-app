import { useEffect } from "react";
import Chat from "./components/chats/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/UserStore";
import { useChatStore } from "./lib/ChatStore";

const App = () => {
  const{ currentUser,isLoading,fetchUserInfo}=useUserStore();
  const{ChatId}=useChatStore();
 
  useEffect(()=>{
   const users=onAuthStateChanged(auth,(user)=>{
   fetchUserInfo(user?.uid)
   });
   return ()=>{
    users();
   }
  },[fetchUserInfo]);
 
  if(isLoading) return <div className="loading">Loading...</div>
  return (
    <div className='container'>
      { currentUser?(
        <>
      <List/>
    {ChatId &&<Chat/>}
    {ChatId && <Details/>}
        </>
      ):(<Login/>)}
      <Notification/>
    </div>
  )
}

export default App