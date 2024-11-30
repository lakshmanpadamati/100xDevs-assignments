import { useEffect, useState } from "react";
import Contact from "../components/Contact";

interface contactInterface {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
}
function Dashboard() {
  const [contacts, setContacts] = useState<contactInterface[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [filter, setFilter] = useState<string>("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/user/bulk?filter=${filter}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(
            data.error || "Fetching users failed! Reload the page again."
          );
        }
        const data = await response.json();
        setContacts(data.users);
      } catch (err: any) {
        alert(err.message || "Something went wrong while fetching users.");
      }
    };
    const debounce = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(debounce);
  }, [filter]);
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(
            data.error || "Unable to fetch amount! Reload the page again."
          );
        }
        const data = await response.json();
        setBalance(data.balance);
      } catch (err: any) {
        alert(err.message || "Something went wrong while fetching balance.");
      }
    };
    fetchBalance();
  }, []);
  return (
    <section className="px-2  font-black-600   text-gray-800">
      <h1 className="font-semibold text-2xl">
        Available Balance <span>Rs: {balance}</span>
      </h1>
      <div className=" p-4 rounded-md w-2/3">
        <h1 className="text-2xl font-semibold">Users</h1>
        <input
          type="text"
          placeholder="search users"
          value={filter}
          className="p-2 focus:outline-none w-full focus:ring ring-blue-400 rounded-md"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />

        <ul>
          {contacts && contacts.length > 0 ? (
            contacts.map((contact) => (
              <Contact {...contact} key={contact._id} />
            ))
          ) : (
            <p className="text-red-500">No users found</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Dashboard;
