export interface ApiError {
  field: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  errors?: ApiError[];
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

export interface IndividualRegistration {
  name: string;
  registrationNumber: string;
  srmMailId: string;
  phoneNumber: string;
}

export interface PaymentInfo {
  transaction_id: number;
  payer_name: string;
  payment_date: string;
}

export interface LegacyTeamRegistration {
  event: "Ideathon" | "Debug the Campus";
  team_name: string;
  members: Array<{
    name: string;
    regno: string;
    email: string;
    phone: string;
    is_leader: boolean;
  }>;
  payment: PaymentInfo | null;
}

export interface SoloRegistration {
  event: "Workshop" | "Reel It";
  name: string;
  regno: string;
  email: string;
  phone: string;
}

export async function registerTeam(
  data: TeamRegistration,
): Promise<ApiResponse> {
  const response = await fetch("/api/alexaverse/register/team", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as ApiResponse;

  if (!response.ok) {
    throw new Error(
      result?.message
        ? JSON.stringify(result.message)
        : "Team registration failed.",
    );
  }

  return result;
}

export async function registerSolo(
  data: SoloRegistration,
): Promise<ApiResponse> {
  const response = await fetch("/api/alexaverse/register/solo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as ApiResponse;

  if (!response.ok) {
    throw new Error(
      result?.message
        ? JSON.stringify(result.message)
        : "Registration failed.",
    );
  }

  return result;
}

export async function registerForDebug(
  data: TeamRegistration,
): Promise<ApiResponse> {
  const payload: LegacyTeamRegistration = {
    event: "Debug the Campus",
    team_name: data.teamName,
    members: data.teamMembers.map((member) => ({
      name: member.name,
      regno: member.registrationNumber,
      email: member.srmMailId,
      phone: member.phoneNumber,
      is_leader: false,
    })),
    payment: null,
  };

  return registerTeam({
    teamName: data.teamName,
    teamMembers: data.teamMembers,
  });
}

export async function registerForWorkshop(
  data: IndividualRegistration,
): Promise<ApiResponse> {
  return registerSolo({
    event: "Workshop",
    name: data.name,
    regno: data.registrationNumber,
    email: data.srmMailId,
    phone: `+91 ${data.phoneNumber}`,
  });
}

export async function registerForVlogit(
  data: IndividualRegistration,
): Promise<ApiResponse> {
  return registerSolo({
    event: "Reel It",
    name: data.name,
    regno: data.registrationNumber,
    email: data.srmMailId,
    phone: `+91 ${data.phoneNumber}`,
  });
}
