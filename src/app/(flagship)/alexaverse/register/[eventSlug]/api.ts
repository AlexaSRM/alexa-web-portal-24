// import axios from 'axios';
"use server";
import axios from "axios";
interface SingleRegistrationFormData {
  firstName: string;
  lastName: string;
  srmMailId: string;
  registrationNumber: string;
  department: string;
}
interface MultiRegistrationFormData {
  teamName: string;
  teamMembers: SingleRegistrationFormData[];
}

export async function registerUser(
  eventSlug: string,
  formData: MultiRegistrationFormData | SingleRegistrationFormData
): Promise<void> {
  try {
    console.log(
      process.env.NEXT_ALEXAVERSE_API_URL + `/api/${eventSlug}/register`
    );
    const response = await axios.post(
      process.env.NEXT_ALEXAVERSE_API_URL + `/api/${eventSlug}/register`,
      formData
    );
    return await response.data;
  } catch (error: any) {
    console.error(
      "Registration failed:",
      error.response.data.message || error.response.data.error.issues[0].message
    );
    // console.error(error.response.data.error.issues[0].path);
    return error.response.data;
  }
}
