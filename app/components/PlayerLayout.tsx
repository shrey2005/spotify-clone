import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
// import Sidebar from "./Sidebar";
const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false });

const PlayerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box width="100vw" height="100vh">
            <Box position="absolute" top="0" width="250px" left="0">
                <Sidebar />
            </Box>
            <Box marginLeft="250px" marginBottom="100px">
                {children}
            </Box>
            <Box position="absolute" left="0" bottom="0">
                player
            </Box>
        </Box>
    )
}

export default PlayerLayout;