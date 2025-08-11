const API_BASE_URL = 'https://alexaverse-reg-be.onrender.com/api';

// Types for API requests
export interface IndividualRegistration {
  name: string;
  registrationNumber: string;
  srmMailId: string;
  phoneNumber: string;
}

export interface TeamMember {
  name: string;
  registrationNumber: string;
  srmMailId: string;
  phoneNumber: string;
}

export interface TeamRegistration {
  teamName: string;
  teamMembers: TeamMember[];
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: {
    issues?: Array<{
      validation: string;
      code: string;
      message: string;
      path: string[];
    }>;
    name: string;
  };
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// Validation functions
export const validateRegistrationNumber = (regNo: string): boolean => {
  const pattern = /^RA\d{13}$/;
  return pattern.test(regNo.toUpperCase());
};

export const validateSRMEmail = (email: string): boolean => {
  const pattern = /^[A-Za-z0-9._+%-]+@srmist\.edu\.in$/;
  return pattern.test(email.toLowerCase());
};

export const validatePhoneNumber = (phone: string): boolean => {
  const pattern = /^\d{10}$/;
  return pattern.test(phone);
};

export const validateName = (name: string): boolean => {
  const pattern = /^[A-Za-z\s]+$/;
  return pattern.test(name);
};

export const validateTeamName = (teamName: string): boolean => {
  const pattern = /^[a-zA-Z0-9\s]+$/;
  return teamName.length >= 3 && pattern.test(teamName);
};

// Data preparation functions
export const prepareIndividualData = (formData: IndividualRegistration): IndividualRegistration => {
  return {
    name: formData.name.trim(),
    registrationNumber: formData.registrationNumber.toUpperCase().trim(),
    srmMailId: formData.srmMailId.toLowerCase().trim(),
    phoneNumber: formData.phoneNumber.trim()
  };
};

export const prepareTeamData = (formData: TeamRegistration): TeamRegistration => {
  return {
    teamName: formData.teamName.trim(),
    teamMembers: formData.teamMembers.map(member => ({
      name: member.name.trim(),
      registrationNumber: member.registrationNumber.toUpperCase().trim(),
      srmMailId: member.srmMailId.toLowerCase().trim(),
      phoneNumber: member.phoneNumber.trim()
    }))
  };
};

// API functions
export const registerForVlogit = async (data: IndividualRegistration): Promise<ApiResponse> => {
  try {
    const preparedData = prepareIndividualData(data);
    const response = await fetch(`${API_BASE_URL}/vlogit/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preparedData),
    });

    const result = await response.json();
    
    // Transform Zod errors to our expected format
    if (!result.success && result.error?.issues) {
      result.errors = result.error.issues.map((issue: any) => ({
        field: issue.path.join('.'),
        message: issue.message
      }));
      result.message = result.message || 'Validation failed';
    }
    
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
};

export const registerForWorkshop = async (data: IndividualRegistration): Promise<ApiResponse> => {
  try {
    const preparedData = prepareIndividualData(data);
    const response = await fetch(`${API_BASE_URL}/workshop/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preparedData),
    });

    const result = await response.json();
    
    // Transform Zod errors to our expected format
    if (!result.success && result.error?.issues) {
      result.errors = result.error.issues.map((issue: any) => ({
        field: issue.path.join('.'),
        message: issue.message
      }));
      result.message = result.message || 'Validation failed';
    }
    
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
};

export const registerForHangman = async (data: TeamRegistration): Promise<ApiResponse> => {
  try {
    const preparedData = prepareTeamData(data);
    const response = await fetch(`${API_BASE_URL}/hangman/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preparedData),
    });

    const result = await response.json();
    
    // Transform Zod errors to our expected format
    if (!result.success && result.error?.issues) {
      result.errors = result.error.issues.map((issue: any) => ({
        field: issue.path.join('.'),
        message: issue.message
      }));
      result.message = result.message || 'Validation failed';
    }
    
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
};

export const registerForDebug = async (data: TeamRegistration): Promise<ApiResponse> => {
  try {
    const preparedData = prepareTeamData(data);
    const response = await fetch(`${API_BASE_URL}/debug/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preparedData),
    });

    const result = await response.json();
    
    // Transform Zod errors to our expected format
    if (!result.success && result.error?.issues) {
      result.errors = result.error.issues.map((issue: any) => ({
        field: issue.path.join('.'),
        message: issue.message
      }));
      result.message = result.message || 'Validation failed';
    }
    
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
};