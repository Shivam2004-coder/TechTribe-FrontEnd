import React, { useState } from "react";
import { useSelector } from "react-redux"; // ✅ Import for displayMode
import axios from "axios";

const Contact = () => {
  const displayMode = useSelector((store) => store.profile.displayMode); // ✅ Get theme mode

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}contact/message`, formData , { withCredentials: true });
      console.log(response);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Conditional Text Colors
  const headingText = displayMode === "Light" ? "text-black" : "text-white";
  const subText = displayMode === "Light" ? "text-gray-800" : "text-gray-300";
  const paraText = displayMode === "Light" ? "text-gray-700" : "text-gray-400";
  const noteText = displayMode === "Light" ? "text-gray-600" : "text-gray-500";

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-yellow-400 mb-4 ${headingText}`}>Get in Touch</h1>
          <p className={`text-lg max-w-2xl mx-auto ${subText}`}>
            Whether you have a question, feedback, partnership idea, or just want to say hello —
            we’d love to hear from you.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className={`text-2xl font-semibold mb-4 ${headingText}`}>Reach Us</h2>
            <ul className={`space-y-3 text-base ${subText}`}>
              <li>
                📧 Email:{" "}
                <a href="mailto:support@techtribe.com" className="text-yellow-400 hover:underline">
                  support@techtribe.com
                </a>
              </li>
              <li>
                📍 Location:{" "}
                <span className={paraText}>Bangalore, India (Hybrid Team)</span>
              </li>
              <li>
                🕒 Working Hours:{" "}
                <span className={paraText}>Mon–Fri, 10:00 AM – 6:00 PM IST</span>
              </li>
            </ul>
          </div>

          {/* Message Form */}
          <div>
            <h2 className={`text-2xl font-semibold mb-4 ${headingText}`}>Send a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <button
                type="submit"
                className={`w-full ${loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-500"} transition text-white font-semibold py-2 px-6 rounded-lg`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              {status && (
                <p className={`text-sm ${status.includes("success") ? "text-green-400" : "text-red-400"}`}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className={`text-center text-sm ${noteText}`}>
          <p>
            We typically respond within 1–2 business days. For urgent issues, please email us directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
