import Roles from "./Roles";

const rolesData = [
  {
    id: 1,
    title: "Web Development",
    description:
      "I build responsive and high-performance web applications using modern technologies, ensuring accessibility, scalability, and maintainability.",
  },

  {
    id: 2,
    title: "Mobile App Development",
    description:
      "I create cross-platform mobile applications using frameworks like React Native and flutter, providing seamless user experiences on both iOS and Android devices.",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description:
      "I create user-friendly and visually appealing designs that enhance the user experience and meet the needs of my clients.",
  },
  {
    id: 4,
    title: "Backend Development",
    description:
      "I develop robust backend systems using technologies like Node.js, Python, and Django, ensuring seamless functionality and data management.",
  },
  {
    id: 5,
    title: "API Development",
    description:
      "I design and implement RESTful APIs that enable smooth communication between frontend and backend systems.",
  },
  {
    id: 6,
    title: "Database Management",
    description:
      "I manage databases using PostgreSQL, ensuring data integrity, security, and efficient data retrieval.",
  },
  {
    id: 7,
    title: "Version Control",
    description:
      "I use Git for version control, enabling efficient collaboration and code management in development projects.",
  },
  {
    id: 8,
    title: "Testing and Debugging",
    description:
      "I perform thorough testing and debugging to ensure the reliability and performance of web applications.",
  },
  {
    id: 9,
    title: "Deployment and Hosting",
    description:
      "I deploy web applications to hosting platforms, ensuring they are accessible and performant for end-users.",
  },
];

const Profession = () => {
  return (
    <div
      className="content grid md:grid-cols-2 max-xxl:px-4 xxl:px-2 py-10 md:py-15 lg:py-37.5"
      id="services"
    >
      <div className="flex flex-col justify-between h-fit md:pe-8 lg:pe-35.75 max-md:text-center my-auto">
        <p className="section-title max-md:text-center">What I do?</p>
        <div className="mt-6 text-[14px]">
          <p className="text-xs sm:text-lg font-normal text-gray-400 mb-4">
            I specialize in building responsive and high-performance web applications using modern technologies, 
            ensuring accessibility, scalability, and maintainability.
          </p>
          <p className="text-xs sm:text-lg font-normal text-gray-400">
            My approach combines creativity and technical expertise to deliver
            solutions that are both visually appealing and highly functional for
            users.
          </p>
        </div>
        <a
          href="#!"
          className="mt-5 md:mt-12.5 btn btn-primary text-white w-fit md:py-3 md:px-6 text-[12px] sm:text-[16px] font-semibold max-md:mx-auto max-md:mb-5"
        >
          Say Hello!
        </a>
      </div>
      <div className="">
        {rolesData.map((role, index) => (
          <Roles role={role} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Profession;
