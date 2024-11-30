import React from "react";
import { SignUpInterface } from "../pages/Signup";
import { SigninInterface } from "../pages/signin";
interface InputInterface {
  label: string;
  formData: SignUpInterface | SigninInterface;
  placeholder: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputComponent = React.memo(
  ({ label, formData, placeholder, onChange }: InputInterface) => {
    const field = label.toLowerCase();
    return (
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor={field}>
          {label}
        </label>
        <input
          type={
            field === "password"
              ? "password"
              : field === "email"
              ? "email"
              : "text"
          }
          id={field}
          name={field}
          value={
            field in formData ? formData[field as keyof typeof formData] : ""
          }
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>
    );
  }
);

export default InputComponent;
