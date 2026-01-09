"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Group,
  Stack,
  Anchor,
  Drawer,
  Burger,
  useDisclosure,
  useMediaQuery,
  Box,
  Text,
} from "@bond/ui";

// Navigation items
const navItems = [
  { label: "Trade", href: "/trade" },
  { label: "Swap", href: "/swap" },
  { label: "Lend", href: "/lend" },
  { label: "Markets", href: "/markets" },
  { label: "Dashboard", href: "/dashboard" },
];

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

function NavItem({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <Anchor
      component={Link}
      href={href}
      onClick={onClick}
      style={{
        color: isActive ? "#1890ff" : "#A6A7AB",
        textDecoration: "none",
        fontWeight: isActive ? 600 : 400,
        fontSize: "0.95rem",
        padding: "8px 16px",
        borderRadius: "8px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = "#C1C2C5";
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = "#A6A7AB";
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      {label}
    </Anchor>
  );
}

interface NavigationProps {
  variant?: "desktop" | "mobile";
}

/**
 * Desktop Navigation - Horizontal nav links
 */
function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <Group gap="xs">
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          isActive={pathname === item.href}
        />
      ))}
    </Group>
  );
}

/**
 * Mobile Navigation - Hamburger menu with drawer
 */
function MobileNavigation() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <>
      <Burger
        opened={opened}
        onClick={toggle}
        size="sm"
        color="#C1C2C5"
        aria-label="Toggle navigation"
      />
      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        position="right"
        title={
          <Text fw={700} size="lg" c="white">
            Bond
          </Text>
        }
        styles={{
          content: {
            backgroundColor: "#141517",
          },
          header: {
            backgroundColor: "#141517",
            borderBottom: "1px solid #25262b",
          },
          title: {
            color: "white",
          },
          close: {
            color: "#A6A7AB",
          },
        }}
      >
        <Stack gap="md" mt="md">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={pathname === item.href}
              onClick={close}
            />
          ))}
        </Stack>
      </Drawer>
    </>
  );
}

/**
 * Navigation component - Adapts to desktop/mobile
 */
export function Navigation({ variant }: NavigationProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // If variant is explicitly set, use that
  if (variant === "mobile") return <MobileNavigation />;
  if (variant === "desktop") return <DesktopNavigation />;

  // Otherwise, auto-detect based on screen size
  // On first render (SSR), assume desktop
  if (isMobile === undefined || isMobile) {
    return <MobileNavigation />;
  }

  return <DesktopNavigation />;
}

// Export individual components for flexibility
export { DesktopNavigation, MobileNavigation };
export default Navigation;
