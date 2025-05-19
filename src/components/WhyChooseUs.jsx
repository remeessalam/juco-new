import { reasons } from "../constants";

const WhyChooseUs = () => {
  return (
    <section className="py-12">
      <div className="wrapper">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Work With Us
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We know there are a lot of tech companies out there. So what makes
            us any different? At [Your Company Name], we keep things simple: we
            listen carefully, build thoughtfully, and deliver what we promise.
            Whether you're building something from scratch or improving an
            existing system, we work as an extension of your team — combining
            deep technical know-how with practical business sense. Here’s what
            sets us apart:
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
              {reason.keywords && (
                <p className="mt-4 text-base text-gray-500 italic">
                  {reason.keywords}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Let’s Build Something That Works — and Lasts
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            We don’t believe in one-size-fits-all approaches. Every client comes
            to us with a different challenge, and we treat each project with the
            focus and care it deserves. If you’re looking for a team that’s
            serious about getting things right — from the big-picture strategy
            down to the smallest technical detail — we’d love to hear what
            you’re working on.
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Reach out today, and let’s start a real conversation.
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
