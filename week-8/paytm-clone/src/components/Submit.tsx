
function Submit({label}:{label:string}) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
    >
     {label}
    </button>
  );
}

export default Submit;
