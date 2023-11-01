'use client'
import { useSearchParams } from 'next/navigation'


const DetailTrackPage = (props: any) => {
    console.log(">>> check props params:", props)
    const searchParams = useSearchParams()

    const audio = searchParams.get('audio')
    console.log(">>> check params:", audio)

    return (
        <div>
            Detail Track Page
        </div>
    )
}

export default DetailTrackPage;