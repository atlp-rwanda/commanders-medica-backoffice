export default function ProvidedServices() {
  const services = [
    {
      title: "Dental Treatment",
      description:
        "We offer a wide range of dental services, including routine check-ups, cleanings, and fillings.",
      image: "/images/services/dental.png",
    },
    {
      title: "Bones Treatment",
      description:
        "We provide a wide range of orthopedic services, including treatment for fractures, sprains, and strains.",
      image: "/images/services/bones.png",
    },
    {
      title: "Diagnosis",
      description:
        "We offer a wide range of diagnostic services, including blood tests, x-rays, and ultrasounds.",
      image: "/images/services/diagnosis.png",
    },
    {
      title: "Cardiology",
      description:
        "We provide a wide range of cardiology services, including heart disease prevention, diagnosis, and treatment.",
      image: "/images/services/cardiology.png",
    },
    {
      title: "Surgeries",
      description:
        "We offer a wide range of surgical services, including general surgery, orthopedic surgery, and plastic surgery.",
      image: "/images/services/surgery.png",
    },
    {
      title: "Eye Care",
      description:
        "We provide a wide range of eye care services, including routine eye exams, glasses, and contact lenses.",
      image: "/images/services/eye.png",
    },
  ];

  return (
    <section className="my-20">
      <h4 className="text-2xl text-primary-500 font-bold text-center mb-8">
        Services We Provide
      </h4>
      <p className="text-center max-w-[620px] mx-auto mb-8">
        We provide a wide range of services to our patients. Our team of
        experienced medical professionals is dedicated to providing exceptional
        medical care to our patients and their families. We offer a variety of
        services, including:
      </p>
      <div className="grid grid-cols-3 gap-6 mt-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="col my-2 flex flex-col rounded-3xl px-6 py-8 bg-white shadow-2xl shadow-gray-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-[170px] mb-6 object-cover rounded-xl"
            />
            <h5 className="text-primary-500 font-bold text-xl mb-3">
              {service.title}
            </h5>
            <p className="">{service.description}</p>
            <div className="flex-1"></div>
            <a
              href="#"
              className="text-primary-500 text-left font-bold cursor-pointer mt-4 w-fit flex flex-row items-center gap-2"
            >
              <span>Learn More</span>
              <svg
                width="auto"
                height="auto"
                viewBox="0 0 21 20"
                className="w-5 h-4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4282 2.94922L18.4789 9.99994L11.4282 17.0507"
                  stroke="#246BFD"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.4789 10L3.479 10"
                  stroke="#246BFD"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
