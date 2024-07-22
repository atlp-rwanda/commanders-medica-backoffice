import Image from "next/image";

type LoadingProps = {
  loading: boolean;
  label: string | null;
};

export default function Loading({ loading, label }: LoadingProps) {
  return (
    <div
      className={`${loading ? "flex" : "hidden"} flex-col justify-center items-center`}
    >
      <Image
        src={require("@/assets/spinner.png")}
        className="w-8 h-8 animate-slow-spin"
        alt="loading"
      />
      <div className="bg-white p-4 rounded-lg text-center">
        <p>{label || "Loading..."}</p>
      </div>
    </div>
  );
}
