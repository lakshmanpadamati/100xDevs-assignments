import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate} from "react-router-dom";
import InputComponent from "../components/InputComponent";
import Submit from "../components/Submit";
import WarningButton from "../components/warningButton";

export interface SigninInterface {
email: string;
  password: string;
}
function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SigninInterface>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong ");
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (err: any) {
      alert(err.message);
      console.log(err);
    }
    console.log("Form Submitted", formData);
  };
  return (
    <section className="flex h-screen justify-center items-center ">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold  text-center">Sign In</h1>
        <p className="text-gray-400 text-center">Enter your details to Login</p>
        <InputComponent
          label="Email"
          formData={formData}
          placeholder="Enter your Email"
          onChange={handleChange}
        />

        {/* Password Field */}
        <InputComponent
          label="Password"
          formData={formData}
          placeholder="Enter your Password"
          onChange={handleChange}
        />

        {/* Submit Button */}
        <Submit label="Sign In" />
        <WarningButton label="Do not have an Account" to="signup" />
      </form>
    </section>
  );
}

export default SignIn;
