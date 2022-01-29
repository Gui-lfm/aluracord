import { Skeleton } from "@mui/material"

export default function SkeletonComponent(props) {

    return (
        <>
            <div key={props.id}>
                <div style={{ display: 'flex', margin: '10px 0', gap: '10px' }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'lightgrey' }} />
                    <Skeleton variant="text" width={`25%`} sx={{ bgcolor: 'lightgrey' }} />

                </div>
                <Skeleton variant="rectangular" height={100} width={`50%`} sx={{ bgcolor: 'lightgrey' }} />
            </div>

        </>
    )
}

