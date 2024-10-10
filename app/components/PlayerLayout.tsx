import { Box } from "@chakra-ui/react";

const PlayerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box>
            Layout
            {children}
        </Box>
    )
}

export default PlayerLayout;