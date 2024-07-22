interface ListType {
  name: string;
  visitType: string;
  time?: string;
  color?: string;
}
export default function ListItem({ name, visitType, time, color }: ListType) {
  const handleAbbr = (str: string) => {
    const arr = str
      .split(" ")
      .map((word) => word[0])
      .join("");
    return arr.toUpperCase();
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[30px]">
        <div className="w-[50px]">
          <div
            className={`border-[1px] border-[${color}] p-1 rounded-full flex justify-center items-center`}
          >
            <span
              className={`bg-[${color}15] p-2 w-[45px] flex justify-center rounded-full`}
            >
              {handleAbbr(name)}
            </span>
          </div>
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className={`text-[${color}]`}>{visitType}</p>
        </div>
      </div>
      <div>
        <div
          className={`bg-[${color}15] text-[${color}] w-[100%] rounded-[10px] p-1 mr-[10px]`}
        >
          <p className="flex justify-center">{time}</p>
        </div>
      </div>
    </div>
  );
}
