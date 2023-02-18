import RegisterForm from "../../components/registerForm";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import RegisterBusinessForm from "../../components/registerBusiness";

const Register = () => {
  const router = useRouter();
  const [isPersonal, setIsPersonal] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [showButtons, setshowButtons] = useState(true);

  const onSubmitHandler = async (newUser) => {
    const user = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      email: newUser.email,
      birthDate: newUser.birthDate,
      password: newUser.password,
    };
    try {
      await axios
        .post("http://localhost:8800/api/auth/register", user)
        .then((response) => {
          console.log(response.data);
          router.push('/auth/login')
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const businessSubmitHandler = async (newBusiness) => {
    const business = {
      name: newBusiness.name,
      email: newBusiness.email,
      password: newBusiness.password,
      description: newBusiness.description,
      location: newBusiness.location,
    };
    try {
      await axios
        .post("http://localhost:8800/api/auth/register/business", business)
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex flex-col space-y-10 bg-gray-400 min-h-screen justify-center items-center">
      <p className="text-black text-5xl font-bold">
        {showButtons ? "Journey" : "First step"}
      </p>
      {showButtons && (
        <div className="flex flex-col space-y-10">
          <button
            className="btn-primary"
            onClick={() => {
              setIsPersonal(true);
              setIsBusiness(false);
              setshowButtons(false);
            }}
          >
            Personal Register
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              setIsPersonal(false);
              setIsBusiness(true);
              setshowButtons(false);
            }}
          >
            Business Register
          </button>
        </div>
      )}

      {isPersonal && <RegisterForm onSubmitHandler={onSubmitHandler} />}
      {isBusiness && (
        <RegisterBusinessForm onSubmitHandler={businessSubmitHandler} />
      )}
    </div>
  );
};

export default Register;
