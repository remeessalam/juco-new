import { reasons } from "../constants";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-background">
      <div className="wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 relative inline-block">
            Why Work With Us
            {/* <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" /> */}
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At JUOC Solutions, we stand out in a sea of tech companies by
            keeping it real: we listen, build with purpose, and deliver results
            that last. As an extension of your team, we blend technical
            expertise with practical business insights. Here’s what makes us
            unique:
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-l-4 border-primary group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-lg relative z-10">
                {reason.description}
              </p>
              {reason.keywords && (
                <p className="mt-4 text-base text-gray-500 italic relative z-10">
                  {reason.keywords}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Let’s Build Something Epic
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            No cookie-cutter solutions here. We dive deep into your unique
            challenges, delivering tailored results with precision and care.
            Ready to create something that stands out? Let’s talk.
          </p>
          <a
            href="#contact"
            className="inline-block bg-primary text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-secondary transform hover:scale-105 transition-all duration-300 shadow-md"
          >
            Start the Conversation
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
