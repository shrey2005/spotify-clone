import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false });

const PlayerLayout = ({ children, includeSidebar }: { children: React.ReactNode, includeSidebar: boolean }) => {

    return (
        <Box width="100vw" height="100vh">
            {includeSidebar &&
                <Box position="absolute" top="0" width="250px" left="0">
                    <Sidebar />
                </Box>
            }
            <Box marginLeft={ includeSidebar ? "250px" : "0"} marginBottom="100px">
                {children}
            </Box>
            <Box position="absolute" left="0" bottom="0">
                player
            </Box>
        </Box >
    )
}

export default PlayerLayout;