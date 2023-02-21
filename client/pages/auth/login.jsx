import axios from "axios";
import LoginUser from "../../components/loginUser";
import { useRouter } from "next/router";
import { useState } from "react";
import BusinessLogin from "../../components/loginBusiness";

const Login = () => {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [showButtons,setshowButtons]=useState(true);
  const loginHandler = async (loginCredentials) => {
    try {
      await axios
        .post("http://localhost:8800/api/auth/login/user", loginCredentials)
        .then((response) => {
          console.log(response.data);
          router.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };
  const businessLoginHandler = async (loginCredentials) => {
    try {
      await axios
        .post("http://localhost:8800/api/auth/login/business", loginCredentials)
        .then((response) => {
          console.log(response.data);
          router.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-gray-400 ">
      {showButtons&&<> <button className="btn-primary"
        onClick={() => {
          setIsUser(true);
          setIsBusiness(false);
          setshowButtons(false);
        }}
      >
        User login
      </button>
      <button className="btn-primary"
        onClick={() => {
          setIsUser(false);
          setIsBusiness(true);
          setshowButtons(false);
        }}
      >
        Business login
      </button></>}
     
      {isUser && <LoginUser submitHandler={loginHandler} />}
      {isBusiness && <BusinessLogin submitHandler={businessLoginHandler} />}
    </div>
  );
};

export default Login;
