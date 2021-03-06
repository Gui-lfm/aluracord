import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from "../config.json"
import { useState, useEffect } from 'react';
import { useRouter } from "next/router"
import { useAppContext } from '../src/context/themes';
import { Switch } from '@mui/material';

function Titulo(props) {
    const Tag = props.tag || 'h1';
    const tema = props.tema
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
              ${Tag} {
                  color: ${tema.text};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
        </>
    );
}
export default function PaginaInicial() {

    const [username, setUsername] = useState('')
    const [local, setLocal] = useState()
    const rota = useRouter();
    const estilo = useAppContext()
    const [tema, setTema] = useState(estilo.dark)


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
                    backgroundColor: '#99FDFF',
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
                        backgroundColor: tema.menuP,
                    }}
                >
                    {/* Formul??rio */}
                    
                    <Box
                        as="form"
                        onSubmit={(event) => {
                            event.preventDefault()
                            if (usernameValido(username)) {
                                rota.push(`/chat?username=${username}`)
                            }
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                       
                        <Titulo tag="h2" tema={tema}>{!usernameValido(username) ? `bem vindo ao Aluracord!` : `Bem vindo, ${username} !`}</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: tema.textInfos }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            placeholder='digite o seu usu??rio'
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: tema.textInfos,
                                    mainColor: tema.btnHover,
                                    mainColorHighlight: tema.btn,
                                    backgroundColor: tema.chat,
                                },
                            }}
                        />
                        {!usernameValido(username) && username.length !== 0
                            ? <Text styleSheet={{ color: tema.span }}>Digite um usu??rio github v??lido</Text >
                            : ''}
                        <Button
                            disabled={!usernameValido(username)}
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: tema.text,
                                mainColor: tema.btn,
                                mainColorStrong: tema.btnHover,
                            }}
                        />
                        
                    </Box>
                    {/* Formul??rio */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: tema.chat,
                            border: '1px solid',
                            borderColor: '#080A0C',
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
                                color: tema.textInfos,
                                backgroundColor: tema.menuS,
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {usernameValido(username) ? username : ""}

                        </Text>
                        <Text

                            variant="body4"
                            styleSheet={{
                                color: tema.textInfos,
                                backgroundColor: tema.menuS,
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