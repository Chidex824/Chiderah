import { useState, useEffect } from "react";
import person from "../../assets/images/person.png";
import "./introduction.css";
import InformationSummary from "./InformationSummary";
import { apiService } from "../../services/api";
import LoadingSpinner from "../common/loading/LoadingSpinner";

const defaultSummaryData = [
  {
    id: "experience",
    title: "Experience",
    description: "3 Y.",
  },
  {
    id: "projects",
    title: "Projects Completed",
    description: "10+",
  },
  {
    id: "clients",
    title: "Happy Clients",
    description: "58",
  },
];

const Introduction = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await apiService.getAbout();
        setAboutData(data);
      } catch (err) {
        setError(err.message || 'Failed to load about data');
        // Fallback to static data if API fails
        setAboutData({
          // name: "Ugwu Chiderah",
          // title: "Full Stack Software Developer",
          // description: "I'm a Full Stack Software Developer based in Nigeria. I build responsive and high-performance web applications using modern technologies, ensuring accessibility, scalability, and maintainability.",
          // email: "chiderahugwu645@gmail.com",
          stats: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="flex max-lg:flex-col-reverse sm:justify-between pt-10 lg:pt-31.5 lg:mb-27.5 max-xl:gap-2 p-2 max-xxl:px-4" id="introduction">
        <LoadingSpinner text="Loading introduction..." />
      </div>
    );
  }

  if (error && !aboutData) {
    return (
      <div className="flex max-lg:flex-col-reverse sm:justify-between pt-10 lg:pt-31.5 lg:mb-27.5 max-xl:gap-2 p-2 max-xxl:px-4" id="introduction">
        <div className="text-center">
          <p>Error loading introduction: {error}</p>
        </div>
      </div>
    );
  }

  const informationSummaryData =
    Array.isArray(aboutData?.stats) && aboutData.stats.length > 0
      ? aboutData.stats
      : defaultSummaryData;
  return (
    <div
      className="flex max-lg:flex-col-reverse sm:justify-between pt-10 lg:pt-31.5 lg:mb-27.5 max-xl:gap-2 p-2 max-xxl:px-4"
      id="introduction"
    >
      <div className="w-full flex flex-col justify-between max-lg:text-center">
        <div className="pt-13 me-31.5 w-full lg:w-auto transition-all duration-500">
          <p className="text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-semibold w-full">
            Hello, I’m
            <span className="text-nowrap shrink-0 inline-block w-full">
              {aboutData?.name || "Ugwu Chiderah Williams"}
            </span>
          </p>
          <p className="text-xs xxs:text-lg lg:text-[18px] my-6">
            I'm a <span className="bg-highlight">{aboutData?.title || "Full Stack"}</span>{" "}
            Software <span className="bg-highlight"> Developer</span> based in
            Nigeria. {aboutData?.description || "I build responsive and high-performance web applications using modern technologies such as HTML, CSS, JavaScript and React.Js for frontend to build responsive and user-friendly interface, i work with backend technologies such as Python and Django to build REST APIs, handle authentication and manage databases logic,ensuring accessibility, scalability, and maintainability."}
          </p>
          <p className="text-center lg:text-start">
            <a
              className="btn-primary btn btn-xs xxs:btn-lg text-white"
              href={`mailto:${aboutData?.email || "ugwuchiderahwilliams@gmail.com"}`}
            >
              Let's Discuss Your Project
            </a>
          </p>
        </div>
        <div className="relative z-20 mx-auto mt-10 w-full max-w-xl lg:mx-0">
          <div className="grid grid-cols-3 gap-2">
            {informationSummaryData.map((item) => (
              <InformationSummary
                key={item.id ?? item.title}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`max-w-134 w-full h-full max-lg:mx-auto aspect-[536/636] relative`}
      >
        <img
          className={`shadow-2xl shadow-gray-200 w-full h-full absolute bottom-0 object-cover bg-white rounded-3xl`}
          src={person}
          alt="person"
        />
      </div>
    </div>
  );
};

export default Introduction;
