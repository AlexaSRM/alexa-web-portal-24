"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AlexaVerse } from "@/sanity/schemas/alexaverse-schema";
import { registerUser } from "@/app/(flagship)/alexaverse/register/[eventSlug]/api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  event: AlexaVerse;
};

export default function SingleRegisterForm(props: Props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [registrationNumber, setRegistrationNumber] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const responseData: any = await registerUser(props.event.slug, {
        firstName,
        lastName,
        srmMailId: email,
        registrationNumber,
        department,
      });
      console.log(responseData);
      if (responseData?.success) {
        console.log("Registration successful");
        toast({
          title: `Yoho! Welcome to the Verse! 🐼`,
        });
        router.push('/alexaverse');
      } else {
        throw new Error(
          `Registration failed: ${
            responseData?.message || responseData.error.issues[0].message
          }`
        );
      }
    } catch (error: any) {
      console.error(error?.message);
      setError(error?.message || "Registration failed");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md text-[#980f35] tracking-wider w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold tracking-widest text-xl text-[#980f35]">
        Welcome to AlexaVerse
      </h2>
      <Image
        src={props.event.ticket}
        alt={props.event.title}
        width={630}
        height={400}
        objectFit="contain"
        className="sponsor-image pt-4"
      />
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Lord"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isSubmitting}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Harsh"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isSubmitting}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">SRM Email Address</Label>
          <Input
            id="email"
            placeholder="alexadevsrmtechnical@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            id="registrationNumber"
            placeholder="RA2211027010190"
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            disabled={isSubmitting}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            placeholder="DSBS"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            disabled={isSubmitting}
          />
        </LabelInputContainer>

        <button
          className={cn(
            "bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register →"}
          <BottomGradient />
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
