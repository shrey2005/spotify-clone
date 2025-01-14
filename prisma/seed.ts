import { PrismaClient } from "@prisma/client";
//@ts-ignore
import bcrypt from "bcrypt";
import { artistsData } from "./SongsData";

const prisma = new PrismaClient();

const run = async () => {
    await Promise.all(
        artistsData.map(async (artist) => {
            return prisma.artist.upsert({
                where: { name: artist.name },
                update: {},
                create: {
                    name: artist.name,
                    song: {
                        create: artist.songs.map((song) => ({
                            name: song.name,
                            duration: song.duration,
                            url : song.url
                        }))
                    }
                }
            })
        })
    )

    const salt = bcrypt.genSaltSync();
    const user = await prisma.user.upsert({
        where: { email: 'user@gmail.com' },
        update: {},
        create: {
            email: 'user@gmail.com',
            password: bcrypt.hashSync('password', salt),
        }
    })

    const songs = await prisma.song.findMany({})
    await Promise.all(new Array(10).fill(1).map(async(_, i) => {
        return prisma.playlist.create({
            data: {
                name: `Playlist #${i + 1}`,
                user: {
                    connect: {id: user.id}
                },
                song: {
                    connect: songs.map(song => ({
                        id: song.id
                    })) 
                }
            }
        })
    }))
}

run()
    .then((resp) => {
        console.log('resp : ', resp)
    })
    .catch(e => {
        console.error('Error for prisma : ', e)
        process.exit(1)
    })
.finally(async () => {
    await prisma.$disconnect()      
})