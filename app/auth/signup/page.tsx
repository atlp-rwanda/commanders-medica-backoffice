"use client";
import { useEffect, useRef, useState } from "react";
import { signup } from "../actions";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [filesSelected, setFilesSelected] = useState({
    certificate: false,
    cv: false,
    profileImg: false,
  });

  const certificateFileRef = useRef<HTMLInputElement>(null);
  const cvFileRef = useRef<HTMLInputElement>(null);
  const profileImgFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const certificateFile = certificateFileRef.current;
    const cvFile = cvFileRef.current;
    const profileImgFile = profileImgFileRef.current;

    if (certificateFile && cvFile && profileImgFile) {
      certificateFile.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files?.length && target.files.length > 0) {
          setFilesSelected((prev) => ({ ...prev, certificate: true }));
        }
      });

      cvFile.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files?.length && target.files.length > 0) {
          setFilesSelected((prev) => ({ ...prev, cv: true }));
        }
      });

      profileImgFile.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files?.length && target.files.length > 0) {
          setFilesSelected((prev) => ({ ...prev, profileImg: true }));
        }
      });
    }
  }, []);

  const handleSubmit = (e: FormData) => {
    if (certificateFileRef.current?.files?.length === 0) {
      setError("Please upload your certificate");
      window.scrollTo(0, 0);
      return;
    }

    if (cvFileRef.current?.files?.length === 0) {
      setError("Please upload your CV");
      window.scrollTo(0, 0);
      return;
    }

    if (profileImgFileRef.current?.files?.length === 0) {
      setError("Please upload your profile picture");
      window.scrollTo(0, 0);
      return;
    }

    setError("");
    setPending(true);
    window.setTimeout(() => {
      signup(e)
        .then((res) => {
          if (res?.error) {
            console.log(res.error);
            setError(res.error);
          }
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        })
        .finally(() => {
          setPending(false);
        });
    }, 1);
  };

  const validPassword = (password: string) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(password);
  };

  return (
    <form action={handleSubmit}>
      <div className="flex flex-row border border-primary-500 bg-primary-200 rounded-2xl max-w-[700px] mx-auto">
        <div className="flex flex-col flex-[4] border-r border-primary-500 rounded-2xl bg-white p-6">
          <p className="text-primary-400 text-lg font-bold mb-3">
            Create doctor account
          </p>

          <p aria-live="polite" className="mb-3 text-red-600 font-semibold">
            {error}
          </p>

          <div className="flex flex-col mb-5">
            <label htmlFor="fullname" className="mb-1">
              Full Name:
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              required
              autoFocus
              autoComplete="name"
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="mb-1">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="gender" className="mb-1">
              Gender:
            </label>
            <select
              defaultValue=""
              name="gender"
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
            >
              <option disabled value="">
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="position" className="mb-1">
              Specialization:
            </label>
            <select
              defaultValue=""
              id="position"
              name="position"
              required
              autoComplete="position"
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
            >
              <option disabled value="">Select Specialization</option>
              <option value="Dentist">Dentist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Nutritionist">Nutritionist</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Surgeon">Surgeon</option>
              <option value="Immunologist">Immunologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="hospital" className="mb-1">
              Hospital:
            </label>
            <select
              defaultValue=""
              id="hospital"
              name="hospital"
              required
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
            >
              <option disabled value="">Select a hospital</option>
              <option value="CHUK">CHUK</option>
              <option value="CHUB">CHUB</option>
              <option value="MASAKA Hospital">MASAKA Hospital</option>
              <option value="King FaisaL Hospital">King FaisaL Hospital</option>
              <option value="KIBAGABAGA HOSPITAL ">KIBAGABAGA HOSPITAL </option>
              <option value="Muhima HOSPITAL ">Muhima HOSPITAL </option>
            </select>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="password" className="mb-1">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none font-serif"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                const isValid = validPassword(target.value);
                if (!isValid) {
                  target.setCustomValidity(
                    "Password must contain at least one number, one uppercase and lowercase letter, and at least 6 or more characters"
                  );
                } else {
                  target.setCustomValidity("");
                }
              }}
            />
          </div>
          <div className="flex flex-row mb-5 gap-1 items-center">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button
            className="bg-primary-700 text-white px-5 py-2 rounded-lg mt-5 disabled:bg-primary-400 disabled:cursor-not-allowed"
            disabled={pending}
          >
            {pending ? "Loading..." : "Sign up"}
          </button>
        </div>

        <div className="flex flex-col flex-[3] items-left justify-start py-6 pl-4 pr-6">
          <p className="text-lg font-semibold mb-5">
            Upload required documents
          </p>
          <div className="flex flex-col mb-5">
            <label htmlFor="certificate-file" className="mb-1 font-medium">
              Upload your certificate
            </label>
            <div className="flex max-w-64">
              {filesSelected.certificate &&
                certificateFileRef.current?.files?.[0] && (
                  <span className="text-sm text-gray-500 mb-2 bg-gray-100 p-2 rounded-lg whitespace-nowrap truncate">
                    {certificateFileRef.current?.files?.[0].name}
                  </span>
                )}
            </div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="certificate-file"
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
              >
                <div className="flex flex-col items-center justify-center pt-4 pb-3">
                  <svg
                    className="w-8 h-8 mb-2 text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 26"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  id="certificate-file"
                  name="certificate-file"
                  type="file"
                  className="hidden"
                  ref={certificateFileRef}
                  accept="application/pdf"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="cv-file" className="mb-1 font-medium">
              Upload your CV
            </label>
            <div className="flex max-w-64">
              {filesSelected.certificate && cvFileRef.current?.files?.[0] && (
                <span className="text-sm text-gray-500 mb-2 bg-gray-100 p-2 rounded-lg whitespace-nowrap truncate">
                  {cvFileRef.current?.files?.[0].name}
                </span>
              )}
            </div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="cv-file"
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
              >
                <div className="flex flex-col items-center justify-center pt-4 pb-3">
                  <svg
                    className="w-8 h-8 mb-2 text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 26"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  id="cv-file"
                  name="cv-file"
                  type="file"
                  className="hidden"
                  ref={cvFileRef}
                  accept="application/pdf"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="profile-img-file" className="mb-1 font-medium">
              Upload your profile picture
            </label>
            {filesSelected.profileImg &&
              profileImgFileRef.current?.files?.[0] && (
                <img
                  src={URL.createObjectURL(
                    profileImgFileRef.current?.files?.[0]
                  )}
                  alt="Profile"
                  className="w-10 h-10 object-contain rounded-lg my-3"
                />
              )}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="profile-img-file"
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
              >
                <div className="flex flex-col items-center justify-center pt-4 pb-3">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  id="profile-img-file"
                  name="profile-img-file"
                  type="file"
                  className="hidden"
                  ref={profileImgFileRef}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
