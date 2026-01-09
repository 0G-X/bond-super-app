"use client";

import Link from "next/link";
import {
  Group,
  Box,
  Button,
  Container,
  Text,
  useMediaQuery,
} from "@bond/ui";
import { Navigation, MobileNavigation } from "../Navigation";

/**
 * Logo component - Links to home
 */
function Logo() {
  return (
    <Link href="/" style={{ textDecoration: "none" }}>
      <Text
        fw={800}
        size="xl"
        style={{
          color: "white",
          letterSpacing: "-0.5px",
          cursor: "pointer",
        }}
      >
        Bond
      </Text>
    </Link>
  );
}

/**
 * Login/Wallet button placeholder
 */
function WalletButton() {
  return (
    <Button
      variant="filled"
      size="sm"
      style={{
        backgroundColor: "#1890ff",
        borderRadius: "8px",
      }}
    >
      Login
    </Button>
  );
}

/**
 * Header component - App header with logo, navigation, and wallet button
 */
export function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      component="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#0d0d0d",
        borderBottom: "1px solid #25262b",
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between" align="center">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Desktop Navigation */}
          {!isMobile && (
            <Box style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
              <Navigation variant="desktop" />
            </Box>
          )}

          {/* Right: Wallet button + Mobile menu */}
          <Group gap="sm">
            <WalletButton />
            {isMobile && <MobileNavigation />}
          </Group>
        </Group>
      </Container>
    </Box>
  );
}

export default Header;
