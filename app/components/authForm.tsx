"use client";

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "../lib/mutation"
import { useSWRConfig } from "swr"
import { Box, Flex, Input, Button } from "@chakra-ui/react"
import Logo from '../public/logo.svg'
import Image from "next/image";

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading
        console.log('handle submit called')

        await auth(mode, { email, password })

        setIsLoading(false)
        router.push('/')
    }

    return (
        <Box height={"100vh"} width="100vw" bg="black">
            <Flex justify={"center"} align="center" height="100px" borderBottom="1px solid white">
                <Image src={Logo} height={60} width={60} alt="Logo" />
            </Flex>
            <Flex justify={'center'} align="center" height="calc(100vh - 100px)">
                <Box padding="50" bg="gray.900" borderRadius="6px">
                    <form onSubmit={handleSubmit}>
                        <Input type="email" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                        <Input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                        <Button type="submit" bg="green.500" isLoading={isLoading} sx={{ '&:hover': { bg: 'green.400' } }}>{mode}</Button>
                    </form>
                </Box>
            </Flex>
        </Box>
    )
}

export default AuthForm