import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex items-stretch justify-center my-12">
      <div className="flex-[3] flex flex-col pt-24">
        <h1 className="text-4xl font-bold mb-8 leading-snug">
          Providing Quality <span className="text-primary-500">Healthcare</span>{" "}
          for a <span className="text-yellow-400">Brighter</span> and{" "}
          <span className="text-yellow-400">Healthy</span> Future
        </h1>
        <h2 className="w-[80%]">
          At our hospital, we are dedicated to providing exceptional medical
          care to our patients and their families. Our experienced team of
          medical professionals, cutting-edge technology, and compassionate
          approach make us a leader in the healthcare industry
        </h2>
        <div className="flex-1"></div>
        <div className="flex items-center">
          <button className="bg-primary-500 px-6 py-2 rounded-lg text-white mr-24">
            Book an appointment
          </button>
          <button className="h-8 flex flex-row items-center justify-center">
            <svg
              width="auto"
              height="auto"
              viewBox="0 0 51 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="25.5" cy="25.5" r="25.5" fill="#246BFD" />
              <path
                d="M34.5 24.634C35.1667 25.0189 35.1667 25.9811 34.5 26.366L21.75 33.7272C21.0833 34.1121 20.25 33.631 20.25 32.8612L20.25 18.1388C20.25 17.369 21.0833 16.8879 21.75 17.2728L34.5 24.634Z"
                fill="white"
              />
            </svg>
            <span className="whitespace-nowrap ml-3 font-bold">Play Video</span>
          </button>
        </div>
      </div>
      <div className="flex-[2]">
        <div className="relative mt-24">
          <div className="max-h-[430px]">
            <svg
              width="auto"
              height="auto"
              viewBox="0 0 481 439"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M343.972 55.9678C376.527 79.4121 405.085 104.204 428.787 134.115C452.49 164.296 471.909 199.597 478.477 238.671C485.046 277.745 478.763 320.322 459.915 358.857C441.353 397.122 404.961 391.332 365.838 406.153C336.238 423.76 292.3 438.966 243.738 438.966C197.95 438.966 168.35 436.565 128.575 418.158C94.35 392.948 38.4067 383.379 17.5598 353.737C-3.57276 324.094 0.139713 279.631 0.425288 235.168C0.710863 190.974 -2.43047 146.511 13.8473 109.324C30.1251 72.1363 65.8219 42.2247 106.374 23.092C146.925 3.95936 192.617 -4.12487 233.74 2.88146C274.863 10.1573 311.416 32.5236 343.972 55.9678Z"
                fill="url(#paint0_linear_6107_20361)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_6107_20361"
                  x1="228.013"
                  y1="131.242"
                  x2="237.364"
                  y2="439.062"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1A71FF" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#FFC02D" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <Image
            src="/images/doctors/doctor-1.png"
            width={344}
            height={344}
            alt="Doctor"
            className="z-10 h-96 absolute bottom-16 right-20 object-contain"
          />

          <div className="z-20 font-semibold text-sm bg-white rounded-lg ring-2 ring-gray-300 px-3 py-1.5 absolute bottom-0 left-[-70px]">
            <p className="text-center mb-1">Our Professionals</p>
            <div className="flex flex-row items-center justify-center relative left-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`col relative`}
                  style={{
                    zIndex: 6 + index,
                    left: index * -10,
                  }}
                >
                  <img
                    src={`/images/doctors/doctor-${index + 1}.png`}
                    alt="Doctor"
                    className="rounded-full w-6 h-6 object-contain"
                  />
                </div>
              ))}
              <div
                className="w-7 h-7 flex items-center justify-center bg-primary-500 rounded-full relative"
                style={{
                  zIndex: 12,
                  left: 6 * -10,
                }}
              >
                <p className="text-white text-xs text-semibold m-0">+30</p>
              </div>
            </div>
          </div>
          <div className="font-semibold text-sm bg-white rounded-lg ring-2 ring-gray-300 px-3 py-1.5 absolute top-6 right-6">
            <span className="font-extrabold text-xl text-primary-500">
              24/7
            </span>
            &nbsp; Service
          </div>
        </div>
      </div>
    </section>
  );
}
