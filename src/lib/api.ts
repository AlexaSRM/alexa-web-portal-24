const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface TeamMember {
  name: string;
  regno: string;
  email: string;
  phone: string;
  is_leader: boolean;
}

export interface PaymentInfo {
  transaction_id: number;
  payer_name: string;
  payment_date: string;
}

export interface TeamRegistration {
  event: "Ideathon" | "Debug the Campus";
  team_name: string;
  members: TeamMember[];
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
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/register/team`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.detail
        ? JSON.stringify(result.detail)
        : "Team registration failed.",
    );
  }

  return result;
}

export async function registerSolo(
  data: SoloRegistration,
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/register/solo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.detail
        ? JSON.stringify(result.detail)
        : "Registration failed.",
    );
  }

  return result;
}