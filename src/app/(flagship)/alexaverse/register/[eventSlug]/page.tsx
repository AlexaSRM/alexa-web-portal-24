import TeamRegisterForm from "@/components/alexaverse/multi-register-form";
import MultiRegisterForm from "@/components/alexaverse/multi-register-form";
import SingleRegisterForm from "@/components/alexaverse/single-register-form";
import { getTicketBySlug } from "@/sanity/data/alexaverse-data";
import React from "react";

type Props = {
  params: {
    eventSlug: string;
  };
};

const RegisterPage = async (props: Props) => {
  const eventData = await getTicketBySlug(props.params.eventSlug);
  console.log(eventData);
  return (
    <div>
      {!eventData.registrationClosed && 
        (eventData.maxParticipants === 1 ? (
          <SingleRegisterForm event={eventData} />
        ) : (
          <TeamRegisterForm event={eventData} />
        ))}
    </div>
  );
};

export default RegisterPage;
