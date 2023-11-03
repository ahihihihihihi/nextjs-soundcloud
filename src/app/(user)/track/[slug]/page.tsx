'use client'
import WaveTrack from '@/components/track/wave.track'
import { useSearchParams } from 'next/navigation'
import Container from '@mui/material/Container'


const DetailTrackPage = (props: any) => {
    // console.log(">>> check props params:", props)
    const searchParams = useSearchParams()

    const audio = searchParams.get('audio')
    // console.log(">>> check params:", audio)



    return (
        <Container>
            Detail Track Page
            <div>
                <WaveTrack />
            </div>
        </Container>
    )
}

export default DetailTrackPage;