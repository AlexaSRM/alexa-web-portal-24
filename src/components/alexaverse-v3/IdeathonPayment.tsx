"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const qrCodes = [
  "/alexaverse3.0/qr1.png",
  "/alexaverse3.0/qr2.png",
  // "/alexaverse3.0/qr3.png",
  "/alexaverse3.0/qr4.png",
  "/alexaverse3.0/qr5.png",
];

const STORAGE_KEY = process.env.NEXT_PUBLIC_IDEATHON_REGISTRATION_STORAGE_KEY as string;
const PAYMENT_STORAGE_KEY = process.env.NEXT_PUBLIC_IDEATHON_PAYMENT_STORAGE_KEY as string;

interface PaymentData {
  qr: string;
  txnId: string;
}

interface RegistrationMember {
  name: string;
  registrationNumber: string;
  srmMailId: string;
  phoneNumber: string;
}

interface RegistrationData {
  teamName: string;
  teamMembers: RegistrationMember[];
}

export default function IdeathonPayment() {
  const [qr, setQr] = useState<string>("");
  const [txnId, setTxnId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const savedRegistration = sessionStorage.getItem(STORAGE_KEY);

    if (!savedRegistration) {
      router.replace("/alexaverse-v3/RegisterIdeathon");
      return;
    }

    try {
      const registrationData: RegistrationData = JSON.parse(savedRegistration);

      if (
        !registrationData ||
        !registrationData.teamName ||
        !Array.isArray(registrationData.teamMembers) ||
        registrationData.teamMembers.length < 2 ||
        registrationData.teamMembers.length > 4
      ) {
        sessionStorage.removeItem(STORAGE_KEY);
        router.replace("/alexaverse-v3/RegisterIdeathon");
        return;
      }

      const savedPayment = sessionStorage.getItem(PAYMENT_STORAGE_KEY);

      if (savedPayment) {
        try {
          const paymentData: PaymentData = JSON.parse(savedPayment);

          if (paymentData.qr) {
            setQr(paymentData.qr);
          }

          if (paymentData.txnId) {
            setTxnId(paymentData.txnId);
          }

          setMounted(true);
          return;
        } catch {
          sessionStorage.removeItem(PAYMENT_STORAGE_KEY);
        }
      }

      const random = qrCodes[Math.floor(Math.random() * qrCodes.length)];

      setQr(random);

      sessionStorage.setItem(
        PAYMENT_STORAGE_KEY,
        JSON.stringify({
          qr: random,
          txnId: "",
        }),
      );

      setMounted(true);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(PAYMENT_STORAGE_KEY);
      router.replace("/alexaverse-v3/RegisterIdeathon");
    }
  }, [router]);

  useEffect(() => {
    if (!mounted || !qr) return;

    try {
      sessionStorage.setItem(
        PAYMENT_STORAGE_KEY,
        JSON.stringify({
          qr,
          txnId,
        }),
      );
    } catch (error) {
      console.error("Unable to save payment data:", error);
    }
  }, [qr, txnId, mounted]);

  const handleSubmit = async () => {
    if (loading) return;

    const trimmedTxnId = txnId.trim();

    if (!trimmedTxnId) {
      setMessage("Transaction ID is required");
      return;
    }

    if (!/^\d+$/.test(trimmedTxnId)) {
      setMessage("Only numeric values are allowed");
      return;
    }

    const numericTxnId = Number(trimmedTxnId);

    if (!Number.isSafeInteger(numericTxnId)) {
      setMessage(
        "Transaction ID is too large. Please enter a valid transaction ID.",
      );
      return;
    }

    const savedRegistration = sessionStorage.getItem(STORAGE_KEY);

    if (!savedRegistration) {
      setMessage(
        "Registration details not found. Please go back and fill the form again.",
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const registrationData: RegistrationData = JSON.parse(savedRegistration);

      if (
        !registrationData.teamName ||
        !Array.isArray(registrationData.teamMembers)
      ) {
        setMessage(
          "Registration details are incomplete. Please go back and fill the form again.",
        );
        return;
      }

      const validMembers = registrationData.teamMembers.filter(
        (member) =>
          member.name.trim() ||
          member.registrationNumber.trim() ||
          member.srmMailId.trim() ||
          member.phoneNumber.trim(),
      );

      if (validMembers.length < 2 || validMembers.length > 4) {
        setMessage(
          "Ideathon team must have between 2 and 4 members. Please go back and complete the registration form.",
        );
        return;
      }

      const paymentDate = new Date().toISOString().split("T")[0];

      const payload = {
        event: "Ideathon",
        team_name: registrationData.teamName.trim(),
        members: validMembers.map((member, index) => ({
          name: member.name.trim(),
          regno: member.registrationNumber.trim(),
          email: member.srmMailId.trim().toLowerCase(),
          phone: member.phoneNumber.trim(),
          is_leader: index === 0,
        })),
        payment: {
          transaction_id: numericTxnId,
          payer_name: validMembers[0].name.trim(),
          payment_date: paymentDate,
        },
      };

      const response = await fetch("/api/alexaverse/register/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result: unknown = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        let backendMessage = "Registration failed. Please try again.";

        if (typeof result === "object" && result !== null) {
          const data = result as {
            detail?: unknown;
            message?: unknown;
          };

          if (typeof data.detail === "string") {
            backendMessage = data.detail;
          } else if (Array.isArray(data.detail)) {
            backendMessage = data.detail
              .map((item) => {
                if (
                  typeof item === "object" &&
                  item !== null &&
                  "msg" in item
                ) {
                  return String((item as { msg?: unknown }).msg ?? "");
                }

                return String(item);
              })
              .filter(Boolean)
              .join(" ");
          } else if (typeof data.message === "string") {
            backendMessage = data.message;
          }
        }

        const errorMessage = backendMessage.toLowerCase();

        if (
          errorMessage.includes("transaction") &&
          (errorMessage.includes("unique") ||
            errorMessage.includes("duplicate") ||
            errorMessage.includes("already") ||
            errorMessage.includes("exist"))
        ) {
          throw new Error(
            "This transaction ID has already been used. Please enter a different transaction ID.",
          );
        }

        if (
          errorMessage.includes("regno") ||
          errorMessage.includes("register number") ||
          errorMessage.includes("registration number")
        ) {
          throw new Error(
            "One or more register numbers are already registered for Ideathon.",
          );
        }

        if (errorMessage.includes("email")) {
          throw new Error(
            "One or more email addresses are already registered for Ideathon.",
          );
        }

        if (errorMessage.includes("phone")) {
          throw new Error(
            "One or more phone numbers are already registered for Ideathon.",
          );
        }

        if (
          errorMessage.includes("2 members") ||
          errorMessage.includes("4 members") ||
          errorMessage.includes("between 2 and 4")
        ) {
          throw new Error("Ideathon team must have between 2 and 4 members.");
        }

        throw new Error(backendMessage);
      }

      setMessage("Registration successful!");

      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(PAYMENT_STORAGE_KEY);

      setTimeout(() => {
        router.push("/alexaverse-v3");
      }, 5000);
    } catch (error) {
      console.error("Ideathon registration failed:", error);

      const errorMessage = error instanceof Error ? error.message : "";

      setMessage(
        errorMessage ||
          "Registration failed. Please check your details and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  const isError =
    message === "Transaction ID is required" ||
    message === "Only numeric values are allowed" ||
    message ===
      "Transaction ID is too large. Please enter a valid transaction ID." ||
    message ===
      "Registration details not found. Please go back and fill the form again." ||
    message ===
      "Registration details are incomplete. Please go back and fill the form again." ||
    message ===
      "Ideathon team must have between 2 and 4 members. Please go back and complete the registration form." ||
    message ===
      "This transaction ID has already been used. Please enter a different transaction ID." ||
    message ===
      "One or more register numbers are already registered for Ideathon." ||
    message ===
      "One or more email addresses are already registered for Ideathon." ||
    message ===
      "One or more phone numbers are already registered for Ideathon." ||
    message === "Ideathon team must have between 2 and 4 members." ||
    message === "Registration failed. Please check your details and try again.";

  const isSuccess = message === "Registration successful!";

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/alexaverse3.0/form-bg.svg"
          alt=""
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col items-center gap-5 sm:gap-6 max-w-[500px] w-full">
          <h1
            className="text-white text-[40px] sm:text-[48px] md:text-[56px] font-semibold text-center"
            style={{
              fontFamily: "'Crimson Pro', serif",
            }}
          >
            Scan & Pay
          </h1>

          {qr && (
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg">
              <Image
                src={qr}
                alt="Ideathon Payment QR"
                width={280}
                height={280}
                priority
                className="rounded-lg w-[240px] sm:w-[280px] h-auto"
              />
            </div>
          )}

          <p
            className="text-white text-lg sm:text-xl text-center leading-relaxed px-1 sm:px-0"
            style={{
              fontFamily: "'Crimson Pro', serif",
            }}
          >
            Scan the QR code using GPay / UPI and complete the Ideathon
            registration payment of ₹120. After paying, enter your TRANSACTION
            ID below to confirm your registration.
          </p>

          <div className="w-full">
            <input
              type="text"
              inputMode="numeric"
              maxLength={40}
              placeholder="Enter TRANSACTION ID"
              value={txnId}
              onChange={(e) => {
                const val = e.target.value;

                if (val !== "" && !/^\d+$/.test(val)) {
                  setMessage("Only numeric values are allowed");
                  return;
                }

                setTxnId(val);
                setMessage("");
              }}
              disabled={loading || isSuccess}
              className={`w-full px-4 py-4 rounded-lg border outline-none text-black bg-white text-base sm:text-lg ${
                isError ? "border-red-500" : "border-gray-400"
              }`}
            />

            {message && (
              <p
                className={`text-sm mt-1 ${
                  isSuccess ? "text-green-400" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <p
              className="text-white text-base sm:text-lg text-center mt-3 leading-relaxed px-1"
              style={{
                fontFamily: "'Crimson Pro', serif",
              }}
            >
              Make sure you enter the transaction ID generated after your
              payment, not your personal UPI ID.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || isSuccess}
            className={`relative mx-auto flex w-full max-w-[400px] items-center justify-center transition duration-300 ${
              loading || isSuccess
                ? "opacity-70 cursor-not-allowed"
                : "cursor-pointer hover:scale-105"
            }`}
          >
            <Image
              src="/alexaverse3.0/register-btn.svg"
              alt="Register"
              width={500}
              height={200}
              className="w-full h-auto object-contain"
            />

            <span
              className="absolute inset-0 flex items-center justify-center text-black font-bold text-3xl sm:text-4xl tracking-[1px] sm:tracking-[2px]"
              style={{
                fontFamily: "'Cinzel', serif",
              }}
            >
              {loading ? "REGISTERING" : isSuccess ? "REGISTERED" : "REGISTER"}
            </span>
          </button>

          {isSuccess && (
            <p
              className="text-green-400 text-sm sm:text-base text-center"
              style={{
                fontFamily: "'Crimson Pro', serif",
              }}
            >
              Registration successful! Redirecting...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
