const experience = [
  {
    company: "Beatsbox Inc.",
    role: "Full Stack Developer",
    duration: "Jan 2025 – Present",
    description:
      "Building a music streaming platform with real-time collaboration features for users, artists, and record labels.",
  },
  {
    company: "E-Double One Inc.",
    role: "Backend Developer Intern",
    duration: "July 2026 – October 2026",
    description:
      "Contributed to the design of an edtech platform, collaborated through Git workflows and CI/CD, and created branches and pull requests.",
  },
  {
    company: "Chidex Technologies Ltd.",
    role: "Front-End Developer",
    duration: "Jun 2023 – Dec 2023",
    description:
      "Built a Django blog application, implemented REST APIs, and integrated third-party services while developing modern web development skills.",
  },
];

const Experience = () => (
  <section
    aria-labelledby="experience-heading"
    className="mx-auto max-w-5xl rounded-2xl border border-gray-100 bg-white px-4 py-12 shadow-lg shadow-slate-900/5 sm:px-8 sm:py-16 md:px-12"
    id="experience"
  >
    <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-picto-primary">
        Career journey
      </p>
      <h2
        className="text-3xl font-semibold text-[#132238] sm:text-4xl md:text-5xl"
        id="experience-heading"
      >
        Work Experience
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#697586] sm:text-base">
        Experience across front-end and back-end development, building useful
        products and collaborating with teams.
      </p>
    </header>

    <ol className="relative mx-auto max-w-3xl space-y-5 before:absolute before:bottom-8 before:left-[0.6875rem] before:top-8 before:w-px before:bg-purple-200 sm:space-y-6">
      {experience.map((item) => (
        <li className="relative pl-9 sm:pl-10" key={`${item.company}-${item.role}`}>
          <span
            aria-hidden="true"
            className="absolute left-1 top-7 size-4 rounded-full border-4 border-white bg-picto-primary shadow-sm ring-1 ring-purple-200"
          />
          <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#132238] sm:text-xl">
                  {item.role}
                </h3>
                <p className="mt-1 font-medium text-picto-primary">
                  {item.company}
                </p>
              </div>
              <span className="w-fit rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-800 sm:mt-1 sm:whitespace-nowrap">
                {item.duration}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#697586] sm:text-base">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ol>
  </section>
);

export default Experience;
