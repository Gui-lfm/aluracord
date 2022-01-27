import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from "../config.json"
import { useState, useEffect } from 'react';
import { useRouter } from "next/router"

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
        </>
    );
}
export default function PaginaInicial() {

    const [username, setUsername] = useState("gui-lfm")
    const [local, setLocal] = useState()
    const rota = useRouter();
    useEffect(() => {

        fetch(`https://api.github.com/users/${username}`)
            .then(async (resposta) => {
                let dados = await resposta.json()
                const local = dados.location
                setLocal(local)
            })
    })

    function usernameValido(usuario) {

        if (usuario.length > 2) {

            return usuario
        }
    }

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[200],
                    backgroundImage: 'url(https://cdn2.unrealengine.com/egs-whiletruelearn-ludenio-g1c-00-1920x1080-5b8971ca03fe.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={(event) => {
                            event.preventDefault()
                            if (usernameValido(username)) {
                                rota.push({
                                    pathname: '/chat',
                                    query: {username: username}
                                })
                            }
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">{!usernameValido(username) ? `bem vindo ao Aluracord!` : `Bem vindo, ${username} !`}</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            placeholder='digite o seu usuário'
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        {!usernameValido(username)
                            ? <span>Preencha o campo com um usuário válido</span>
                            : ''}
                        <Button
                            disabled={!usernameValido(username)}
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={!usernameValido(username) ?
                                "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg" :
                                `https://github.com/${username}.png`

                            }
                        />
                        <Text

                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {usernameValido(username) ? username : ""}

                        </Text>
                        <Text

                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {usernameValido(username) ? local : ""}

                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}