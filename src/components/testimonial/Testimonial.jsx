import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import TestimonialTemplate from "./TestimonialTemplate";
import "./testimonial.css";
import { apiService } from "../../services/api";
import LoadingSpinner from "../common/loading/LoadingSpinner";

const Testimonial = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await apiService.getTestimonials();
        // Transform Django API response to match your component's expected format
        const transformedData = data.map(item => ({
          message: item.message || item.content,
          quote: item.quote || item.full_message || item.message,
          name: item.name || item.client_name,
          designation: item.designation || item.position || `${item.company ? `, ${item.company}` : ''}`,
        }));
        setTestimonialData(transformedData);
      } catch (err) {
        setError(err.message || 'Failed to load testimonials');
        // Fallback to static data if API fails
        setTestimonialData([
          {
            message:
              "Working with this young man was a fantastic experience. His attention to detail and commitment to quality exceeded our expectations.",
            quote: `From the initial consultation to the final delivery, every step was handled professionally. The end result was a product that not only met our needs but also impressed our stakeholders. Highly recommended!`,
            name: "Esther Howard",
            designation: "Managing Director, ABC Company",
          },
          {
            message:
              "His expertise in UI/UX design helped us transform our digital presence and improve user engagement.",
            quote: `He demonstrated a deep understanding of our requirements and delivered a solution that was both visually appealing and highly functional. Communication was clear throughout the project.`,
            name: "Ali Haider",
            designation: "COO, XYZ Company",
          },
          {
            message:
              "Professional, reliable, and creative—everything you want in a development partner.",
            quote: `He delivered our project on time and went above and beyond to ensure our satisfaction. The new features have made a significant difference for our users. We look forward to working together again.`,
            name: "Elon Max",
            designation: "Managing Director, KFC Company",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex mx-auto justify-center px-2 max-w-218 pb-10 md:pb-25">
        <LoadingSpinner text="Loading testimonials..." />
      </div>
    );
  }

  if (error && testimonialData.length === 0) {
    return (
      <div className="flex mx-auto justify-center px-2 max-w-218 pb-10 md:pb-25">
        <div className="text-center">
          <p>Error loading testimonials: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex mx-auto justify-center px-2 max-w-218 pb-10 md:pb-25">
      <div className="w-full h-full cursor-grab">
        <p className="section-title mb-6 text-center">Testimonial</p>
        <Swiper
          id="testimonialSwiper"
          spaceBetween={30}
          navigation={false}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
        >
          {testimonialData.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialTemplate testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
