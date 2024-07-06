export default function Testimonials() {
  const testimonials = [
    {
      names: "John Carter",
      title: "CEO at Google",
      image: "/images/testimonials/john-carter.png",
      testimonial: {
        title: "An amazing service!",
        description:
          "I've been using this service for years and I couldn't be happier. The doctors are professional and the staff is friendly. I highly recommend this service to anyone looking for quality medical care.",
      },
    },
    {
      names: "Sophie Moore",
      title: "MD at Facebook",
      image: "/images/testimonials/sophie-moore.png",
      testimonial: {
        title: "One of a kind service",
        description:
          "I've been using this service for years and I couldn't be happier. The doctors are professional and the staff is friendly. I highly recommend this service to anyone looking for quality medical care.",
      },
    },
    {
      names: "Andy Smith",
      title: "CEO at Amazon",
      image: "/images/testimonials/andy-smith.png",
      testimonial: {
        title: "The best service ever!",
        description:
          "I've been using this service for years and I couldn't be happier. The doctors are professional and the staff is friendly. I highly recommend this service to anyone looking for quality medical care.",
      },
    },
  ];

  return (
    <section className="my-20">
      <h4 className="text-2xl text-primary-500 font-bold text-center mb-8">
        Testimonials
      </h4>
      <p className="text-center max-w-[620px] mx-auto mb-8">
        Our patients love us! Here's what they have to say about our medical
        services.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="col flex flex-col rounded-3xl px-6 py-8">
            <img
              src={testimonial.image}
              alt={testimonial.names}
              className="rounded-full w-14 h-w-14 mb-4"
            />
            <div className="mb-4">
              <h6 className="text-lg font-bold">
                "{testimonial.testimonial.title}"
              </h6>
              <p className="text-sm mt-2">
                {testimonial.testimonial.description}
              </p>
            </div>
            <h5 className="text-primary-500 font-semibold mt-4">
              {testimonial.names}
            </h5>
            <p>{testimonial.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
