"use client";

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "../lib/mutation"
import { useSWRConfig } from "swr"
import { Box, Flex } from "@chakra-ui/react"

const AuthForm: FC<{ mode: string }> = ({ mode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    return (
        <Box height={"100vh"} width="100vw" bg="black">
            <Flex justify={"center"} align="center" height="100px">
                Hello
            </Flex>
            <Flex justify={'center'} align="center" height="calc(100vh - 100px)">Form</Flex>
        </Box>
    )
}

export default AuthForm