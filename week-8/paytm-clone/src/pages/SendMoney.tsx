import { useCallback, useEffect, useMemo, useState } from "react";
import { replace, useLocation, useNavigate, useParams } from "react-router-dom";

interface userType {
  name: string;
  mobile: string;
  image?:string
}
function SendMoney() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mobilenumber } = useParams();
  const [receiver, setReceiver] = useState<userType | null>(null);
  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        if(!mobilenumber)navigate("/")
        const token=localStorage.getItem("token")

        const response = await fetch(
          `http://localhost:8000/receiver/${mobilenumber}`,{
            method:"GET",
            headers:{
             'Content-Type':"application/json",
             'Authorization':`Bearer ${token}` 
            }
          }
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error);
        }
        const user = await response.json();
        setReceiver(user);
      } catch (err) {
        // navigate("/");
        setError("something went wrong")
      }
    };
    // setReceiver({ name: "lakshman", mobile: mobilenumber });
    fetchReceiver();
  }, []);

 
  return (
    <section className="flex justify-center">
      <div className="bg-white p-[30px] rounded-md shadow-custom max-w-[400px] w-full">
       <div>
        <div ><img src={receiver?.image &&undefined}/></div>
       </div>
      </div>
    </section>
  );
}

export default SendMoney;
