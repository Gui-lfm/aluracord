import { Button, Box } from '@skynexui/components'
import { useState } from 'react'


export default function BotoesReacao(props) {

    const [contador, setContador] = useState({ curti: 0, amei: 0, haha: 0, uau: 0, triste: 0, grr: 0, olha: 0 })

    const emojis = {

        curti: '👍',
        amei: '❤️',
        haha: '😄',
        uau: '😮',
        triste: '😢',
        grr: '😡',
        olha: '👀',
    }

    const tema= props.tema

    const botesEmoji = Object.entries(emojis).map(([nome, emoji]) => {

        return (

            <Button key={nome}
                type='button'
                variant='secondary'
                colorVariant='light'
                rounded='md'
                styleSheet={{ 
                    margin: '5px',
                    color: tema.text,
                    borderColor: tema.text
                }}
                label={`${emoji} : ${contador[nome]}`}
                onClick={(evento) => {
                    evento.preventDefault()
                    contador[nome] += 1
                    setContador({ ...contador })
                }}
            />
        )
    })

    return <Box>{botesEmoji}</Box>
}