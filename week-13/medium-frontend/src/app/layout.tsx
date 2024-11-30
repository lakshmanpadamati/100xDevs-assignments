"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <html>
      <body className="flex min-h-screen flex-col  justify-center  items-center">
        <div className="flex justify-between p-2 px-5 items-center border-b w-full ">
          <div className="flex gap-3 items-center">
            <div className="font-extrabold text-3xl">Medium</div>
            <div className="flex gap-2  items-center p-1 bg-gray-100 rounded-full">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <div>
                <input
                  placeholder="search"
                  className="outline:none border-none bg-gray-100 focus:outline-none p-1 font-light rounded-full"
                ></input>
              </div>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="flex items-center">
              {pathname !== "/new-story" ? (
                <Link href="/new-story">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Link>
              ) : (
                <Link
                  href="/"
                  className="bg-green-700 text-white rounded-full p-1"
                >
                  <p className="text-sm">Publish</p>
                </Link>
              )}
            </div>{" "}
            <div className="h-4 w-4 flex items-center justify-center p-4 rounded-full bg-green-800 text-white">
              U
            </div>
          </div>
        </div>
        <section className="  flex-grow w-2/3 ">{children}</section>
      </body>
    </html>
  );
};
export default Layout;
