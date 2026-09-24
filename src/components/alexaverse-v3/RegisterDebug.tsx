"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TeamRegistration, TeamMember } from "@/lib/api";

const STORAGE_KEY = process.env.NEXT_PUBLIC_DEBUG_REGISTRATION_STORAGE_KEY;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const RegisterDebug: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const [formData, setFormData] = useState<TeamRegistration>({
    teamName: "",
    teamMembers: [
      { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" },
      { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" },
      { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" },
      { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" },
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const savedFormData = sessionStorage.getItem(STORAGE_KEY);

      if (savedFormData) {
        const parsedFormData = JSON.parse(savedFormData);

        if (
          parsedFormData &&
          typeof parsedFormData === "object" &&
          Array.isArray(parsedFormData.teamMembers)
        ) {
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

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      teamName: value,
    }));

    if (errors.teamName) {
      setErrors((prev) => ({
        ...prev,
        teamName: "",
      }));
    }

    if (submitMessage) {
      setSubmitMessage("");
      setSubmitSuccess(null);
    }
  };

  const handleMemberChange = (
    memberIndex: number,
    field: keyof TeamMember,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, index) =>
        index === memberIndex ? { ...member, [field]: value } : member,
      ),
    }));

    const errorKey = `teamMembers.${memberIndex}.${field}`;

    if (errors[errorKey]) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: "",
      }));
    }

    if (submitMessage) {
      setSubmitMessage("");
      setSubmitSuccess(null);
    }
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    const teamNameRegex = /^[a-zA-Z0-9\s]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const registrationNumberRegex = /^RA\d{13}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-z]{2}\d{4}@srmist\.edu\.in$/;

    const teamName = formData.teamName.trim();

    if (!teamName) {
      validationErrors.teamName = "Team name is required.";
    } else if (teamName.length < 3) {
      validationErrors.teamName =
        "Team name must contain at least 3 characters.";
    } else if (!teamNameRegex.test(teamName)) {
      validationErrors.teamName =
        "Team name can contain only letters, numbers, and spaces.";
    }

    formData.teamMembers.forEach((member, index) => {
      const studentNumber = index + 1;
      const baseKey = `teamMembers.${index}`;

      if (!member.name.trim()) {
        validationErrors[`${baseKey}.name`] =
          `Student ${studentNumber} name is required.`;
      } else if (!nameRegex.test(member.name.trim())) {
        validationErrors[`${baseKey}.name`] =
          "Name can contain only letters and spaces.";
      }

      if (!member.registrationNumber.trim()) {
        validationErrors[`${baseKey}.registrationNumber`] =
          `Student ${studentNumber} register number is required.`;
      } else if (
        !registrationNumberRegex.test(member.registrationNumber.trim())
      ) {
        validationErrors[`${baseKey}.registrationNumber`] =
          "Register number must be RA followed by exactly 13 digits.";
      }

      if (!member.phoneNumber.trim()) {
        validationErrors[`${baseKey}.phoneNumber`] =
          `Student ${studentNumber} phone number is required.`;
      } else if (!phoneRegex.test(member.phoneNumber.trim())) {
        validationErrors[`${baseKey}.phoneNumber`] =
          "Phone number must contain exactly 10 digits.";
      }

      if (!member.srmMailId.trim()) {
        validationErrors[`${baseKey}.srmMailId`] =
          `Student ${studentNumber} SRMIST email is required.`;
      } else if (!emailRegex.test(member.srmMailId.trim())) {
        validationErrors[`${baseKey}.srmMailId`] =
          "Enter a valid SRMIST email in the format ab1234@srmist.edu.in.";
      }
    });

    const seenRegistrationNumbers = new Map<string, number>();
    const seenPhoneNumbers = new Map<string, number>();
    const seenEmails = new Map<string, number>();

    formData.teamMembers.forEach((member, index) => {
      const studentNumber = index + 1;
      const baseKey = `teamMembers.${index}`;

      const registrationNumber = member.registrationNumber.trim().toLowerCase();

      const phoneNumber = member.phoneNumber.trim();

      const email = member.srmMailId.trim().toLowerCase();

      if (registrationNumber) {
        if (seenRegistrationNumbers.has(registrationNumber)) {
          const firstStudent = seenRegistrationNumbers.get(registrationNumber)!;

          validationErrors[`${baseKey}.registrationNumber`] =
            `Each member must have a unique register number.`;
        } else {
          seenRegistrationNumbers.set(registrationNumber, studentNumber);
        }
      }

      if (phoneNumber) {
        if (seenPhoneNumbers.has(phoneNumber)) {
          const firstStudent = seenPhoneNumbers.get(phoneNumber)!;

          validationErrors[`${baseKey}.phoneNumber`] =
            `Each member must have a unique phone number.`;
        } else {
          seenPhoneNumbers.set(phoneNumber, studentNumber);
        }
      }

      if (email) {
        if (seenEmails.has(email)) {
          const firstStudent = seenEmails.get(email)!;

          validationErrors[`${baseKey}.srmMailId`] =
            `Each member must have a unique SRMIST email.`;
        } else {
          seenEmails.set(email, studentNumber);
        }
      }
    });

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (formData.teamMembers.length !== 4) {
      setSubmitSuccess(false);
      setSubmitMessage("Debug the Campus requires exactly 4 members.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        event: "Debug the Campus",
        team_name: formData.teamName.trim(),
        members: formData.teamMembers.map((member, index) => ({
          name: member.name.trim(),
          regno: member.registrationNumber.trim(),
          email: member.srmMailId.trim().toLowerCase(),
          phone: member.phoneNumber.trim(),
          is_leader: index === 0,
        })),
      };

      const response = await fetch(`${API_BASE_URL}/register/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result: unknown = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        let backendMessage = "Registration failed. Please try again.";

        if (typeof result === "object" && result !== null) {
          const data = result as {
            detail?: unknown;
            message?: unknown;
          };

          if (typeof data.detail === "string") {
            backendMessage = data.detail;
          } else if (Array.isArray(data.detail)) {
            backendMessage = data.detail
              .map((item) => {
                if (
                  typeof item === "object" &&
                  item !== null &&
                  "msg" in item
                ) {
                  return String((item as { msg?: unknown }).msg ?? "");
                }

                return String(item);
              })
              .filter(Boolean)
              .join(" ");
          } else if (typeof data.message === "string") {
            backendMessage = data.message;
          }
        }

        throw new Error(backendMessage);
      }

      setSubmitSuccess(true);
      setSubmitMessage("Registration Successful!");
      setErrors({});

      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      setSubmitSuccess(false);

      if (error instanceof Error && error.message) {
        setSubmitMessage(error.message);
      } else {
        setSubmitMessage("Unable to complete registration. Please try again.");
      }
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
            src="/alexaverse3.0/icon.svg"
            alt="Alexa Developers SRM Icon"
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
        id="register-debug"
        className="relative w-full min-h-screen text-white overflow-hidden"
        style={{ fontFamily: "'Crimson Pro', serif" }}
      >
        <div className="relative z-10 w-full flex flex-col items-center px-3 sm:px-4 py-10 sm:py-16">
          <div className="w-full flex justify-center px-2 sm:px-6 lg:px-10 mb-8 sm:mb-12">
            <Image
              src="/alexaverse3.0/debug-banner.svg"
              alt="Debug the Campus"
              width={1055}
              height={755}
              priority
              className="hidden sm:block w-full max-w-[1055px] h-auto object-contain"
            />

            <Image
              src="/alexaverse3.0/debug-banner-mobile.svg"
              alt="Debug the Campus"
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
            className="w-full max-w-6xl space-y-8"
          >
            <div className="space-y-6">
              <div className="max-w-md mx-auto">
                <label
                  htmlFor="teamName"
                  className="block mb-2 font-semibold text-white"
                >
                  Team Name<span className="text-white">*</span>
                </label>

                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleTeamNameChange}
                  placeholder="Enter team name"
                  className={`w-full px-4 py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
                    errors.teamName ? "border-red-500" : "border-gray-400"
                  }`}
                />

                {errors.teamName && (
                  <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>
                )}
              </div>
            </div>

            {[1, 2, 3, 4].map((studentNum) => (
              <div key={studentNum} className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-center text-white">
                  Student {studentNum}{" "}
                  {studentNum === 1 ? (
                    <>
                      (Team Leader)
                      <span className="text-white">*</span>
                    </>
                  ) : (
                    <span className="text-white">*</span>
                  )}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor={`name-${studentNum}`}
                      className="block mb-2 text-white"
                    >
                      Name<span className="text-white">*</span>
                    </label>

                    <input
                      type="text"
                      id={`name-${studentNum}`}
                      value={formData.teamMembers[studentNum - 1].name}
                      onChange={(e) =>
                        handleMemberChange(
                          studentNum - 1,
                          "name",
                          e.target.value,
                        )
                      }
                      placeholder="Name"
                      className={`w-full px-4 py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
                        errors[`teamMembers.${studentNum - 1}.name`]
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    />

                    {errors[`teamMembers.${studentNum - 1}.name`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`teamMembers.${studentNum - 1}.name`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`registrationNumber-${studentNum}`}
                      className="block mb-2 text-white"
                    >
                      Register Number
                      <span className="text-white">*</span>
                    </label>

                    <input
                      type="text"
                      id={`registrationNumber-${studentNum}`}
                      value={
                        formData.teamMembers[studentNum - 1].registrationNumber
                      }
                      onChange={(e) =>
                        handleMemberChange(
                          studentNum - 1,
                          "registrationNumber",
                          e.target.value,
                        )
                      }
                      placeholder="RAXXXXXXXXXXXXX"
                      className={`w-full px-4 py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
                        errors[
                          `teamMembers.${studentNum - 1}.registrationNumber`
                        ]
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    />

                    {errors[
                      `teamMembers.${studentNum - 1}.registrationNumber`
                    ] && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors[
                            `teamMembers.${studentNum - 1}.registrationNumber`
                          ]
                        }
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`phoneNumber-${studentNum}`}
                      className="block mb-2 text-white"
                    >
                      Phone Number
                      <span className="text-white">*</span>
                    </label>

                    <div
                      className={`w-full flex items-center border rounded bg-white focus-within:ring-2 focus-within:ring-purple-500 overflow-hidden ${
                        errors[`teamMembers.${studentNum - 1}.phoneNumber`]
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    >
                      <span className="px-3 text-black text-md border-r border-gray-400">
                        +91&nbsp;
                      </span>

                      <input
                        type="tel"
                        id={`phoneNumber-${studentNum}`}
                        value={formData.teamMembers[studentNum - 1].phoneNumber}
                        onChange={(e) =>
                          handleMemberChange(
                            studentNum - 1,
                            "phoneNumber",
                            e.target.value,
                          )
                        }
                        placeholder="0123456789"
                        className="flex-1 px-3 py-4 text-black placeholder-gray-500 bg-white focus:outline-none"
                      />
                    </div>

                    {errors[`teamMembers.${studentNum - 1}.phoneNumber`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`teamMembers.${studentNum - 1}.phoneNumber`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`srmMailId-${studentNum}`}
                      className="block mb-2 text-white"
                    >
                      SRMIST Email
                      <span className="text-white">*</span>
                    </label>

                    <input
                      type="email"
                      id={`srmMailId-${studentNum}`}
                      value={formData.teamMembers[studentNum - 1].srmMailId}
                      onChange={(e) =>
                        handleMemberChange(
                          studentNum - 1,
                          "srmMailId",
                          e.target.value,
                        )
                      }
                      placeholder="ab1234@srmist.edu.in"
                      className={`w-full px-4 py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
                        errors[`teamMembers.${studentNum - 1}.srmMailId`]
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    />

                    {errors[`teamMembers.${studentNum - 1}.srmMailId`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`teamMembers.${studentNum - 1}.srmMailId`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center text-white">
              <p className="text-2xl mb-2">Team Size: 4 members</p>

              <p className="text-lg text-white">All 4 members are required</p>
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
                alt="Register Team"
                width={500}
                height={200}
                className="w-full h-auto object-contain"
              />

              <span
                className="absolute inset-0 flex items-center justify-center text-black font-bold text-4xl tracking-[2px]"
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

export default RegisterDebug;
