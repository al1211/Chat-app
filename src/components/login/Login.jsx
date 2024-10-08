import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { auth } from "../../lib/firebase";
import { db } from "../../lib/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";
import upload from "../../lib/Upload";

const Login = () => {
  
  const [loader,setLoader]=useState(false);
  const [image, setImage] = useState({
    file: null,
    url: "",
  });
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleLogin = async(e) => {
    e.preventDefault();
    setLoader(true);
    const data = new FormData(e.target);
    const {email,Password} = Object.fromEntries(data);
   try{
    await signInWithEmailAndPassword(auth,email,Password);
    if(email&& Password){
      toast.success("Succesfully login");
    }
   }catch(err){
         console.log(err);
         toast.error(err.message);
   }finally{
    setLoader(false)
   }




   
   
   
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoader(true);
     const formData=new FormData(e.target);
    
    const {name,email,Password}=Object.fromEntries(formData);
   
    try {
     const res = await createUserWithEmailAndPassword(auth, email, Password);
     const imgURL= await upload(image.file)
     await setDoc(doc(db,"users",res.user.uid),{
       name,
       email,
       image: imgURL,
       id:res.user.uid,
       blocked:[]
      });
      await setDoc(doc(db,"userchats",res.user.uid),{
        chats:[],
       });
      toast.success("Account Created! You Can Login Now");
    } catch (err) {
      console.log(err);
      toast.error(err.message);

      
    }finally{
      setLoader(false)
    }
   
  };
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome,back</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="E-mail" name="email" />
          <input type="password" placeholder="Password" name="Password" />
          <button disabled={loader}>Sing In</button>
        </form>
      </div>
      <div className="seprateline"></div>
      <div className="item">
        <h2>Creat an Account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="file">
            <img src={image.url || "./avatar.png"} alt="" />
            Upload and image{" "}
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <input type="text" placeholder="Name" name="name" />
          <input
            type="text"
            placeholder="E-mail"
            name="email"
           
          />
          <input
            type="password"
            placeholder="Password"
            name="Password"
          
          />
          <button disabled={loader}>{loader?"loading..":"Sing In"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
