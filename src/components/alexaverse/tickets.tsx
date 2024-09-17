import { getAllTickets } from "@/sanity/data/alexaverse-data";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
type Props = {};

const Tickets = async ({}: Props) => {
  // const ticketsList = [
  //   {
  //     id: 1,
  //     title: "Web Slinger",
  //     src: "/alexaverse/tickets/web-slinger.png",
  //     slug: "workshop",
  //     minParticipants: 1,
  //     maxPariticipants: 1,
  //   },
  //   {
  //     id: 2,
  //     title: "Regener8",
  //     src: "/alexaverse/tickets/regener8.png",
  //     slug: "ideathon",
  //     minParticipants: 2,
  //     maxParticipants: 3,
  //   },
  //   {
  //     id: 3,
  //     title: "VlogIt",
  //     src: "/alexaverse/tickets/vlogit.png",
  //     slug: "vlogit",
  //     minParticipants: 1,
  //     maxParticipants: 1,
  //   },
  //   {
  //     id: 4,
  //     title: "Sherlock Syndrome",
  //     src: "/alexaverse/tickets/sherlock-syndrome.png",
  //     slug: "sherlock-syndrome",
  //     minParticipants: 1,
  //     maxParticipants: 1,
  //   },
  //   {
  //     id: 5,
  //     title: "Puzzle Perfect Programming",
  //     src: "/alexaverse/tickets/puzzle-perfect-programming.png",
  //     slug: "puzzle-perfect-programming",
  //     minParticipants: 1,
  //     maxParticipants: 1,
  //   },
  //   {
  //     id: 6,
  //     title: "Carnival Room",
  //     src: "/alexaverse/tickets/carnival-room.png",
  //     slug: "carnival-room",
  //     minParticipants: 2,
  //     maxParticipants: 2,
  //   },
  // ];
  const ticketsList = await getAllTickets();
  return (
    <div id="our-events" className="flex flex-col justify-center items-center  mt-10 pb-20">
      <Image
        src="/alexaverse/events.png"
        height={170}
        width={360}
        alt="Hero Separator"
        objectPosition="center"
        className="-mt-8 px-5 mb-10"
      />
      <div className="w-full flex text-white justify-center font-bold text-5xl md:text-7xl items-center mb-3 ">
        {/* Title could go here if needed */}
      </div>

      <div className="flex flex-col gap-6">
        {ticketsList.map((ticket, index) => (
          <div
            key={index}
            className="flex justify-center items-center  bg-transparent rounded-lg"
          >
            <CardContainer className="inter-var w-[100%] group">
              {/* <div className="absolute  h-full w-full bg-gradient-to-r from-[#31B553] to-[#0AA294] transform scale-[0.80] rounded-full blur-3xl" /> */}
              <CardBody className="relative border-none bg-transparent inset-0 z-40 w-auto sm:w-[30rem] h-auto rounded-xl  shadow-2xl">
                <CardItem translateZ="90" className="w-full">
                  <Link href={`/alexaverse/register/${ticket.slug}`}>
                    <Image
                      src={ticket.ticket}
                      alt={ticket.title}
                      width={630}
                      height={400}
                      objectFit="contain"
                      className="sponsor-image"
                    />
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
