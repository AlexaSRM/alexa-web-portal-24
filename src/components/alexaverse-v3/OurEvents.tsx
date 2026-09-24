import React from "react";
import Image from "next/image";
import Link from "next/link";

const SECTION_BACKGROUND_COLOR = "#050414";
const SECTION_BACKGROUND_IMAGE = "/alexaverse3.0/our-events-background.svg";
const SECTION_VIGNETTE_IMAGE = "/alexaverse3.0/our events-vignette.svg";
const HEADING_IMAGE = "/alexaverse3.0/our-events-header.svg";
const REGISTER_BUTTON_IMAGE = "/alexaverse3.0/our-events-register-button.svg";

const COMPOSITIONS = {
  desktop: {
    src: "/alexaverse3.0/our-events-complete-desktop.svg",
    width: 1232,
    height: 3655,
  },
  mobile: {
    src: "/alexaverse3.0/our-events-complete-mobile.svg",
    width: 291,
    height: 3290,
  },
} as const;

interface ButtonPlacement {
  left: string;
  top: string;
  width: string;
}

interface RegistrationButton {
  name: string;
  href: string;
  desktop: ButtonPlacement;
  mobile: ButtonPlacement;
}

const registrationButtons: RegistrationButton[] = [
  {
    name: "Ideathon",
    href: "/alexaverse-v3/RegisterIdeathon",
    desktop: {
      left: "61.9%",
      top: "20.5%",
      width: "22.0%",
    },
    mobile: {
      left: "27.0%",
      top: "21.5%",
      width: "46.0%",
    },
  },
  {
    name: "Workshop",
    href: "/alexaverse-v3/RegisterWorkshop",
    desktop: {
      left: "16.4%",
      top: "44.2%",
      width: "21.7%",
    },
    mobile: {
      left: "27.0%",
      top: "45.8%",
      width: "46.0%",
    },
  },
  {
    name: "Debug the Campus",
    href: "/alexaverse-v3/RegisterDebug",
    desktop: {
      left: "61.9%",
      top: "67.1%",
      width: "21.7%",
    },
    mobile: {
      left: "27.0%",
      top: "69.9%",
      width: "46.0%",
    },
  },
  {
    name: "Reel It",
    href: "/alexaverse-v3/RegisterReelit",
    desktop: {
      left: "16.7%",
      top: "90.1%",
      width: "21.7%",
    },
    mobile: {
      left: "27.0%",
      top: "94.1%",
      width: "46.0%",
    },
  },
];

function RegisterOverlayButton({
  button,
  layout,
}: {
  button: RegistrationButton;
  layout: "desktop" | "mobile";
}) {
  const placement = button[layout];

  return (
    <Link
      href={button.href}
      aria-label={`Register now for ${button.name}`}
      className="
        absolute z-10 block
        transition-transform duration-200
        hover:scale-[1.04]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#a855f7]
      "
      style={{
        left: placement.left,
        top: placement.top,
        width: placement.width,
      }}
    >
      <Image
        src={REGISTER_BUTTON_IMAGE}
        alt=""
        width={285}
        height={60}
        className="h-auto w-full"
      />
    </Link>
  );
}

function Composition({
  layout,
  className,
}: {
  layout: "desktop" | "mobile";
  className: string;
}) {
  const composition = COMPOSITIONS[layout];

  return (
    <div className={`relative w-full ${className}`}>
      <Image
        src={composition.src}
        alt=""
        width={composition.width}
        height={composition.height}
        className="block h-auto w-full select-none"
        draggable={false}
      />

      {registrationButtons.map((button) => (
        <RegisterOverlayButton
          key={button.name}
          button={button}
          layout={layout}
        />
      ))}
    </div>
  );
}

const OurEvents: React.FC = () => {
  return (
    <section
      id="events"
      className="relative w-full overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:px-12"
      style={{ backgroundColor: SECTION_BACKGROUND_COLOR }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src={SECTION_BACKGROUND_IMAGE}
          alt=""
          fill
          className="object-cover object-top origin-top -translate-y-[800px] sm:translate-y-0 sm:object-center"
        />

        <Image
          src={SECTION_VIGNETTE_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
        />

        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-black via-black/70 to-transparent" />

        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center">
        <div className="flex w-full items-center justify-center">
          <Image
            src={HEADING_IMAGE}
            alt="Our Events"
            width={1000}
            height={160}
            priority
            className="h-auto w-full max-w-[1000px] object-contain"
          />
        </div>

        <div className="mt-6 w-full sm:mt-8">
          <Composition layout="desktop" className="hidden sm:block" />
          <Composition layout="mobile" className="sm:hidden" />
        </div>
      </div>
    </section>
  );
};

export default OurEvents;
