function Navbar() {
  return (
    <header className="flex justify-between  items-center ">
      <div>
        <p className="font-bold">MyPayTm</p>
      </div>
      <div className="flex gap-4 items-center">
        <p className="font-semibold">Laxman</p>
        <div className="bg-slate-300  rounded-full w-8  h-8 flex items-center justify-center ">
          {" "}
          U
        </div>
      </div>
    </header>
  );
}

export default Navbar;
