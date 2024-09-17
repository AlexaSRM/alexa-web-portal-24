import { Menu } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Props = {
  menuItems: {
    title: string;
    url: string;
    description: string;
  }[];
};

const SidebarButton = ({ menuItems }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative md:hidden bg-[#00A793] hover:bg-[#31B553] rounded-full">
          <Menu className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-[#181818] border-black border-2 border-spacing-2">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xl text-white font-bold leading-none">
              {"Welcome to ADS!!"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="text-black bg-black" />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <div key={item.url}>
              <DropdownMenuSeparator className="text-black bg-black" />
              <DropdownMenuItem asChild>
                <Link href={item.url} className="flex flex-col space-y-1" onClick={() => document.body.click()}>
                  <p className="text-sm font-bold leading-none text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-white leading-none text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              </DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarButton;
