"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css";
import PlayerLayout from "./components/PlayerLayout";

export const theme = extendTheme({
  colors: {
    gray: {
      100: "#f5f5f5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          }
        }
      }
    }
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const includeSidebar = pathName !== '/signin' && pathName !== '/signup';
  return (
    <ChakraProvider theme={theme}>
      <PlayerLayout includeSidebar={includeSidebar}>
        {children}
      </PlayerLayout>
    </ChakraProvider>
  );
}
