import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import WordMark from "@/components/ui/word-mark";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { RiShoppingBag3Line } from "react-icons/ri";

export const navItems = [
  { name: "Shop all", href: "/" },
  {
    name: "Latest arrivals",
    href: "/latest",
  },
];

const navItemStyles = cva([
  "text-secondary font-medium rounded-[4px] px-0.5",
  "focus:outline-none focus:ring focus:ring-nav-item/15",
  "hover:text-primary disabled:text-disabled transition-colors",
]);

export function Nav() {
  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full pt-4 transition-all">
      <MaxWidthWrapper className="relative">
        <nav className="flex w-full items-center gap-[103px]">
          <WordMark />
          <ul className="flex grow gap-8">
            {navItems.map((navItem) => (
              <li key={navItem.name}>
                <Link href={navItem.href} className={navItemStyles()}>
                  {navItem.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/cart" className={cn(navItemStyles(), "p-0")}>
            <RiShoppingBag3Line size={24} />
          </Link>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}
