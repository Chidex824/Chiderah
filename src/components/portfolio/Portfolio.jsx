import { useState, useEffect } from "react";
import Projects from "./Projects";
import { apiService } from "../../services/api";
import LoadingSpinner from "../common/loading/LoadingSpinner";

const Portfolio = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiService.getProjects();
        // Transform Django API response to match your component's expected format
        const transformedData = data.map(item => ({
          id: item.id,
          image: item.image || '',
          category: item.category || 'UI-UX DESIGN', // Adjust based on your model fields
          title: item.title,
          description: item.description,
          link: item.link || '#!',
        }));
        setProjectData(transformedData);
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="content mt-10 md:mt-15 xl:mt-25 mb-10 md:mb-25 max-xxl:p-2" id="portfolio">
        <LoadingSpinner text="Loading projects..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="content mt-10 md:mt-15 xl:mt-25 mb-10 md:mb-25 max-xxl:p-2" id="portfolio">
        <div className="text-center">
          <p>Error loading projects: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="content mt-10 md:mt-15 xl:mt-25 mb-10 md:mb-25 max-xxl:p-2"
      id="portfolio"
    >
      <div className="xl:mb-17.5 mb-5">
        <div className="max-sm:px-2 text-center mx-auto max-w-144.25">
          <p className="section-title ">Portfolio</p>
          <p className="font-normal text-[18px] max-sm:text-[14px] pt-6 text-gray-400">
            Here's a selection of my recent work, showcasing my skills in
            creating user-centric and visually appealing interfaces.
          </p>
        </div>
      </div>
      <div className="mx-auto flex justify-center">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
          {projectData.map((data, index) => (
            <Projects data={data} key={data.id || index} />
          ))}
        </div>
      </div>
      <div className="text-center">
        <a
          href="#!"
          className="btn btn-primary py-3 px-6 mt-12.5 text-center text-[16px] font-semibold"
        >
          More Project
        </a>
      </div>
    </div>
  );
};

export default Portfolio;