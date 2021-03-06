import UserCard from './UserCard';
import { MdDelete } from 'react-icons/md';
import { Popover } from '@mui/material';
import BotoesReacao from './emoji';
import { useState } from 'react';
import { Box, Text, Image } from '@skynexui/components'

export default function Message(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const tema = props.tema

    return (
        <>
            <Text
                key={props.id}
                tag="li"
                styleSheet={{

                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: tema.menuP,
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${props.autor}.png`}
                    />
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <UserCard tema={tema} autor={props.autor} />
                    </Popover>

                    <Text tag="strong">
                        <Text
                            tag='a'
                            href={`https://github.com/${props.autor}`}
                            styleSheet={{
                                color: tema.text
                            }}
                        >{props.autor}</Text>
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            marginRight: '8px',
                            color: tema.textInfos,
                        }}
                        tag="span"
                    >
                        {props.data}
                    </Text>
                    {props.usuarioLogado === props.autor && <MdDelete
                        cursor='pointer'
                        color={tema.span}
                        onClick={(evento) => {

                            evento.preventDefault();
                            props.ApagaMensagem(props.id)
                        }}
                    />}

                </Box>
                {props.texto.startsWith(':sticker:')
                    ? (
                        <Image
                            styleSheet={{ width: '20%' }}
                            src={props.texto.replace(':sticker:', '')}
                        />
                    )
                    : (
                        props.texto
                    )}
                <BotoesReacao tema={tema} />
            </Text>
        </>
    )

}
