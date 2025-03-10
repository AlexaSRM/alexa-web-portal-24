// In /lib/actions/team-registration.js
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

// Define Zod schema for validation
const phoneRegex = /^[0-9]{10}$/;
const regNumberRegex = /^RA\d{13}$/;
const srmEmailRegex = /^[a-z0-9._%+-]+@srmist\.edu\.in$/i;

const memberSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format").regex(srmEmailRegex, "Must be a valid SRM email"),
    phone: z.string().regex(phoneRegex, "Phone must be exactly 10 digits"),
    registrationNumber: z.string().regex(regNumberRegex, "Must be in format RAXXXXXXXXXXXXXX")
});

// Create a conditional member schema that validates all fields if any field is provided
const conditionalMemberSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    registrationNumber: z.string().optional()
}).refine(
    data => {
        // Check if any field is filled
        const hasAnyField = data.name || data.email || data.phone || data.registrationNumber;
        
        // If any field is filled, all fields should be filled
        if (hasAnyField) {
            return data.name && data.email && data.phone && data.registrationNumber;
        }
        
        // If no fields are filled, that's also valid (entirely optional member)
        return true;
    },
    {
        message: "If any field is provided, all fields must be completed for this member",
        path: ["incomplete"]
    }
).superRefine((data, ctx) => {
    // Only validate fields if they exist
    if (data.name) {
        try {
            z.string().min(2, "Name must be at least 2 characters").parse(data.name);
        } catch (error) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Name must be at least 2 characters",
                path: ["name"]
            });
        }
    }
    
    if (data.email) {
        try {
            z.string().email("Invalid email format").regex(srmEmailRegex, "Must be a valid SRM email").parse(data.email);
        } catch (error) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Must be a valid SRM email",
                path: ["email"]
            });
        }
    }
    
    if (data.phone) {
        try {
            z.string().regex(phoneRegex, "Phone must be exactly 10 digits").parse(data.phone);
        } catch (error) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Phone must be exactly 10 digits",
                path: ["phone"]
            });
        }
    }
    
    if (data.registrationNumber) {
        try {
            z.string().regex(regNumberRegex, "Must be in format RAXXXXXXXXXXXXXX").parse(data.registrationNumber);
        } catch (error) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Must be in format RAXXXXXXXXXXXXXX",
                path: ["registrationNumber"]
            });
        }
    }
});

const teamSchema = z.object({
    teamName: z.string().min(3, "Team name must be at least 3 characters"),
    members: z.tuple([
        memberSchema, // Member 1 (required)
        memberSchema, // Member 2 (required)
        conditionalMemberSchema, // Member 3 (conditional)
        conditionalMemberSchema  // Member 4 (conditional)
    ])
});

export async function registerTeam(prevState: any, formData: FormData) {
    try {
        // Parse form data into objects
        const rawData = {
            teamName: formData.get("teamName") as string,
            members: [
                {
                    name: formData.get("member1Name") as string,
                    email: formData.get("member1Email") as string,
                    phone: formData.get("member1Phone") as string,
                    registrationNumber: formData.get("member1RegistrationNumber") as string,
                },
                {
                    name: formData.get("member2Name") as string,
                    email: formData.get("member2Email") as string,
                    phone: formData.get("member2Phone") as string,
                    registrationNumber: formData.get("member2RegistrationNumber") as string,
                },
                {
                    name: formData.get("member3Name") as string || "",
                    email: formData.get("member3Email") as string || "",
                    phone: formData.get("member3Phone") as string || "",
                    registrationNumber: formData.get("member3RegistrationNumber") as string || "",
                },
                {
                    name: formData.get("member4Name") as string || "",
                    email: formData.get("member4Email") as string || "",
                    phone: formData.get("member4Phone") as string || "",
                    registrationNumber: formData.get("member4RegistrationNumber") as string || "",
                },
            ],
        };
        
        // Validate the form data
        const validatedData = teamSchema.parse(rawData);

        // Filter out empty members (those with no fields filled)
        const filteredMembers = validatedData.members.filter(member =>
            member && member.name && member.email && member.phone && member.registrationNumber
        );
        
        // Create the final payload
        const payload = {
            teamName: validatedData.teamName,
            members: filteredMembers
        };

        // Call the API endpoint
        // const response = await fetch("https://api.example.com/register-team", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(payload),
        //     // Next.js server components can use this option
        //     cache: "no-store"
        // });
        // sample response: { success: true, message: "Your team has been successfully registered!", data: { teamId: "1234" } }
        
        // if (!response.ok) {
        //     const errorData = await response.json();
        //     return {
        //         success: false,
        //         message: errorData.message || "Failed to register team. Please try again."
        //     };
        // }

        // const data = await response.json();
        const data = { teamId: "1234" };
        // Revalidate the page to show the latest data
        revalidatePath("/team-details");

        return {
            success: true,
            message: "Your team has been successfully registered!",
            data
        };

    } catch (error: any) {
        if (error.errors) {
            const fieldErrors: Record<string, string[]> = {};

            error.errors.forEach((err: any) => {
                // Handle the special case for incomplete members
                if (err.path.includes("incomplete")) {
                    const memberIndex = parseInt(err.path[1]) + 1;
                    // Create errors for all fields of this member
                    fieldErrors[`members.${memberIndex-1}.name`] = ["All fields must be completed"];
                    fieldErrors[`members.${memberIndex-1}.email`] = ["All fields must be completed"];
                    fieldErrors[`members.${memberIndex-1}.phone`] = ["All fields must be completed"];
                    fieldErrors[`members.${memberIndex-1}.registrationNumber`] = ["All fields must be completed"];
                } else {
                    const path = err.path.join('.');
                    if (!fieldErrors[path]) {
                        fieldErrors[path] = [];
                    }
                    fieldErrors[path].push(err.message);
                }
            });

            return {
                success: false,
                message: "Please correct the errors in the form.",
                errors: fieldErrors
            };
        }

        console.error("Form validation error:", error);

        return {
            success: false,
            message: error.message || "An unexpected error occurred. Please try again."
        };
    }
}