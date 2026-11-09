import webAppImage from "../../assets/images/services/web-app.svg";
import productDesignImage from "../../assets/images/services/product-design.svg";
import mobileImage from "../../assets/images/services/mobile-app.svg";
import backendImage from "../../assets/images/services/backend-api.svg";
import databaseImage from "../../assets/images/services/database.svg";
import deliveryImage from "../../assets/images/services/delivery.svg";

const services = [
  {
    title: "Web Application Development",
    description:
      "Responsive, accessible web experiences built with React and modern frontend tools, connected to reliable backend services.",
    image: webAppImage,
    imageAlt: "Illustration of a responsive web application interface",
    category: "Frontend",
  },
  {
    title: "UI/UX Design",
    description:
      "Clear layouts and thoughtful user journeys that make digital products easier and more enjoyable to use.",
    image: productDesignImage,
    imageAlt: "Illustration of a digital product design workspace",
    category: "Product design",
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform mobile experiences designed to feel intuitive and work smoothly across devices.",
    image: mobileImage,
    imageAlt: "Illustration of a mobile application on a phone",
    category: "Mobile",
  },
  {
    title: "Backend & API Development",
    description:
      "Server-side features and REST APIs that connect applications, handle business logic, and move data reliably.",
    image: backendImage,
    imageAlt: "Illustration of an API connecting application services",
    category: "Backend",
  },
  {
    title: "Database Design",
    description:
      "Well-structured PostgreSQL data models designed for consistency, maintainability, and efficient access.",
    image: databaseImage,
    imageAlt: "Illustration of organized database tables",
    category: "Data",
  },
  {
    title: "Testing & Deployment",
    description:
      "Practical testing, debugging, version control, and deployment workflows to help applications ship with confidence.",
    image: deliveryImage,
    imageAlt: "Illustration of a software deployment workflow",
    category: "Delivery",
  },
];

const Profession = () => (
  <section
    aria-labelledby="services-heading"
    className="content px-4 py-16 sm:py-20 lg:py-28"
    id="services"
  >
    <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-picto-primary">
        Services
      </p>
      <h2
        className="text-3xl font-semibold text-[#132238] sm:text-4xl md:text-5xl"
        id="services-heading"
      >
        What I can help you build
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#697586] sm:text-base">
        From product interfaces to backend systems, I help turn ideas into
        useful, polished digital experiences.
      </p>
    </header>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <article
          className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          key={service.title}
        >
          <div className="aspect-[16/9] overflow-hidden bg-[#F6F2FC]">
            <img
              alt={service.imageAlt}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              height="440"
              loading="lazy"
              src={service.image}
              width="800"
            />
          </div>
          <div className="p-5 sm:p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-picto-primary">
              {service.category}
            </p>
            <h3 className="text-lg font-semibold text-[#132238] sm:text-xl">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#697586]">
              {service.description}
            </p>
          </div>
        </article>
      ))}
    </div>

    <div className="mt-10 text-center">
      <a
        className="btn btn-primary px-6 text-white"
        href="#contact"
      >
        Discuss your project
      </a>
    </div>
  </section>
);

export default Profession;
