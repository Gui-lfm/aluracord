import { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@skynexui/components';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { format } from 'date-fns'
import { MdSend } from "react-icons/md";
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendStickers';
import Header from '../src/components/Header';
import MessageList from '../src/components/MessageList';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
/*
// To Do:
// [x] implementar popout ao passar o mouse em cima da foto;
// [x] implementar link que redireciona ao perfil do usuario do github ao clicar no seu nome no chat;
// [x] colocar as chaves do supabase em local seguro;
// [] implementar modo noturno (no caso diurno);
// [] deletar msg deve deletar do  banco de dados do supabase tb && usuario só pode deletar as próprias msgs
// [] botoes de reação devem ser implementados no banco de dados;
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

        console.log('Nova mensagem:', novaMensagem);
        console.log('listaDeMensagens:', listaMensagens);

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
            .then(({ data }) => {
                console.log(`msg criada ${data}`)
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
                        <ButtonSendSticker onStickerClick={
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
                                backgroundColor: appConfig.theme.colors.neutrals[300],
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