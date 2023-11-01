'use client'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWavesurfer } from '@/utils/customHook'


const WaveTrack = () => {

    const containerRef = useRef<HTMLDivElement>(null)

    const searchParams = useSearchParams()

    const fileName = searchParams.get('audio')

    const [isPlaying, setIsPlaying] = useState(false)

    const optionsMemo = useMemo(() => {
        return (
            {
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: `/api?audio=${fileName}`,
            }
        )
    }, [])

    const wavesurfer = useWavesurfer(containerRef, optionsMemo);

    // On play button click
    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
        }
    }, [wavesurfer])

    useEffect(() => {
        if (!wavesurfer) return

        setIsPlaying(false)

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    return (
        <div>
            <div ref={containerRef}>
                Wave Track Detail!
            </div>
            <button onClick={() => onPlayClick()}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>

    )
}

export default WaveTrack;