import { PrismaClient } from "@prisma/client";
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