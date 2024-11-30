import  { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import Submit from "../components/Submit";
import WarningButton from "../components/warningButton";
export interface SignUpInterface {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpInterface>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(formData)
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <section className="flex  justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold  text-center">Sign Up</h1>
        <p className="text-gray-400 text-center">
          Enter your details to signup
        </p>

       
        <InputComponent
          label="Email"
          formData={formData}
          placeholder="Enter your Email"
          onChange={handleChange}
        />
        <InputComponent
          label="Password"
          formData={formData}
          placeholder="Enter your Password"
          onChange={handleChange}
        />
        <InputComponent
          label="Firstname"
          formData={formData}
          placeholder="Enter your Firstname"
          onChange={handleChange}
        />

        <InputComponent
          label="Lastname"
          formData={formData}
          placeholder="Enter your Lastname"
          onChange={handleChange}
        />
        <Submit label="Sign Up" />
       <WarningButton label="Already have an Account" to="signin"/>
      </form>
    </section>
  );
}

export default SignUp;
