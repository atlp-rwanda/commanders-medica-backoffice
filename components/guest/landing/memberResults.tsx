import Image from "next/image";

export default function MemberResults() {
  return (
    <section className="my-20">
      <h4 className="text-2xl text-primary-500 font-bold text-center mb-8">
        Our Result In Members
      </h4>
      <div className="flex flex-row justify-around items-center gap-6 mb-8">
        <div className="col my-6 flex flex-col items-center justify-center">
          <p className="text-primary-500 font-bold text-xl mb-3">99%</p>
          <p className="font-bold">Customer Satisfaction</p>
        </div>
        <div className="col my-6 flex flex-col items-center justify-center">
          <p className="text-primary-500 font-bold text-xl mb-3">15K</p>
          <p className="font-bold">Online Patients</p>
        </div>
        <div className="col my-6 flex flex-col items-center justify-center">
          <p className="text-primary-500 font-bold text-xl mb-3">12K</p>
          <p className="font-bold">Patients Recovered</p>
        </div>
        <div className="col my-6 flex flex-col items-center justify-center">
          <p className="text-primary-500 font-bold text-xl mb-3">240%</p>
          <p className="font-bold">Company Growth</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="col flex-1">
          <div className="w-[80%] mx-auto">
            <h4 className="text-3xl text-primary-500 font-bold mb-6 max-w-[365px]">
              You Have Lots Of Reasons To Choose Us
            </h4>
            <p className="mb-16">
              Your welcome to our medica and view consultation and sechedule
              appointment to doctor with your reasons
            </p>
            <div className="flex">
              <button className="bg-primary-500 px-6 py-2 rounded-full text-white mr-4">
                Get Started
              </button>
              <button className="bg-white px-6 py-2 rounded-lg text-primary-500 font-semibold">
                Talk to sales
              </button>
            </div>
          </div>
        </div>
        <div className="col flex-1 flex items-center justify-center">
          <Image
            src="/images/operation.png"
            width={400}
            height={400}
            alt="operation"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
