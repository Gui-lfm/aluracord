import { useState, useEffect, useContext } from 'react';
import { Box, TextField, Button } from '@skynexui/components';
import { useRouter } from 'next/router';
import { format } from 'date-fns'
import { MdSend } from "react-icons/md";
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendStickers';
import Header from '../src/components/Header';
import MessageList from '../src/components/MessageList';
import { useAppContext } from '../src/context/themes';
import { Switch } from '@mui/material';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
/*
   To Do:
// [x] implementar popout ao passar o mouse em cima da foto;
// [x] implementar link que redireciona ao perfil do usuario do github ao clicar no seu nome no chat;
// [x] colocar as chaves do supabase em local seguro;
// [x] corrigir código do skeleton component;
 */

function EscutaEmTempoReal(adicionaMensagem) {

    return supabaseClient
        .from('mensagens')
        .on('INSERT', (mudancaLive) => {
            adicionaMensagem(mudancaLive.new)
        })
        .subscribe();
}


export default function ChatPage() {
    const rota = useRouter();
    const [mensagem, setMensagem] = useState("");
    const [listaMensagens, setListaMensagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const estilo = useAppContext()
    const [tema, setTema] = useState(estilo.dark)

    function mudaTema() {

        tema === estilo.dark
            ? setTema(estilo.light)
            : setTema(estilo.dark)
    }

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

    EscutaEmTempoReal((novaMensagem) => {

        setListaMensagens((valorAtual) => {

            return [

                novaMensagem,
                ...valorAtual,
            ]
        })
    })



    function HandleNovaMensagem(novaMensagem) {

        const mensagem = {

            created_at: format(new Date(), 'dd/MM/yyyy - HH:mm'),
            de: rota.query.username,
            texto: novaMensagem,
        }

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])

        setMensagem('')
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#99FDFF',
                backgroundImage: `url(https://image.api.playstation.com/vulcan/ap/rnd/202006/1013/Tu50Ln3ufMplxrBg01SQxtpx.png)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: tema.text
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: tema.menuP,
                    height: '100%',
                    maxWidth: '60%',
                    maxHeight: '95vh',
                    padding: '32px',

                }}
            >
                <Header />

                <Box
                    styleSheet={{ 
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '5px',
                        justifyContent: 'flex-end',
                    }}
                >
                    <BsMoonStarsFill />
                    <Switch color='error' onChange={mudaTema} />
                    <BsSunFill />
                </Box>
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: tema.menuS,
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList tema={tema} mensagens={listaMensagens} setListaMensagens={setListaMensagens} loading={loading} />

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
                                backgroundColor: tema.chat,
                                marginRight: '12px',
                                color: tema.text,
                            }}
                        />
                        <ButtonSendSticker tema={tema} onStickerClick={
                            (sticker) => {
                                HandleNovaMensagem(`:sticker: ${sticker}`)
                            }} />
                        <Button
                            styleSheet={{
                                padding: '0 3px 0 0',
                                margin: '0 0 8px 8px',
                                minWidth: '50px',
                                minHeight: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: tema.textInfos,
                            }}
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