import { useState } from "react";
import { faqData } from "../constants";

const AccordionItem = ({ itemKey, question, answer, isOpen, onToggle }) => {
  const contentId = `content-${itemKey}`;
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex items-center w-full text-left py-2 px-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span
          className={`mr-2 transition-transform ${isOpen ? "rotate-90" : ""}`}
        >
          ►
        </span>
        {question}
      </button>
      <div
        id={contentId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="p-4">{answer}</div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openKey, setOpenKey] = useState(null);

  return (
    <div className="wrapper ">
      {faqData.map((category, catIndex) => (
        <div key={catIndex} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
          {category.questions.map((q, qIndex) => {
            const key = `${catIndex}-${qIndex}`;
            return (
              <AccordionItem
                key={key}
                itemKey={key}
                question={q.question}
                answer={q.answer}
                isOpen={openKey === key}
                onToggle={() => setOpenKey(openKey === key ? null : key)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Faq;
