"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, List, ListIcon, ListItem, Divider, Center, LinkBox, LinkOverlay } from '@chakra-ui/layout';
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from 'react-icons/md';
import Logo from '../public/logo.svg';

const navMenu = [
    {
        icon: MdHome,
        name: "Home",
        route: '/'
    },
    {
        icon: MdSearch,
        name: "Search",
        route: '/search'
    },
    {
        icon: MdLibraryMusic,
        name: "Your Library",
        route: '/library'
    }
]

const musicMenu = [
    {
        icon: MdPlaylistAdd,
        name: "Create Playlist",
        route: '/'
    },
    {
        icon: MdFavorite,
        name: 'Favourites',
        route: '/favourites'
    }
]

const playList = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`)
const Sidebar = () => {
    return (
        <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
            <Box paddingY="20px" height="100%">
                <Box width="120px" marginBottom="20px" paddingX="20px">
                    <Image src={Logo} alt="logo" height="60" width="120" />
                </Box>
                <Box marginBottom="20px">
                    <List spacing="2">
                        {navMenu.map((menu) => {
                            return (
                                <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                                    <LinkBox>
                                        <Link href={menu.route} passHref>
                                            <LinkOverlay>
                                                <ListIcon as={menu.icon} color="white" marginRight="20px" />
                                                {menu.name}
                                            </LinkOverlay>
                                        </Link>
                                    </LinkBox>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
                <Box marginTop="20px">
                    <List spacing="2">
                        {musicMenu.map((music) => {
                            return (
                                <ListItem paddingX="20px" fontSize="16px" key={music.name}>
                                    <LinkBox>
                                        <Link href={music.route} passHref>
                                            <LinkOverlay>
                                                <ListIcon as={music.icon} color="white" marginRight="20px" />
                                                {music.name}
                                            </LinkOverlay>
                                        </Link>
                                    </LinkBox>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
                <Divider bg="gray.800" />
                <Box height="66%" overflowY="auto" paddingY="20px">
                    <List spacing="2">
                        {playList.map((playlist) => {
                            return (
                                <ListItem paddingX="20px" fontSize="16px" key={playlist}>
                                    <LinkBox>
                                        <Link href="/" passHref>
                                            <LinkOverlay>
                                                {playlist}
                                            </LinkOverlay>
                                        </Link>
                                    </LinkBox>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar;