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

export default function TeamRegisterForm(props: Props) {
  const [teamName, setTeamName] = React.useState("");
  const [teamMembers, setTeamMembers] = React.useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      registrationNumber: "",
      department: "",
    },
    {
      firstName: "",
      lastName: "",
      email: "",
      registrationNumber: "",
      department: "",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const { toast } = useToast();
  const router = useRouter();

  const handleInputChange = (index: number, field: string, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index][field as keyof (typeof teamMembers)[0]] = value;
    setTeamMembers(newTeamMembers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const responseData: any = await registerUser(props.event.slug, {
        teamName,
        teamMembers: [
          {
            firstName: teamMembers[0].firstName,
            lastName: teamMembers[0].lastName,
            srmMailId: teamMembers[0].email,
            registrationNumber: teamMembers[0].registrationNumber,
            department: teamMembers[0].department,
          },
          {
            firstName: teamMembers[1].firstName,
            lastName: teamMembers[1].lastName,
            srmMailId: teamMembers[1].email,
            registrationNumber: teamMembers[1].registrationNumber,
            department: teamMembers[1].department,
          },
        ],
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
        <LabelInputContainer className="mb-4">
          <Label htmlFor="teamName">Team Name</Label>
          <Input
            id="teamName"
            placeholder="Team Panda"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            disabled={isSubmitting}
          />
        </LabelInputContainer>

        {teamMembers.map((member, index) => (
          <div key={index} className="space-y-4 mb-8">
            <h3 className="font-bold text-lg text-[#980f35]">
              Member {index + 1}
            </h3>
            <LabelInputContainer>
              <Label htmlFor={`firstName${index}`}>First Name</Label>
              <Input
                id={`firstName${index}`}
                placeholder="First Name"
                type="text"
                value={member.firstName}
                onChange={(e) =>
                  handleInputChange(index, "firstName", e.target.value)
                }
                disabled={isSubmitting}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor={`lastName${index}`}>Last Name</Label>
              <Input
                id={`lastName${index}`}
                placeholder="Last Name"
                type="text"
                value={member.lastName}
                onChange={(e) =>
                  handleInputChange(index, "lastName", e.target.value)
                }
                disabled={isSubmitting}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor={`email${index}`}>SRM Email Address</Label>
              <Input
                id={`email${index}`}
                placeholder="Email Address"
                type="email"
                value={member.email}
                onChange={(e) =>
                  handleInputChange(index, "email", e.target.value)
                }
                disabled={isSubmitting}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor={`registrationNumber${index}`}>
                Registration Number
              </Label>
              <Input
                id={`registrationNumber${index}`}
                placeholder="Registration Number"
                type="text"
                value={member.registrationNumber}
                onChange={(e) =>
                  handleInputChange(index, "registrationNumber", e.target.value)
                }
                disabled={isSubmitting}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor={`department${index}`}>Department</Label>
              <Input
                id={`department${index}`}
                placeholder="Department"
                type="text"
                value={member.department}
                onChange={(e) =>
                  handleInputChange(index, "department", e.target.value)
                }
                disabled={isSubmitting}
              />
            </LabelInputContainer>
          </div>
        ))}

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
