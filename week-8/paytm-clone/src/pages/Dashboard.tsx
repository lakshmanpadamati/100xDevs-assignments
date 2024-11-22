import  { useState } from "react";
import Contact from "../components/Contact";
interface userType {
  name: string;
  mobile: string | number;
  image?: string;
}
function Dashboard() {
  const [amount, setAmount] = useState<number>(100);
  const AvailableAmount = (amount: number): void => {
    setAmount(amount);
  };
  
  

  
  const users: userType[] = [
    {
      name: "Lakshman",
      mobile: "9898988991",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Lakshman",
      mobile: "9898988992",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Lakshman",
      mobile: "9898988993",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Lakshman",
      mobile: "9898988994",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <section className="px-2  font-black-600   text-gray-800">
      <h1 className="font-semibold text-2xl">
        Available Balance <span>Rs: {amount}</span>
      </h1>
      <div className=" p-4 rounded-md w-2/3">
        <h1 className="text-2xl font-semibold">Users</h1>
        <ul >
          {users.map((user) => {
            return <Contact {...user} />;
          })}
        </ul>
      </div>
    </section>
  );
}

export default Dashboard;
