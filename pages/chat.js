import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { useState, useEffect } from 'react';
import appConfig from '../config.json';
import { format } from 'date-fns'
import { MdSend, MdDelete } from "react-icons/md";
import BotoesReacao from '../components/emoji';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import SkeletonComponent from '../components/SkeletonComponent';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4ODk2OSwiZXhwIjoxOTU4ODY0OTY5fQ.tHwLIejfAWQf6B0UW6--TtkOjmo7iW17BRtaRlYZSs8'
const SUPABASE_URL = 'https://mnqcvjdwsjcwxpxtstvo.supabase.co'

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function ChatPage() {
    const rota = useRouter();
    const [mensagem, setMensagem] = useState("");
    const [listaMensagens, setListaMensagens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaMensagens(data)
                setLoading(false)
            })
    }, []);

    function HandleNovaMensagem(novaMensagem) {

        const mensagem = {

            // id: listaMensagens.length + 1,
            created_at: format(new Date(), 'dd/MM/yyyy - HH:mm'),
            de: rota.query.username,
            texto: novaMensagem,
        }

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log(data)
                setListaMensagens([

                    data[0],
                    ...listaMensagens,
                ])

            })

        setMensagem('')
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[200],
                backgroundImage: `url(https://image.api.playstation.com/vulcan/ap/rnd/202006/1013/Tu50Ln3ufMplxrBg01SQxtpx.png)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '60%',
                    maxHeight: '95vh',
                    padding: '32px',
                    opacity: '0.9'
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaMensagens} setListaMensagens={setListaMensagens} loading={loading} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            value={mensagem}
                            onChange={(evento) => {

                                let msgDigitada = evento.target.value
                                setMensagem(msgDigitada);
                            }}
                            onKeyPress={(evento) => {

                                if (evento.key === 'Enter') {

                                    evento.preventDefault();
                                    if (mensagem !== '') {

                                        HandleNovaMensagem(mensagem)
                                    }

                                }
                            }}
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            label={<MdSend />}
                            disabled={mensagem === ''}
                            type='submit'
                            colorVariant='neutral'
                            onClick={(evento) => {

                                evento.preventDefault()
                                HandleNovaMensagem(mensagem)
                            }}
                        />


                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5' tag='h2'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const [mouseOver, setMouseEmCima] = useState(false);

    function handleMouseOver() {

        setMouseEmCima(true)
        console.log(mouseOver)
    }

    function handleMouseOut() {

        setMouseEmCima(false)
        console.log(mouseOver)
    }

    function removeMensagem(id) {
        const novaLista = props.mensagens.filter(mensagem => mensagem.id !== id) //cria uma nova lista somente com os elementos que não correspondem ao filtro
        props.setListaMensagens([...novaLista])
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.loading && <SkeletonComponent />}
            {!props.loading && props.mensagens.map((mensagem) => {

                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{

                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}


                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    marginRight: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {mensagem.created_at}
                            </Text>

                            <MdDelete
                                cursor='pointer'
                                color='coral'
                                onClick={(evento) => {

                                    evento.preventDefault();
                                    removeMensagem(mensagem.id)
                                }}
                            />

                        </Box>
                        {mensagem.texto}
                        <BotoesReacao />
                    </Text>
                )
            })}
        </Box>
    )
}