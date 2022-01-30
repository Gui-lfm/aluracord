import { Box } from '@skynexui/components'
import SkeletonComponent from './SkeletonComponent';
import Message from './Message';

export default function MessageList(props) {
    function removeMensagem(id) {
        const novaLista = props.mensagens.filter(mensagem => mensagem.id !== id) //cria uma nova lista somente com os elementos que não correspondem ao filtro
        props.setListaMensagens([...novaLista])
    }

    const tema = props.tema
    
    const listaSkeleton = [1, 2, 3, 4, 5]
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: tema.text, 
                marginBottom: '16px',
            }}
        >
            {props.loading && listaSkeleton.map((numero) => {
                return (
                    <SkeletonComponent id={numero} />
                )
            })}
            {!props.loading && props.mensagens.map((mensagem) => {

                return (
                    <Message tema={tema} id={mensagem.id} autor={mensagem.de} data={mensagem.created_at} texto={mensagem.texto} removeMensagem={removeMensagem} />
                )
            })}
        </Box>
    )
}
