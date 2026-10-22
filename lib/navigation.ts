export type NavLink = {
  label: string;
  href: string;
};

/**
 * Primary header navigation.
 * The logo doubles as Home; "Approach" scrolls to the
 * approach section on the homepage from any route.
 */
export const mainNav: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/about" },
];

/** Footer navigation. */
export const footerNav: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Footer legal links. */
export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];
