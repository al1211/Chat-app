import { useUserStore } from "../../../lib/UserStore";
import "./userinfo.css"

const UserInfo = () => {
  const{ currentUser}=useUserStore();


  return (
    <div className="userinfo">
        <div className="user">
            <img src={currentUser.image || "./avatar.png"} alt=""/>
            <h2>{currentUser.name}</h2>
        </div>
        <div className="icons">
            <img src="./more.png" alt=""/>
            <img src="./video.png" alt=""/>
            <img src="./edit.png" alt=""/>
        </div>
    </div>
  )
}

export default UserInfo