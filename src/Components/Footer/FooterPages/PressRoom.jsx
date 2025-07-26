import React from "react";
import { useSelector } from "react-redux";

const PressRoom = () => {
  const displayMode = useSelector((store) => store.profile.displayMode);

  // Dynamic text classes
  const mainText = displayMode === "Light" ? "text-gray-900" : "text-white";
  const subText = displayMode === "Light" ? "text-gray-700" : "text-gray-400";
  const lightText = displayMode === "Light" ? "text-gray-700" : "text-gray-300";

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-yellow-500 mb-4 ${mainText}`}>
            Tech Tribe Press Room
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${subText}`}>
            Stay informed with the latest press releases, media coverage, and official announcements from the Tech Tribe team.
          </p>
        </div>

        {/* About Tech Tribe */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>About Tech Tribe</h2>
          <p className={`${subText} leading-relaxed`}>
            Tech Tribe is a platform where innovators, developers, and creatives connect meaningfully.
            We're building tools that foster real conversations, collaborative discovery, and digital community building
            — all with a focus on inclusivity, authenticity, and innovation.
          </p>
        </section>

        {/* Media Inquiries */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>Media Inquiries</h2>
          <p className={`${subText} leading-relaxed mb-2`}>
            For interviews, speaker requests, or brand assets, please reach out to our communications team at:
          </p>
          <a
            href="mailto:press@techtribe.com"
            className="text-yellow-500 font-medium underline"
          >
            press@techtribe.com
          </a>
        </section>

        {/* Press Assets */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>Press Assets</h2>
          <ul className={`${subText} list-disc list-inside space-y-2`}>
            <li>
              <a className={`hover:underline ${mainText}`}>
                Download Brand Kit (Logos & Fonts)
              </a>
            </li>
            <li>
              <a className={`hover:underline ${mainText}`}>
                Media Guidelines & Usage Policy
              </a>
            </li>
            <li>
              <a className={`hover:underline ${mainText}`}>
                Founder Bios & Photos
              </a>
            </li>
          </ul>
        </section>

        {/* Recent Announcements */}
        <section className="mb-10">
          <h2 className={`text-2xl font-semibold mb-3 ${mainText}`}>Latest Announcements</h2>
          <div className="space-y-4">
            {[
              {
                title: "Tech Tribe Secures Series A Funding",
                date: "May 12, 2025",
                link: "",
              },
              {
                title: "Tech Tribe Launches Global Mentorship Network",
                date: "March 29, 2025",
                link: "",
              },
              {
                title: "Co-Founder of Tech Tribe Featured in Startup Weekly",
                date: "February 5, 2025",
                link: "",
              },
            ].map((news, idx) => (
              <div key={idx} className="border-b border-gray-700 pb-4">
                <a href={news.link} className={`text-lg font-semibold hover:underline ${mainText}`}>
                  {news.title}
                </a>
                <p className={`text-sm ${lightText}`}>{news.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className={`text-center mt-16 text-sm ${lightText}`}>
          <p>
            For urgent press requests, please contact us directly at{" "}
            <a href="mailto:press@techtribe.com" className="text-yellow-500 underline">
              press@techtribe.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PressRoom;
