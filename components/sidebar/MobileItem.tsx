//core
import { IconType } from "react-icons";
import Link from "next/link";
//helpers
import { cn } from "@/lib/utils";

interface MobileItemProps {
  href: string;
  icon: IconType;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem = ({ href, icon: Icon, onClick, active }: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-primary hover:bg-primary/10`,
        active && "bg-primary/10 text-primary",
      )}
    >
      <Icon className="w-6 h-6 shrink-0" />
    </Link>
  );
};
export default MobileItem;
