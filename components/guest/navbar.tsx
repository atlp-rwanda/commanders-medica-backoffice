import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between py-2 px-5 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <button
          className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <div className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto">
          <a
            className="mb-4 me-5 ms-2 mt-3 flex items-center lg:mb-0 lg:mt-0"
            href="#"
          >
            <img
              src="/favicon-32x32.png"
              loading="lazy"
              className="h-8"
            />
            <span className="font-bold text-lg ms-2 text-primary-500">Medica</span>
          </a>
          <ul className="list-style-none ms-auto flex flex-col ps-0 lg:flex-row">
            <li className="mb-4 lg:mb-0 lg:pe-2">
              <Link
                className="font-semibold text-black/70 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pe-2">
              <a
                className="font-semibold text-black/70 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                href="#"
              >
                Appointments
              </a>
            </li>
            <li className="mb-4 lg:mb-0 lg:pe-2">
              <Link
                className="font-semibold text-primary-600 transition duration-200 hover:text-primary-700 hover:ease-in-out focus:text-primary-700 active:text-primary-700 motion-reduce:transition-none lg:px-2"
                href="/auth/signup"
              >
                Sign up
              </Link>
            </li>
            <li className="mb-4 lg:mb-0 lg:pe-2">
              <Link
                className="font-semibold text-white transition duration-200 hover:ease-in-out bg-primary-600 hover:bg-primary-700  focus:bg-primary-700 active:bg-primary-700 motion-reduce:transition-none text-sm px-5 py-1.5 rounded-lg shadow shadow-primary-400"
                href="/auth/login"
              >
                Log in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
