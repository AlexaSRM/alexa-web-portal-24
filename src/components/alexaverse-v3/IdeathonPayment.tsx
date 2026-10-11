"use client";

import Link from "next/link";

export default function IdeathonPayment() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center text-white">
      <h1
        className="text-4xl font-semibold sm:text-5xl"
        style={{ fontFamily: "'Crimson Pro', serif" }}
      >
        Ideathon Registrations Closed
      </h1>
      <p
        className="mt-4 max-w-xl text-lg sm:text-xl"
        style={{ fontFamily: "'Crimson Pro', serif" }}
      >
        Registration and payment submissions for the Ideathon are no longer
        available.
      </p>
      <Link
        href="/alexaverse-v3"
        className="mt-8 rounded-lg border border-white px-6 py-3 text-lg transition-colors hover:bg-white hover:text-black"
      >
        Return to AlexaVerse
      </Link>
    </section>
  );
}
