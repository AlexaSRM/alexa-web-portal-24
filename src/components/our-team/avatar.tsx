import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';

type Props = {
    name: string;
    initials: string;
    url: string;
};

const AvatarImage = ({name, initials, url}: Props) => (
  <div className="flex gap-5">
    <Avatar.Root className="bg-blackA1 inline-flex h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={url}
        alt={name}
      />
      <Avatar.Fallback
        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        {initials}
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
);

export default AvatarImage;