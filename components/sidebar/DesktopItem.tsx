//core
import { IconType } from "react-icons";
import Link from "next/link";
//helpers
import { cn } from "@/lib/utils";

interface DesktopItemProps {
  label: string;
  href: string;
  icon: IconType;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({
  label,
  href,
  icon: Icon,
  onClick,
  active,
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={cn(
          `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold 
          text-gray-500 hover:text-primary hover:bg-primary/10`,
          active && "bg-primary/10 text-primary",
        )}
      >
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};
export default DesktopItem;
