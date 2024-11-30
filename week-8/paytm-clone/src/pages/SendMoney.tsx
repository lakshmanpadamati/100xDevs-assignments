import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function SendMoney() {
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const location = useLocation();
  const [showmodel, setshowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const name = queryParams.get("name");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    try {
      const resp = await fetch(
        "http://localhost:8000/api/v1/account/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ to: userId, amount }),
        }
      );
      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data?.error || "Try again");
      }
      const { message } = await resp.json();
      setMessage(message);
      setshowModal(true);
    } catch (err: any) {
      setError(err.message);
    }
    setSubmitting(false);
  };
  useEffect(() => {
    if (!name || !userId) {
      navigate("/");
    }
  }, [name, userId, navigate]);
  return (
    <section className="flex justify-center items-center">
      {!showmodel && (
        <div
          className={`bg-white p-[30px] rounded-md shadow-custom max-w-[400px] w-full ${
            submitting && "opacity-5"
          }`}
        >
          <div>
            <div className="w-full bg-slate-200 rounded-md text-center">
              {name?.toUpperCase()}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="amount" className="p-0 my-2 text-slate-400">
                Amount
              </label>
              <input
                className="w-full px-3 py-2 text-lg text-center border-2 border-slate-400 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-300 placeholder-italic hover:border-slate-500 transition duration-300 appearance-none"
                placeholder="enter the amount"
                name="amount"
                value={amount || ""}
                type="number"
                min={0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = Number(e.target.value);
                  if (!isNaN(value)) {
                    setAmount(value);
                  }
                  setError(""); // Reset error
                }}
              />

              {error && <div className="text-red-500">{error}</div>}
              <button
                type="submit"
                className="bg-green-600 mt-3 p-2 text-gray-100 rounded-md"
              >
                Send Money
              </button>
            </form>
          </div>
        </div>
      )}
      {showmodel && (
        <div className="h-40 w-96  shadow-md  p-3 flex items-center justify-center text-white rounded-md flex-col bg-blue-900">
          <p className="">{message}</p>
          <Link to="/" className="bg-blue-500 p-2 text-white rounded-md">
            Done
          </Link>
        </div>
      )}
    </section>
  );
}

export default SendMoney;
