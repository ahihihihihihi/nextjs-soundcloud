'use client'
import WaveTrack from '@/components/track/wave.track'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'



const DetailTrackPage = (props: any) => {
    // console.log(">>> check props params:", props)
    const searchParams = useSearchParams()

    const audio = searchParams.get('audio')
    // console.log(">>> check params:", audio)



    return (
        <div>
            Detail Track Page
            <div>
                <WaveTrack />
            </div>
        </div>
    )
}

export default DetailTrackPage;