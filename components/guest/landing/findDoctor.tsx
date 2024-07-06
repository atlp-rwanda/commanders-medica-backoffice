export default function FindDoctor() {
  return (
    <section className="relative flex flex-col justify-center my-20 bg-white shadow-xl p-8 rounded-2xl w-[90%] mx-auto">
      <h3 className="text-2xl font-bold mb-4">Find A Doctor</h3>
      <form action="" className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border-2 border-gray-200 rounded-lg px-4 py-2 w-fit"
        />
        <input
          type="text"
          placeholder="Specialization"
          className="border-2 border-gray-200 rounded-lg px-4 py-2 w-fit"
        />
        <label className="inline-flex flex-1 justify-center items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <span className="mr-3 text-sm font-medium">Available</span>
          <div className="relative w-9 h-5 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
        </label>
        <button className="bg-primary-500 px-8 py-2 rounded-lg text-white shadow-lg shadow-primary-200">
          Search
        </button>
      </form>
    </section>
  );
}
