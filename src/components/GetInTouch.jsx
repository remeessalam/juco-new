import React, { useContext, useEffect, useRef, useState } from "react";
import { clientDetails } from "../constants";
import { SpinnerContext } from "./SpinnerContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { serviceDescriptions } from "../data/servicesDetails";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { validateToken } from "../util/helper";
const GetInTouch = () => {
  return (
    <div id="contact" className="py-[3rem] relative">
      <div className="blurred-red-circle h-[25rem] w-[25rem] bottom-[2rem] right-3 -z-10"></div>
      <div className="red-g-shape bottom-[-2rem] left-[-2rem] -z-10 rotate-[-45deg]"></div>
      <div className="wrapper grid grid-cols-1 lg:grid-cols-2 justify-items-center lg:justify-items-stretch items-center gap-7">
        <div data-aos="fade-right" className="flex flex-col gap-5">
          <h1 className="heading text-center lg:text-start">
            Ready to Lead with Innovation and Drive Your Business Forward?
          </h1>
          <p className="description text-center lg:text-start">
            Reach out to discover how our tech solutions can propel your
            business forward.
          </p>
        </div>
        <InquiryForm />
      </div>
    </div>
  );
};

export default GetInTouch;

export const InquiryForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [phoneValue, setPhoneValue] = useState();
  const recaptchaRef = useRef(null);
  const dropdownRef = useRef(null);
  const { setSpinner } = useContext(SpinnerContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    // Handler for clicking outside of the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle form submit click
  const handleFormSubmit = async (values) => {
    if (!captchaValue) {
      toast.error("Please Accept the captch");
      return;
    }
    if (!phoneValue || !selectedService) {
      toast.error(
        "It seems you've forgotten to enter your phone number or select a service. Please provide the missing information."
      );
      return;
    }
    if (!validatePhoneNumber(phoneValue)) {
      return;
    }
    setSpinner(true);
    const token = recaptchaRef.current.getValue();
    try {
      const res = await validateToken(token);
      const result = await res.json();
      if (result.data.success) {
        setCaptchaValue(true);
        toast.success("Verification successful!");
      } else {
        toast.error("Verification failed. Please try again.");
        setSpinner(false);
        return;
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      setSpinner(false);
      return;
    }

    var emailBody = "Name: " + values.name + "\n\n";
    emailBody += "Email: " + values.email + "\n\n";
    emailBody += "Phone: " + phoneValue + "\n\n";
    emailBody += "Service " + selectedService + "\n\n";
    emailBody += "Message:\n" + values.message;

    // Construct the request payload
    var payload = {
      to: clientDetails.email,
      name: clientDetails.name,
      subject: values.subject || "Contact Form Submission - JUOC Solutions",
      body: emailBody,
    };

    await fetch(
      "https://send-mail-redirect-boostmysites.vercel.app/send-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Email sent successfully");
          reset();
          navigate("/thank-you");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setSpinner(false));
  };

  const onCaptchaChange = (value) => {
    console.log(value, "thisisvalue");
    setCaptchaValue(value);
  };
  const validatePhoneNumber = (phone) => {
    const digitsOnly = phone.replace(/\D/g, "");

    const formattedPhone = `+${digitsOnly}`;

    const phoneRegex = /^\+\d{10,17}$/;

    if (!phoneRegex.test(formattedPhone)) {
      toast.error(
        "Enter a valid phone number with country code (e.g., +91xxxxxxxxxx, 10–15 digits)."
      );
      return false;
    }

    return true;
  };
  const onServiceChange = (e) => {
    setSelectedService(e.target.value);
  };
  return (
    <div data-aos="fade-left" className="flex flex-col items-start gap-3 group">
      <p className="gradient-text uppercase">Let's connect</p>
      <div className="bg-gradient-to-b from-primary to-primary/70 rounded-2xl w-fit p-7">
        <h2 className="text-3xl text-white font-medium">
          Connect With Our Team to Get Started!
        </h2>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid grid-cols-1 gap-3 mt-3"
        >
          <div className="grid lg:grid-cols-2 gap-3">
            <div className="">
              <label className="text-white">Name</label>
              <input
                type="text"
                className="w-full outline-none p-3 rounded-lg  "
                autoComplete="off"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Full name is required",
                  validate: (val) => {
                    if (val.trim() !== "") {
                      return true;
                    } else {
                      return "Full name is required";
                    }
                  },
                })}
              />
              <p className="">{errors.name?.message}</p>
            </div>
            <div className="">
              <label className="text-white">Email</label>
              <input
                type="email"
                className="w-full outline-none p-3 rounded-lg  "
                autoComplete="off"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Entered email is invalid",
                  },
                })}
              />
              <p className="">{errors.email?.message}</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-1 gap-3">
            {/* <div className="">
              <label className="text-white">Subject</label>
              <input
                type="text"
                className="w-full outline-none p-3 rounded-lg  "
                placeholder="Enter subject"
                {...register("subject", {
                  required: "Subject is required",
                  validate: (val) => {
                    if (val.trim() !== "") {
                      return true;
                    } else {
                      return "Subject is required";
                    }
                  },
                })}
              />
              <p className="">{errors.subject?.message}</p>
            </div> */}
            <div className="">
              <label className="text-white">Phone Number</label>
              <PhoneInput
                country={"in"}
                value={phoneValue}
                enableSearch={true}
                onChange={(value) => {
                  setPhoneValue(value);
                  setValue("phone", value);
                }}
                className="phone-input-custom2"
                placeholder="Enter phone number"
              />
              <small className="text-primary">
                {errors.phone && "Valid phone number is required"}
              </small>
            </div>
          </div>
          <div className="flex flex-col relative" ref={dropdownRef}>
            <label className="text-white">Service You Are Interested In</label>
            <select
              className="placeholder:text-black text-black bg-white outline-none p-3 rounded-lg  w-full"
              {...register("service")}
              onChange={onServiceChange}
            >
              <option value="">Select a Service</option>
              {Object.keys(serviceDescriptions).map((service) => (
                <option key={service} value={service} className="text-black">
                  {service}
                </option>
              ))}
            </select>
            {selectedService && (
              <div className="bg-black/60 p-3 mt-2 rounded-xl">
                <small className="text-white mt-2 text-base">
                  <span className="font-semibold">{selectedService}: </span>
                  {serviceDescriptions[selectedService]}
                </small>
              </div>
            )}
          </div>
          {/* <div>
            <label className="text-white">Message</label>
            <textarea
              type="text"
              rows="4"
              placeholder="Enter your message here"
              className="w-full outline-none p-3 rounded-lg  "
              autoComplete="off"
              {...register("message", {
                required: "Message is required",
                validate: (val) => {
                  if (val.trim() !== "") {
                    return true;
                  } else {
                    return "Message is required";
                  }
                },
              })}
            />
            <p className="">{errors.message?.message}</p>
          </div> */}
          <div className="mt-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Le7rwsrAAAAAGlbC7u0RziGOymN53Z1AsEjbeCw"
              onChange={onCaptchaChange}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-background border border-white text-primary px-5 py-3 rounded-full hover:bg-primary hover:text-white hover:-translate-y-1 duration-300 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
