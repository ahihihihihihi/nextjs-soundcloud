'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWavesurfer } from '@/utils/customHook'


const WaveTrack = () => {

    const containerRef = useRef<HTMLDivElement>(null)

    const searchParams = useSearchParams()

    const fileName = searchParams.get('audio')

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

    return (
        <div ref={containerRef}>
            Wave Track Detail!
        </div>
    )
}

export default WaveTrack;