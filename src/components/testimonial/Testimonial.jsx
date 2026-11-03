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
import { Link } from "react-router-dom";

const Testimonial = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    message: "",
    publication_consent: false,
  });
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await apiService.getTestimonials();
        const transformedData = data.map(item => ({
          message: item.message,
          name: item.name,
          designation: [item.designation, item.company].filter(Boolean).join(", "),
        }));
        setTestimonialData(transformedData);
      } catch (err) {
        setError(err.message || 'Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmissionStatus("");

    try {
      const response = await apiService.submitTestimonial(formData);
      setSubmissionStatus(response.detail);
      setFormData({
        name: "",
        designation: "",
        company: "",
        message: "",
        publication_consent: false,
      });
    } catch (err) {
      setSubmissionStatus(
        typeof err === "string" ? err : err.message || "Could not submit your review. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex mx-auto justify-center px-2 max-w-218 pb-10 md:pb-25">
        <LoadingSpinner text="Loading testimonials..." />
      </div>
    );
  }

  return (
    <div className="flex mx-auto justify-center px-2 max-w-218 pb-10 md:pb-25">
      <div className="w-full h-full cursor-grab">
        <p className="section-title mb-6 text-center">Testimonials</p>
        {error ? <p className="mb-6 text-center text-red-600">Could not load reviews right now.</p> : null}
        {testimonialData.length === 0 ? (
          <p className="mb-8 text-center text-gray-500">No reviews yet. Be the first to share your experience.</p>
        ) : null}
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
        <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-2xl rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-center text-xl font-semibold">Share your experience</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-medium">
              Your name
              <input
                className="rounded border border-gray-300 p-3"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={200}
                autoComplete="name"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Role (optional)
              <input
                className="rounded border border-gray-300 p-3"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                maxLength={200}
                autoComplete="organization-title"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
              Company (optional)
              <input
                className="rounded border border-gray-300 p-3"
                name="company"
                value={formData.company}
                onChange={handleChange}
                maxLength={200}
                autoComplete="organization"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
              Your review
              <textarea
                className="min-h-32 rounded border border-gray-300 p-3"
                name="message"
                value={formData.message}
                onChange={handleChange}
                maxLength={2000}
                required
              />
            </label>
            <label className="flex items-start gap-2 text-sm font-normal text-gray-600 sm:col-span-2">
              <input
                type="checkbox"
                name="publication_consent"
                className="checkbox checkbox-primary mt-1"
                checked={formData.publication_consent}
                onChange={handleChange}
                required
              />
              <span>
                I agree that my review and the name and role/company I provided may be published after approval. I have read the{" "}
                <Link className="underline" to="/policies#privacy-policy">Privacy Policy</Link>.
              </span>
            </label>
          </div>
          <div className="mt-5 text-center">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit review"}
            </button>
            {submissionStatus ? (
              <p className="mt-3 text-sm text-gray-600" role="status">{submissionStatus}</p>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Testimonial;
