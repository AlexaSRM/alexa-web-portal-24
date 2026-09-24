"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface IndividualRegistration {
  name: string;
  registrationNumber: string;
  srmMailId: string;
  phoneNumber: string;
}

const STORAGE_KEY = process.env
  .NEXT_PUBLIC_WORKSHOP_REGISTRATION_STORAGE_KEY as string;

const RegisterWorkshop: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const [formData, setFormData] = useState<IndividualRegistration>({
    name: "",
    registrationNumber: "",
    srmMailId: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const savedFormData = sessionStorage.getItem(STORAGE_KEY);

      if (savedFormData) {
        const parsedFormData = JSON.parse(savedFormData);

        if (parsedFormData && typeof parsedFormData === "object") {
          setFormData(parsedFormData);
        }
      }
    } catch (error) {
      console.error("Unable to restore registration data:", error);
      sessionStorage.removeItem(STORAGE_KEY);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error("Unable to save registration data:", error);
    }
  }, [formData, mounted]);

  const handleFieldChange = (
    field: keyof IndividualRegistration,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    if (submitMessage) {
      setSubmitMessage("");
      setSubmitSuccess(null);
    }
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    const nameRegex = /^[a-zA-Z\s]+$/;
    const registrationNumberRegex = /^RA\d{13}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-z]{2}\d{4}@srmist\.edu\.in$/;

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required.";
    } else if (!nameRegex.test(formData.name.trim())) {
      validationErrors.name = "Name can contain only letters and spaces.";
    }

    if (!formData.registrationNumber.trim()) {
      validationErrors.registrationNumber = "Register number is required.";
    } else if (
      !registrationNumberRegex.test(formData.registrationNumber.trim())
    ) {
      validationErrors.registrationNumber =
        "Register number must be RA followed by exactly 13 digits.";
    }

    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      validationErrors.phoneNumber =
        "Phone number must contain exactly 10 digits.";
    }

    if (!formData.srmMailId.trim()) {
      validationErrors.srmMailId = "SRMIST email is required.";
    } else if (!emailRegex.test(formData.srmMailId.trim())) {
      validationErrors.srmMailId =
        "Enter a valid SRMIST email in the format ab1234@srmist.edu.in.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setSubmitMessage("");
    setSubmitSuccess(null);
    setErrors({});

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitSuccess(false);
      setSubmitMessage(
        "Please correct the highlighted fields before submitting.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        event: "Workshop",
        name: formData.name.trim(),
        regno: formData.registrationNumber.trim(),
        email: formData.srmMailId.trim().toLowerCase(),
        phone: `+91 ${formData.phoneNumber.trim()}`,
      };

      const response = await fetch("/api/alexaverse/register/solo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result: any = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        const backendMessage =
          typeof result?.detail === "string"
            ? result.detail
            : typeof result?.message === "string"
              ? result.message
              : "";

        const normalizedMessage = backendMessage.toLowerCase();

        if (
          normalizedMessage.includes("regno") ||
          normalizedMessage.includes("register number") ||
          normalizedMessage.includes("registration number")
        ) {
          throw new Error(
            "This register number is already registered for Workshop.",
          );
        }

        if (normalizedMessage.includes("email")) {
          throw new Error(
            "This SRMIST email is already registered for Workshop.",
          );
        }

        if (normalizedMessage.includes("phone")) {
          throw new Error(
            "This phone number is already registered for Workshop.",
          );
        }

        throw new Error(
          backendMessage || "Registration failed. Please try again.",
        );
      }

      setSubmitSuccess(true);
      setSubmitMessage(result?.message || "Registration successful!");
      setErrors({});
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <nav className="relative z-20 w-full px-6 sm:px-10 lg:px-14 py-4 flex justify-between items-center">
        <Link
          href="/alexaverse-v3"
          className="flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/alexaverse3.0/Alexa Logo.svg"
            alt="Alexa Developers SRM"
            width={48}
            height={48}
            className="block md:hidden h-8 w-auto object-contain"
          />

          <Image
            src="/alexaverse3.0/Alexa Logo.svg"
            alt="Alexa Developers SRM"
            width={364}
            height={52}
            className="hidden md:block h-9 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex gap-10 items-center">
          {[
            {
              label: "Home",
              href: "/alexaverse-v3",
            },
            {
              label: "Events",
              href: "/alexaverse-v3#events",
            },
            {
              label: "Contact Us",
              href: "#contact",
            },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-white text-xl hover:text-white/70 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      <div
        className={`fixed inset-0 bg-black/85 backdrop-blur-lg z-50 flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="absolute top-5 right-6 text-white"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>

        {[
          {
            label: "HOME",
            href: "/alexaverse-v3",
          },
          {
            label: "OUR EVENTS",
            href: "/alexaverse-v3#events",
          },
          {
            label: "CONTACT US",
            href: "#contact",
          },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="text-white text-3xl hover:text-white/70 transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>

      <section
        id="register-workshop"
        className="relative w-full min-h-screen text-white overflow-hidden"
        style={{ fontFamily: "'Crimson Pro', serif" }}
      >
        <div className="relative z-10 w-full flex flex-col items-center px-3 sm:px-4 py-10 sm:py-16">
          <div className="w-full flex justify-center px-0 sm:px-6 lg:px-10 mb-8 sm:mb-12">
            <Image
              src="/alexaverse3.0/workshop-banner.svg"
              alt="Workshop"
              width={1055}
              height={755}
              priority
              className="hidden sm:block w-full max-w-[1055px] h-auto object-contain"
            />

            <Image
              src="/alexaverse3.0/workshop-banner-mobile.svg"
              alt="Workshop"
              width={700}
              height={900}
              priority
              className="block sm:hidden w-full max-w-[390px] h-auto object-contain"
            />
          </div>

          <div className="w-full flex justify-center mb-7 sm:mb-10 px-1 sm:px-0">
            <Image
              src="/alexaverse3.0/form-header.svg"
              alt="Registration Form"
              width={1300}
              height={160}
              className="w-full max-w-[1100px] h-auto object-contain"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-6xl space-y-6 sm:space-y-8"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                <div>
                  <label htmlFor="name" className="block mb-2 text-white">
                    Name<span className="text-white">*</span>
                  </label>

                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    placeholder="Name"
                    className={`w-full px-4 py-3 sm:py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
                      errors.name ? "border-red-500" : "border-gray-400"
                    }`}
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="registrationNumber"
                    className="block mb-2 text-white"
                  >
                    Register Number
                    <span className="text-white">*</span>
                  </label>

                  <input
                    type="text"
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      handleFieldChange("registrationNumber", e.target.value)
                    }
                    placeholder="RAXXXXXXXXXXXXX"
                    className={`w-full px-4 py-3 sm:py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
                      errors.registrationNumber
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                  />

                  {errors.registrationNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.registrationNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-white"
                  >
                    Phone Number
                    <span className="text-white">*</span>
                  </label>

                  <div
                    className={`w-full flex items-center border rounded bg-white focus-within:ring-2 focus-within:ring-purple-500 overflow-hidden ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-400"
                    }`}
                  >
                    <span className="px-3 text-black text-md border-r border-gray-400">
                      +91&nbsp;
                    </span>

                    <input
                      type="tel"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleFieldChange("phoneNumber", e.target.value)
                      }
                      placeholder="0123456789"
                      className="flex-1 px-3 py-3 sm:py-4 text-black placeholder-gray-500 bg-white focus:outline-none"
                    />
                  </div>

                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="srmMailId" className="block mb-2 text-white">
                    SRMIST Email
                    <span className="text-white">*</span>
                  </label>

                  <input
                    type="email"
                    id="srmMailId"
                    value={formData.srmMailId}
                    onChange={(e) =>
                      handleFieldChange("srmMailId", e.target.value)
                    }
                    placeholder="ab1234@srmist.edu.in"
                    className={`w-full px-4 py-3 sm:py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
                      errors.srmMailId ? "border-red-500" : "border-gray-400"
                    }`}
                  />

                  {errors.srmMailId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.srmMailId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitSuccess === true}
              className={`relative mx-auto flex w-full max-w-[400px] items-center justify-center transition duration-300 ${
                isSubmitting || submitSuccess === true
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer hover:scale-105"
              }`}
            >
              <Image
                src="/alexaverse3.0/register-btn.svg"
                alt="Register"
                width={500}
                height={200}
                className="w-full h-auto object-contain"
              />

              <span
                className="absolute inset-0 flex items-center justify-center text-black font-bold text-2xl sm:text-4xl tracking-[1px] sm:tracking-[2px]"
                style={{
                  fontFamily: "'Cinzel', serif",
                }}
              >
                {isSubmitting
                  ? "REGISTERING"
                  : submitSuccess
                    ? "REGISTERED"
                    : "REGISTER"}
              </span>
            </button>

            {submitMessage && (
              <div
                className={`mx-auto mt-6 p-4 rounded-lg text-center max-w-2xl ${
                  submitSuccess
                    ? "bg-green-100 border border-green-400 text-green-700"
                    : "bg-red-100 border border-red-400 text-red-700"
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterWorkshop;
