'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { useSearchParams } from 'next/navigation'


// WaveSurfer hook
const useWavesurfer = (containerRef: any, options: any) => {
    const [wavesurfer, setWavesurfer] = useState(null)

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!containerRef.current) return

        const ws: any = WaveSurfer.create({
            ...options,
            container: containerRef.current,
        })

        setWavesurfer(ws)

        ws.on('click', () => {
            ws.play()
        })

        return () => {
            ws.destroy()
        }
    }, [options, containerRef])

    return wavesurfer
}

const WaveTrack = () => {

    const containerRef = useRef<HTMLDivElement>(null)

    const searchParams = useSearchParams()

    const fileName = searchParams.get('audio')

    // re-render infinity because use useState in useEffect
    // const options = {
    //     waveColor: 'rgb(200, 0, 200)',
    //     progressColor: 'rgb(100, 0, 100)',
    //     url: `/api?audio=${fileName}`,
    // }

    const optionsMemo = useMemo(() => {
        return (
            {
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: `/api?audio=${fileName}`,
            }
        )
    }, [])

    const wavesurfer: any = useWavesurfer(containerRef, optionsMemo);

    // useEffect(() => {
    //     const wavesurfer = WaveSurfer.create({
    //         container: containerRef.current!,
    //         waveColor: 'rgb(200, 0, 200)',
    //         progressColor: 'rgb(100, 0, 100)',
    //         url: `/api?audio=${fileName}`,
    //     })

    //     wavesurfer.on('click', () => {
    //         wavesurfer.play()
    //     })

    //     return () => {
    //         wavesurfer.destroy()
    //     }
    // }, [])

    return (
        <div ref={containerRef}>
            Wave Track Detail!
        </div>
    )
}

export default WaveTrack;