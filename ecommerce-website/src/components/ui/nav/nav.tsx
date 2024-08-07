import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import WordMark from "@/components/ui/word-mark";
import { cn } from "@/lib/utils";
import { cva } from "cva";
import Link from "next/link";
import { RiCloseLine, RiMenuFill, RiShoppingBag3Line } from "react-icons/ri";

export const navItems = [
  { name: "Shop all", href: "/" },
  {
    name: "Latest arrivals",
    href: "/latest",
  },
];

export const navItemStyles = cva({
  base: [
    "text-secondary font-medium rounded-[4px] px-0.5",
    "focus:outline-none focus:ring focus:ring-nav-item/15",
    "hover:text-primary disabled:text-disabled transition-colors",
  ],
});

export function Nav() {
  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full bg-white pt-4 transition-all">
      <MaxWidthWrapper className="relative">
        <nav className="flex w-full shrink-0 items-center justify-between md:gap-[103px]">
          <Link href="/" className="shrink-0">
            <WordMark />
          </Link>
          <ul className="flex grow gap-8">
            {navItems.map((navItem) => (
              <li key={navItem.name}>
                <Link
                  href={navItem.href}
                  className={cn(navItemStyles(), "hidden lg:inline-flex")}
                >
                  {navItem.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="inline-flex items-end gap-4">
            <ShoppingCartIcon quantity={8} />
            <NavMobileMenu />
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}

function ShoppingCartIcon({ quantity }: { quantity: number }) {
  return (
    <Link href="/cart" className={cn(navItemStyles(), "relative p-0")}>
      <RiShoppingBag3Line size={24} />
      {quantity > 0 ? (
        <span className="absolute -right-2 -top-2 w-[18px] min-w-fit rounded-full bg-brand px-1 py-[1px] text-center text-xs font-semibold text-white">
          {quantity}
        </span>
      ) : null}
    </Link>
  );
}

function NavMobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className={cn(navItemStyles(), "lg:hidden")}>
          <RiMenuFill size={20} />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col gap-6 bg-white"
        hideClose
      >
        <SheetHeader className="w-full flex-row items-center justify-between space-y-0">
          <WordMark />
          <SheetClose className={cn(navItemStyles(), "")}>
            <RiCloseLine size={20} />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <ul className="flex flex-col">
          {navItems.map((navItem) => (
            <li key={navItem.name} className="gap-3 px-3 py-2">
              <Link href={navItem.href} className={cn(navItemStyles(), "")}>
                {navItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
