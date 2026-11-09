import "./skills.css";

const skills = [
  { name: "JavaScript", category: "Technical", rating: 85 },
  { name: "React", category: "Technical", rating: 85 },
  { name: "Node.js", category: "Technical", rating: 75 },
  { name: "Python", category: "Technical", rating: 80 },
  { name: "HTML & CSS", category: "Technical", rating: 90 },
  { name: "PostgreSQL", category: "Technical", rating: 75 },
  { name: "API design and development", category: "Technical", rating: 80 },
  { name: "Database design and management", category: "Technical", rating: 78 },
  { name: "Version control (Git)", category: "Technical", rating: 82 },
  { name: "Testing and debugging", category: "Technical", rating: 78 },
  { name: "Deployment and hosting", category: "Technical", rating: 75 },
  { name: "Communication", category: "Professional", rating: 85 },
  { name: "Problem-solving", category: "Professional", rating: 90 },
  { name: "Teamwork", category: "Professional", rating: 85 },
  { name: "Adaptability", category: "Professional", rating: 85 },
  { name: "Time management", category: "Professional", rating: 80 },
  { name: "Leadership", category: "Professional", rating: 75 },
];

const getRatingLabel = (rating) => {
  if (rating >= 85) return "Advanced";
  if (rating >= 75) return "Proficient";
  return "Developing";
};

const Skills = () => (
  <section
    aria-labelledby="skills-heading"
    className="container mx-auto col-span-12 px-4 py-10 text-left md:col-span-6 lg:col-span-4"
  >
    <h2
      id="skills-heading"
      className="mb-3 text-center text-3xl font-semibold text-[#132238] sm:text-4xl"
    >
      My Skills
    </h2>
    <p className="mb-6 text-center text-sm text-soft-dark">
      Self-assessed proficiency ratings
    </p>

    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">
          Technical and professional skills with self-assessed ratings
        </caption>
        <thead className="bg-soft-white text-sm text-[#132238]">
          <tr>
            <th className="px-4 py-3 font-semibold" scope="col">
              Skill
            </th>
            <th className="px-4 py-3 font-semibold" scope="col">
              Category
            </th>
            <th className="w-2/5 px-4 py-3 font-semibold" scope="col">
              Rating
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {skills.map((skill, index) => (
            <tr key={skill.name} className="hover:bg-gray-50">
              <th
                className="px-4 py-3 text-sm font-medium text-[#132238]"
                scope="row"
              >
                {skill.name}
              </th>
              <td className="px-4 py-3 text-sm text-soft-dark">
                {skill.category}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div
                    className="skill-rating__track"
                    role="progressbar"
                    aria-label={`${skill.name} self-assessed rating`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={skill.rating}
                    aria-valuetext={`${getRatingLabel(skill.rating)}, ${skill.rating}%`}
                  >
                    <span
                      className="skill-rating__fill"
                      style={{
                        width: `${skill.rating}%`,
                        "--skill-delay": `${Math.min(index * 60, 900)}ms`,
                      }}
                    />
                  </div>
                  <span className="w-20 shrink-0 text-xs text-soft-dark">
                    {getRatingLabel(skill.rating)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default Skills;
