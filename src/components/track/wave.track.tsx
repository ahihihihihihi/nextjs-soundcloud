'use client'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = () => {

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const wavesurfer = WaveSurfer.create({
            container: containerRef.current!,
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: '/audio/hoidanit.mp3',
        })

        wavesurfer.on('click', () => {
            wavesurfer.play()
        })
    }, [])

    return (
        <div ref={containerRef}>
            Wave Track Detail!
        </div>
    )
}

export default WaveTrack;