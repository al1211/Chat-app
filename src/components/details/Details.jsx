import { onAuthStateChanged } from "firebase/auth";
import "./detail.css";
import { auth } from "../../lib/firebase";

const Details = () => {
  return (
    <div className="details">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Anil Kumar</h2>
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

        <button>Block User</button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  );
};

export default Details;
