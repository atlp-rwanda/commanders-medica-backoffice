export default function TeamMembers() {
  const members = [
    {
      names: "Dr. John Carter",
      title: "CEO & Co-Founder",
      description:
        "Dr. John Carter is a board-certified family physician with over 20 years of experience in the medical field. He is dedicated to providing exceptional medical care to his patients and their families.",
      image: "/images/team/john-carter.png",
    },
    {
      names: "Dr. Sophie Moore",
      title: "Dental Specialist",
      description:
        "Dr. Sophie Moore is a board-certified dentist with over 15 years of experience in the dental field. She is dedicated to providing exceptional dental care to her patients and their families.",
      image: "/images/team/sophie-moore.png",
    },
    {
      names: "Dr. Matt Cannon",
      title: "Orthopedic Surgeon",
      description:
        "Dr. Matt Cannon is a board-certified orthopedic surgeon with over 10 years of experience in the medical field. He is dedicated to providing exceptional orthopedic care to his patients and their families.",
      image: "/images/team/matt-cannon.png",
    },
    {
      names: "Dr. Andy Smith",
      title: "Brain Surgeon",
      description:
        "Dr. Andy Smith is a board-certified brain surgeon with over 10 years of experience in the medical field. He is dedicated to providing exceptional brain care to his patients and their families.",
      image: "/images/team/andy-smith.png",
    },
    {
      names: "Dr. Lilly Woods",
      title: "Heart Specialist",
      description:
        "Dr. Lilly Woods is a board-certified heart specialist with over 10 years of experience in the medical field. She is dedicated to providing exceptional heart care to her patients and their families.",
      image: "/images/team/lilly-woods.png",
    },
    {
      names: "Dr. Patrick Meyer",
      title: "Eye Specialist",
      description:
        "Dr. Patrick Meyer is a board-certified eye specialist with over 10 years of experience in the medical field. He is dedicated to providing exceptional eye care to his patients and their families.",
      image: "/images/team/patrick-meyer.png",
    },
  ];
  return (
    <section className="my-20">
      <h4 className="text-2xl text-primary-500 font-bold text-center mb-8">
        Meet Our Team Members
      </h4>
      <p className="text-center max-w-[620px] mx-auto mb-8">
        Our team includes a diverse group of medical professionals who are
        dedicated to providing exceptional medical care to our patients and
        their families.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {members.map((member, index) => (
          <div
            key={index}
            className="col my-2 flex flex-col rounded-3xl px-6 py-8 bg-white shadow-2xl shadow-gray-300"
          >
            <img
              src={member.image}
              alt={member.names}
              className="w-[120px] h-[120px] rounded-full mx-auto mb-4"
            />
            <h5 className="text-xl text-primary-500 font-bold text-center mb-4">
              {member.names}
            </h5>
            <p className="text-center font-bold uppercase">{member.title}</p>
            <p className="mt-4 text-justify text-sm">{member.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
