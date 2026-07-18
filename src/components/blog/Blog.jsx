import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import MonoBlog from "./MonoBlog";
import "swiper/css";
import "swiper/css/pagination";
import "./blog.css";
import { apiService } from "../../services/api";
import LoadingSpinner from "../common/loading/LoadingSpinner";

// Breakpoints for swiperJS
const custom_breakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 15,
  },
  1220: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await apiService.getBlogPosts();
        // Transform Django API response to match your component's expected format
        const transformedData = data.map(item => ({
          id: item.id,
          image: item.image ? `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${item.image}` : '',
          date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : "Recent",
          comments: item.comments_count || 0,
          title: item.title,
          link: item.slug ? `/blog/${item.slug}` : '#!',
        }));
        setBlogData(transformedData);
      } catch (err) {
        setError(err.message || 'Failed to load blog posts');
        // Fallback to static data if API fails
        setBlogData([
          {
            id: 1,
            image: '',
            date: "22 Oct, 2020",
            comments: 246,
            title: "Designing Engaging User Interfaces for Modern Web Apps",
            link: "#!",
          },
          {
            id: 2,
            image: '',
            date: "22 Oct, 2020",
            comments: 246,
            title: "Tips for Effective Dashboard Layouts and Usability",
            link: "#!",
          },
          {
            id: 3,
            image: '',
            date: "22 Oct, 2020",
            comments: 246,
            title: "How to Visualize Data for Better Product Decisions",
            link: "#!",
          },
          {
            id: 4,
            image: '',
            date: "22 Oct, 2020",
            comments: 246,
            title: "Responsive Design: Adapting to All Devices Seamlessly",
            link: "#!",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="content py-25 px-2 relative" id="blog">
        <LoadingSpinner text="Loading blog posts..." />
      </div>
    );
  }

  if (error && blogData.length === 0) {
    return (
      <div className="content py-25 px-2 relative" id="blog">
        <div className="text-center">
          <p>Error loading blog posts: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="content py-25 px-2 relative" id="blog">
      <div className="max-w-135 text-center mx-auto pb-17.5">
        <p className="section-title pb-6">Blog</p>
        <p className="text-xs xs:text-[16px] md:text-lg text-gray-400">
          Check out my recent blog posts where I share insights on design,
          development, and the latest industry trends.
        </p>
      </div>
      <Swiper
        grabCursor={true}
        breakpoints={custom_breakpoints}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {blogData?.map((data, index) => (
          <SwiperSlide
            key={index}
            className="mb-10" /* pagination margin bottom to 40px */
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <MonoBlog data={data} key={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Blog;
