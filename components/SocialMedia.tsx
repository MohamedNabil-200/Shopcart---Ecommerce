import { HugeiconsIcon } from "@hugeicons/react";
import {
  Facebook,
  Github,
  Linkedin,
  Slack,
  Youtube,
} from "@hugeicons/core-free-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "cn";
import Link from "next/link";

type SocialMediaProps = {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
};

const socialLink = [
  {
    title: "Youtube",
    href: "www.youtube.com",
    icon: <HugeiconsIcon icon={Youtube} className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "www.github.com",
    icon: <HugeiconsIcon icon={Github} className="w-5 h-5" />,
  },
  {
    title: "LinkedIn",
    href: "www.linkedin.com",
    icon: <HugeiconsIcon icon={Linkedin} className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "www.facebook.com",
    icon: <HugeiconsIcon icon={Facebook} className="w-5 h-5" />,
  },
  {
    title: "Slack",
    href: "www.slack.com",
    icon: <HugeiconsIcon icon={Slack} className="w-5 h-5" />,
  },
];

const SocialMedia = ({
  className,
  iconClassName,
  tooltipClassName,
}: SocialMediaProps) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger
              render={
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 border rounded-full hover:text-white hover:border-shop-light-green hoverEffect",
                    iconClassName,
                  )}
                >
                  {item.icon}
                </Link>
              }
            />
            <TooltipContent className={cn("bg-white text-dark-color font-semibold border-shop-light-green", tooltipClassName)}>{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
