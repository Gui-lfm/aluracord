import { Box, Image, Text } from '@skynexui/components'
import { MdGroup, MdStorage } from 'react-icons/md'
import appConfig from '../../config.json'
import { useEffect, useState } from 'react'

export default function UserCard(props) {
    const [seguidores, setSeguidores] = useState()
    const [repositorios, setRepositorios] = useState()
    useEffect(() => {

        fetch(`https://api.github.com/users/${props.autor}`)
            .then(async (resposta) => {
                let dados = await resposta.json()
                let seguidores = dados.following
                setSeguidores(seguidores)
                let repositorios = dados.public_repos
                setRepositorios(repositorios)
            })
    }, [])

    return (
        <>
            <Box styleSheet={{
                backgroundColor: appConfig.theme.colors.neutrals[700],
                height: '190px',
                bottom: '30px',
                width: {
                    xs: '200px',
                    sm: '290px',
                },
                padding: '10px',
                boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px'
            }}
            >
                <Box styleSheet={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}>
                    <Image
                        src={`https://github.com/${props.autor}.png`}
                        styleSheet={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            padding: '8px',
                        }}
                    />
                    <Text
                        tag='h3'
                        styleSheet={{
                            color: 'white',
                            fontSize: '2em'
                        }}>
                        {props.autor}
                    </Text>
                </Box >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px 20px',
                        padding: '12px',
                        borderRadius: '5px',

                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px'
                    }}
                    tag='ul'
                >
                    <Text
                        styleSheet={{
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            marginRight: '50px',
                            padding: '3px',
                        }}
                        tag='li'
                    >
                        <MdGroup />  {`Seguidores: ${seguidores}`}
                    </Text>

                    <Text
                        styleSheet={{
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            marginRight: '50px',
                            padding: '3px',
                        }}
                        tag='li'
                    >
                        <MdStorage />    {`Repositórios: ${repositorios}`}
                    </Text>
                </Box>
            </Box>

        </>)
}
