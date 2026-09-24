"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TeamRegistration, TeamMember } from "@/lib/api";

const STORAGE_KEY = process.env.NEXT_PUBLIC_IDEATHON_REGISTRATION_STORAGE_KEY;

const RegisterIdeathon: React.FC = () => {
  const router = useRouter();
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
      const savedRegistration = sessionStorage.getItem(STORAGE_KEY);

      if (savedRegistration) {
        const parsedData = JSON.parse(savedRegistration);

        if (
          parsedData &&
          typeof parsedData === "object" &&
          Array.isArray(parsedData.teamMembers)
        ) {
          setFormData({
            teamName: parsedData.teamName || "",
            teamMembers: [
              parsedData.teamMembers[0] || {
                name: "",
                registrationNumber: "",
                srmMailId: "",
                phoneNumber: "",
              },
              parsedData.teamMembers[1] || {
                name: "",
                registrationNumber: "",
                srmMailId: "",
                phoneNumber: "",
              },
              parsedData.teamMembers[2] || {
                name: "",
                registrationNumber: "",
                srmMailId: "",
                phoneNumber: "",
              },
              parsedData.teamMembers[3] || {
                name: "",
                registrationNumber: "",
                srmMailId: "",
                phoneNumber: "",
              },
            ],
          });
        }
      }
    } catch (error) {
      console.error("Unable to restore saved registration:", error);
      sessionStorage.removeItem(STORAGE_KEY);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...formData,
          createdAt: Date.now(),
        }),
      );
    } catch (error) {
      console.error("Unable to save registration:", error);
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

    const validMembers = formData.teamMembers.filter(
      (member) =>
        member.name.trim() !== "" ||
        member.registrationNumber.trim() !== "" ||
        member.phoneNumber.trim() !== "" ||
        member.srmMailId.trim() !== "",
    );

    const firstTwoMembers = formData.teamMembers.slice(0, 2);

    firstTwoMembers.forEach((member, index) => {
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

    const optionalMembers = formData.teamMembers.slice(2);

    optionalMembers.forEach((member, index) => {
      const actualIndex = index + 2;
      const studentNumber = actualIndex + 1;
      const baseKey = `teamMembers.${actualIndex}`;

      const hasAnyValue =
        member.name.trim() !== "" ||
        member.registrationNumber.trim() !== "" ||
        member.phoneNumber.trim() !== "" ||
        member.srmMailId.trim() !== "";

      if (!hasAnyValue) {
        return;
      }

      if (!member.name.trim()) {
        validationErrors[`${baseKey}.name`] =
          `Student ${studentNumber} name is required if this member is added.`;
      } else if (!nameRegex.test(member.name.trim())) {
        validationErrors[`${baseKey}.name`] =
          "Name can contain only letters and spaces.";
      }

      if (!member.registrationNumber.trim()) {
        validationErrors[`${baseKey}.registrationNumber`] =
          `Student ${studentNumber} register number is required if this member is added.`;
      } else if (
        !registrationNumberRegex.test(member.registrationNumber.trim())
      ) {
        validationErrors[`${baseKey}.registrationNumber`] =
          "Register number must be RA followed by exactly 13 digits.";
      }

      if (!member.phoneNumber.trim()) {
        validationErrors[`${baseKey}.phoneNumber`] =
          `Student ${studentNumber} phone number is required if this member is added.`;
      } else if (!phoneRegex.test(member.phoneNumber.trim())) {
        validationErrors[`${baseKey}.phoneNumber`] =
          "Phone number must contain exactly 10 digits.";
      }

      if (!member.srmMailId.trim()) {
        validationErrors[`${baseKey}.srmMailId`] =
          `Student ${studentNumber} SRMIST email is required if this member is added.`;
      } else if (!emailRegex.test(member.srmMailId.trim())) {
        validationErrors[`${baseKey}.srmMailId`] =
          "Enter a valid SRMIST email in the format ab1234@srmist.edu.in.";
      }
    });

    const seenRegistrationNumbers = new Map<string, number>();
    const seenPhoneNumbers = new Map<string, number>();
    const seenEmails = new Map<string, number>();

    validMembers.forEach((member, index) => {
      const studentNumber = index + 1;

      const registrationNumber = member.registrationNumber.trim().toLowerCase();

      const phoneNumber = member.phoneNumber.trim();

      const email = member.srmMailId.trim().toLowerCase();

      if (registrationNumber) {
        if (seenRegistrationNumbers.has(registrationNumber)) {
          const firstStudent = seenRegistrationNumbers.get(registrationNumber)!;

          validationErrors[`teamMembers.${index}.registrationNumber`] =
            `Each member must have a unique register number.`;
        } else {
          seenRegistrationNumbers.set(registrationNumber, studentNumber);
        }
      }

      if (phoneNumber) {
        if (seenPhoneNumbers.has(phoneNumber)) {
          const firstStudent = seenPhoneNumbers.get(phoneNumber)!;

          validationErrors[`teamMembers.${index}.phoneNumber`] =
            `Each member must have a unique phone number.`;
        } else {
          seenPhoneNumbers.set(phoneNumber, studentNumber);
        }
      }

      if (email) {
        if (seenEmails.has(email)) {
          const firstStudent = seenEmails.get(email)!;

          validationErrors[`teamMembers.${index}.srmMailId`] =
            `Each member must have a unique email.`;
        } else {
          seenEmails.set(email, studentNumber);
        }
      }
    });

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitMessage("");
    setSubmitSuccess(null);
    setErrors({});

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitSuccess(false);
      setSubmitMessage(
        "Please correct the highlighted fields before continuing.",
      );
      return;
    }

    const validMembers = formData.teamMembers.filter(
      (member) =>
        member.name.trim() !== "" ||
        member.registrationNumber.trim() !== "" ||
        member.phoneNumber.trim() !== "" ||
        member.srmMailId.trim() !== "",
    );

    if (validMembers.length < 2) {
      setSubmitSuccess(false);
      setSubmitMessage("Team must have at least 2 members.");
      return;
    }

    if (validMembers.length > 4) {
      setSubmitSuccess(false);
      setSubmitMessage("Team can have maximum 4 members.");
      return;
    }

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...formData,
          teamMembers: validMembers,
          createdAt: Date.now(),
        }),
      );

      router.push("/alexaverse-v3/IdeathonPayment");
    } catch (error) {
      console.error(error);
      setSubmitSuccess(false);
      setSubmitMessage(
        "Unable to save your registration details. Please try again.",
      );
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
        id="register-ideathon"
        className="relative w-full min-h-screen text-white overflow-hidden"
        style={{ fontFamily: "'Crimson Pro', serif" }}
      >
        <div className="relative z-10 w-full flex flex-col items-center px-3 sm:px-4 py-10 sm:py-16">
          <div className="w-full flex justify-center px-0 sm:px-6 lg:px-10 mb-8 sm:mb-12">
            <Image
              src="/alexaverse3.0/ideathon-banner.svg"
              alt="Ideathon"
              width={1055}
              height={755}
              priority
              className="hidden sm:block w-full max-w-[1055px] h-auto object-contain"
            />

            <Image
              src="/alexaverse3.0/ideathon-banner-mobile.svg"
              alt="Ideathon"
              width={700}
              height={900}
              priority
              className="block sm:hidden w-full max-w-[390px] h-auto object-contain"
            />
          </div>

          <div className="w-full flex justify-center mb-7 sm:mb-10">
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
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
                    errors.teamName ? "border-red-500" : "border-gray-400"
                  }`}
                />

                {errors.teamName && (
                  <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>
                )}
              </div>
            </div>

            {[1, 2, 3, 4].map((studentNum) => (
              <div key={studentNum} className="space-y-5 sm:space-y-6">
                <h3 className="text-lg sm:text-2xl font-semibold text-center text-white">
                  Student {studentNum}{" "}
                  {studentNum === 1 ? (
                    <>
                      (Team Leader) <span className="text-white">*</span>
                    </>
                  ) : studentNum === 2 ? (
                    <span className="text-white">*</span>
                  ) : (
                    "(Optional)"
                  )}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                  <div>
                    <label
                      htmlFor={`name-${studentNum}`}
                      className="block mb-2 text-white"
                    >
                      Name
                      {studentNum <= 2 ? (
                        <span className="text-white">*</span>
                      ) : null}
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
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
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
                      {studentNum <= 2 ? (
                        <span className="text-white">*</span>
                      ) : null}
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
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
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
                      {studentNum <= 2 ? (
                        <span className="text-white">*</span>
                      ) : null}
                    </label>

                    <div
                      className={`w-full flex items-center border rounded bg-white focus-within:ring-2 focus-within:ring-purple-500 overflow-hidden ${
                        errors[`teamMembers.${studentNum - 1}.phoneNumber`]
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    >
                      <span className="px-2 sm:px-3 text-black text-md border-r border-gray-400">
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
                        className="flex-1 px-2 sm:px-3 py-3 sm:py-4 text-black placeholder-gray-500 bg-white focus:outline-none"
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
                      {studentNum <= 2 ? (
                        <span className="text-white">*</span>
                      ) : null}
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
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-black bg-white ${
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

            <div className="text-center text-white px-2">
              <p className="text-xl sm:text-2xl mb-2">Team Size: 2-4 members</p>

              <p className="text-base sm:text-lg text-white">
                First 2 members are required, members 3-4 are optional
              </p>
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
                className="absolute inset-0 flex items-center justify-center text-black font-bold text-3xl sm:text-4xl tracking-[2px]"
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

export default RegisterIdeathon;
