import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import WalletStatus from "./WalletStatus";
import Router from "./Router";

function App() {
  return (
    <>
      {/* Header - Fixed navigation */}
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
          backgroundColor: "white",
          zIndex: 50,
        }}
      >
        <Box>
          <Heading>Market-Place</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      {/* Main Content Area */}
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ 
            background: "white", 
            minHeight: "calc(100vh - 80px)",
            borderRadius: "8px",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)"
          }}
        >
          {/* Wallet Status - Always visible */}
          <div style={{ marginBottom: "2rem" }}>
            <WalletStatus />
          </div>

          {/* Router handles all page routing */}
          <Router />
        </Container>
      </Container>
    </>
  );
}

export default App;