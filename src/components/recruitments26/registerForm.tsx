"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FieldId =
  | "name"
  | "registrationNumber"
  | "phoneNumber"
  | "srmistEmail"
  | "githubProfile"
  | "linkedinProfile";

type FormData = {
  name: string;
  registrationNumber: string;
  phoneNumber: string;
  srmistEmail: string;
  githubProfile: string;
  linkedinProfile: string;
  firstDomain: string;
  secondDomain: string;
};

type DomainOptionProps = {
  name: "firstDomain" | "secondDomain";
  value: string;
  selectedValue: string;
  label: string;
};

const ACCENT_RED = "#C32325";

const FONT_FAMILY =
  "var(--font-formula1), var(--font-montserrat-alternates), sans-serif";

const DOMAIN_OPTIONS = ["Technical", "Creatives", "Events", "Business"];

const INITIAL_FORM_DATA: FormData = {
  name: "",
  registrationNumber: "",
  phoneNumber: "",
  srmistEmail: "",
  githubProfile: "",
  linkedinProfile: "",
  firstDomain: "",
  secondDomain: "",
};

function FieldBox({
  field,
  value,
}: {
  field: {
    id: FieldId;
    label: string;
    type: string;
    placeholder: string;
    countryCode?: string;
  };
  value: string;
}) {
  return (
    <div>
      <label
        htmlFor={field.id}
        className="block font-extrabold mb-3"
        style={{
          color: ACCENT_RED,
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          lineHeight: "1.15",
          letterSpacing: "0.33px",
        }}
      >
        {field.label}
      </label>

      <div
        className="flex items-stretch overflow-hidden rounded-2xl"
        style={{
          backgroundColor: "#5D5D5D",
          border: "2px solid #FFFFFF",
          opacity: 0.65,
        }}
      >
        {field.countryCode && (
          <span
            className="flex items-center px-4 font-normal text-white/70 border-r border-white/10"
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 18,
            }}
          >
            {field.countryCode}
          </span>
        )}

        <input
          id={field.id}
          name={field.id}
          type={field.type}
          value={value}
          disabled
          placeholder="Registrations Closed"
          className="w-full bg-transparent px-5 py-4 font-normal text-white outline-none cursor-not-allowed"
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 18,
            lineHeight: "1.2",
            letterSpacing: "0.17px",
          }}
        />
      </div>
    </div>
  );
}

function DomainOption({ value, label }: DomainOptionProps) {
  return (
    <button
      type="button"
      disabled
      className="flex items-center gap-3 cursor-not-allowed opacity-50"
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full border-2"
        style={{
          borderColor: "#918C8C",
        }}
      />

      <span
        className="font-extrabold text-white"
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 18,
        }}
      >
        {label}
      </span>
    </button>
  );
}

const FIELDS: {
  id: FieldId;
  label: string;
  type: string;
  placeholder: string;
  countryCode?: string;
}[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Name",
  },
  {
    id: "registrationNumber",
    label: "Register Number",
    type: "text",
    placeholder: "RAXXXXXXXXXXXXX",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "012 345 6789",
    countryCode: "+91",
  },
  {
    id: "srmistEmail",
    label: "SRMIST Email",
    type: "email",
    placeholder: "ab1234@srmist.edu.in",
  },
  {
    id: "githubProfile",
    label: "Github Profile Link",
    type: "text",
    placeholder: "Optional",
  },
  {
    id: "linkedinProfile",
    label: "LinkedIn Profile Link",
    type: "text",
    placeholder: "Optional",
  },
];

export default function RegistrationForm() {
  const router = useRouter();

  const registrationOpen = false;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formData] = useState<FormData>(INITIAL_FORM_DATA);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!registrationOpen) return;
  };

  return (
    <section
      className="registration-section relative w-full"
      style={{
        backgroundImage: "url('/recruitments26/image32645.svg')",
        backgroundSize: "100% auto",
        backgroundPosition: "center -340px",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
      }}
    >
      <style>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.60);
          opacity: 1;
        }

        .registration-section {
          background-position: center -340px !important;
        }

        @media (max-width: 767px) {
          .registration-section {
            background-position: center -120px !important;
          }
        }
      `}</style>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-between px-8 py-16 lg:hidden"
          style={{
            background:
              "radial-gradient(ellipse at center, #6b0000 0%, #1a0000 50%, #000000 100%)",
          }}
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center"
          >
            <span className="absolute block h-[3px] w-8 rotate-45 rounded-full bg-white" />
            <span className="absolute block h-[3px] w-8 -rotate-45 rounded-full bg-white" />
          </button>

          <div className="flex flex-1 flex-col items-center justify-center gap-12">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push("/recruitments26#home");
              }}
              className="text-3xl font-bold tracking-wide text-white transition-colors hover:text-red-400"
            >
              Home
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push("/recruitments26#domain");
              }}
              className="text-3xl font-bold tracking-wide text-white transition-colors hover:text-red-400"
            >
              Domain
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push("/recruitments26#roadmap");
              }}
              className="text-3xl font-bold tracking-wide text-white transition-colors hover:text-red-400"
            >
              Roadmap
            </button>
          </div>

          <button
            className="w-full max-w-[260px] rounded-full bg-[#C32325] py-4 text-xl font-bold text-white shadow-[0_0_20px_rgba(195,35,37,0.5)] transition-all hover:scale-105 hover:bg-[#a01c1e] active:scale-95"
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push("/recruitment26registerform");
            }}
          >
            Register Now
          </button>
        </div>
      )}

      <nav className="relative z-50 flex w-full items-center justify-between px-4 py-4 sm:px-8 sm:py-6 md:px-12">
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/recruitments26/Vector.svg"
            alt="Alexa Logo"
            width={32}
            height={32}
            className="h-6 w-6 sm:h-8 sm:w-8"
          />

          <span className="text-base font-medium tracking-wide text-white sm:text-lg">
            Alexa Developers SRM
          </span>
        </div>

        <div className="relative hidden h-[26px] w-[420px] lg:block xl:h-[32px] xl:w-[520px]">
          <Image
            src="/recruitments26/Nav buttons.svg"
            alt="Navigation links"
            fill
            className="object-contain"
          />

          <button
            onClick={() => router.push("/recruitments26#home")}
            className="absolute left-0 top-0 h-full w-[12.5%] cursor-pointer"
            aria-label="Home"
          />

          <button
            onClick={() => router.push("/recruitments26#domain")}
            className="absolute left-[19.8%] top-0 h-full w-[16.4%] cursor-pointer"
            aria-label="Domain"
          />

          <button
            onClick={() => router.push("/recruitments26#roadmap")}
            className="absolute left-[43.1%] top-0 h-full w-[21.1%] cursor-pointer"
            aria-label="Roadmap"
          />

          <button
            onClick={() => router.push("/recruitment26registerform")}
            className="absolute right-0 top-0 h-full w-[29.4%] cursor-pointer rounded-full transition-colors hover:bg-white/10"
            aria-label="Register Now"
          />
        </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="block h-[3px] w-7 rounded-full bg-white" />
          <span className="block h-[3px] w-7 rounded-full bg-white" />
          <span className="block h-[3px] w-7 rounded-full bg-white" />
        </button>
      </nav>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-6xl px-6 pt-5 pb-16 md:px-10 md:pt-16 lg:px-16"
      >
        <h1
          className="mb-16 text-center font-extrabold"
          style={{
            color: ACCENT_RED,
            fontFamily: FONT_FAMILY,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1,
            letterSpacing: "0.1px",
          }}
        >
          <span className="block sm:hidden">
            Registration
            <br />
            Closed
          </span>

          <span className="hidden sm:block">Registrations Closed</span>
        </h1>

        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
          {FIELDS.map((field) => (
            <FieldBox key={field.id} field={field} value={formData[field.id]} />
          ))}
        </div>

        <div className="mt-16">
          <h2
            className="mb-10 text-center font-extrabold text-white"
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "clamp(24px, 3vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "0.33px",
              opacity: 0.6,
            }}
          >
            Choose Your First Domain
          </h2>

          <div className="mx-auto grid w-fit grid-cols-1 gap-x-24 gap-y-7 opacity-60 sm:grid-cols-2">
            {DOMAIN_OPTIONS.map((domain) => (
              <DomainOption
                key={`first-${domain}`}
                name="firstDomain"
                value={domain}
                selectedValue={formData.firstDomain}
                label={domain}
              />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2
            className="mb-10 text-center font-extrabold text-white"
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: "clamp(24px, 3vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "0.33px",
              opacity: 0.6,
            }}
          >
            Choose Your Second Domain
          </h2>

          <div className="mx-auto grid w-fit grid-cols-1 gap-x-24 gap-y-7 opacity-60 sm:grid-cols-2">
            {DOMAIN_OPTIONS.map((domain) => (
              <DomainOption
                key={`second-${domain}`}
                name="secondDomain"
                value={domain}
                selectedValue={formData.secondDomain}
                label={domain}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button
            type="submit"
            disabled
            className="flex items-center justify-center rounded-full border-2 font-extrabold text-white cursor-not-allowed"
            style={{
              width: "min(427px, 80vw)",
              height: 72,
              backgroundColor: "#C32325",
              borderColor: "#FFFFFF",
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              opacity: 0.65,
            }}
          >
            Registrations Closed
          </button>
        </div>
      </form>

      <div
        className="mx-auto"
        style={{
          width: "calc(100% - 120px)",
          height: "3px",
          backgroundColor: "#C32325",
        }}
      />
    </section>
  );
}
