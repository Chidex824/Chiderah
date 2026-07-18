import { ClipLoader } from "react-spinners";

const Loading = ({ text = "Loading...", size = 50, color = "#3B82F6" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <ClipLoader size={size} color={color} />
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  );
};

export default Loading;