"use client";

import {
  Container,
  Title,
  Text,
  Button,
  Card,
  Group,
  Stack,
  SimpleGrid,
  Box,
} from "@bond/ui";
import Link from "next/link";

// Feature cards data
const features = [
  {
    title: "Trade",
    description: "Trade perpetual futures with up to 50x leverage on 0G network",
    href: "/trade",
  },
  {
    title: "Swap",
    description: "Swap tokens instantly with the best rates across liquidity pools",
    href: "/swap",
  },
  {
    title: "Lend",
    description: "Earn yield by lending your assets or borrow against your collateral",
    href: "/lend",
  },
  {
    title: "Markets",
    description: "Explore all available markets and track real-time prices",
    href: "/markets",
  },
];

function FeatureCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Card
      padding="xl"
      style={{
        backgroundColor: "#1A1B1E",
        border: "1px solid #25262b",
        borderRadius: "12px",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#1890ff";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#25262b";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <Link href={href} style={{ textDecoration: "none" }}>
        <Stack gap="sm">
          <Text fw={600} size="lg" c="white">
            {title}
          </Text>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Stack>
      </Link>
    </Card>
  );
}

export default function Home() {
  return (
    <Box
      style={{
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container size="lg" py="xl">
        {/* Hero Section */}
        <Stack align="center" gap="xl" mt="xl" mb="xl">
          <Stack align="center" gap="md">
            <Title
              order={1}
              ta="center"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
              }}
            >
              DeFi on{" "}
              <Text
                component="span"
                inherit
                style={{
                  background: "linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                0G
              </Text>
            </Title>
            <Text
              size="xl"
              c="dimmed"
              ta="center"
              maw={600}
              style={{ lineHeight: 1.6 }}
            >
              Trade, swap, and lend on the fastest decentralized exchange.
              Built for performance on 0G network.
            </Text>
          </Stack>

          <Group gap="md">
            <Button
              component={Link}
              href="/trade"
              size="lg"
              style={{
                backgroundColor: "#1890ff",
                borderRadius: "8px",
                padding: "12px 32px",
              }}
            >
              Start Trading
            </Button>
            <Button
              component={Link}
              href="/markets"
              size="lg"
              variant="outline"
              style={{
                borderColor: "#434343",
                color: "white",
                borderRadius: "8px",
                padding: "12px 32px",
              }}
            >
              View Markets
            </Button>
          </Group>
        </Stack>

        {/* Features Grid */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing="lg"
          mt="xl"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </SimpleGrid>

        {/* Stats Section */}
        <Card
          mt="xl"
          padding="xl"
          style={{
            backgroundColor: "#141517",
            border: "1px solid #25262b",
            borderRadius: "12px",
          }}
        >
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
            <Stack align="center" gap="xs">
              <Text
                fw={700}
                size="xl"
                style={{
                  color: "white",
                  fontSize: "1.75rem",
                }}
              >
                $0
              </Text>
              <Text size="sm" c="dimmed">
                Total Volume
              </Text>
            </Stack>
            <Stack align="center" gap="xs">
              <Text
                fw={700}
                size="xl"
                style={{
                  color: "white",
                  fontSize: "1.75rem",
                }}
              >
                $0
              </Text>
              <Text size="sm" c="dimmed">
                Total Liquidity
              </Text>
            </Stack>
            <Stack align="center" gap="xs">
              <Text
                fw={700}
                size="xl"
                style={{
                  color: "white",
                  fontSize: "1.75rem",
                }}
              >
                0
              </Text>
              <Text size="sm" c="dimmed">
                Total Trades
              </Text>
            </Stack>
            <Stack align="center" gap="xs">
              <Text
                fw={700}
                size="xl"
                style={{
                  color: "white",
                  fontSize: "1.75rem",
                }}
              >
                0
              </Text>
              <Text size="sm" c="dimmed">
                Active Users
              </Text>
            </Stack>
          </SimpleGrid>
        </Card>
      </Container>
    </Box>
  );
}
