'use client'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWavesurfer } from '@/utils/customHook'
import { WaveSurferOptions } from "wavesurfer.js";
import './wave.scss';


const WaveTrack = () => {

    const containerRef = useRef<HTMLDivElement>(null)

    const hoverRef = useRef<HTMLDivElement>(null)

    const timeRef = useRef<HTMLDivElement>(null)

    const durationRef = useRef<HTMLDivElement>(null)

    const searchParams = useSearchParams()

    const fileName = searchParams.get('audio')

    const [isPlaying, setIsPlaying] = useState(false)

    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {

        let gradient, progressGradient;

        if (typeof window !== "undefined") {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')!;

            // Define the waveform gradient
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            gradient.addColorStop(0, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            gradient.addColorStop(1, '#B1B1B1') // Bottom color

            // Define the progress gradient
            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
        }

        return (
            {
                waveColor: gradient,
                progressColor: progressGradient,
                height: 100,
                barWidth: 3,
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

        const timeEl = timeRef.current!;
        const durationEl = durationRef.current!;
        const hover = hoverRef.current!;
        const waveform = containerRef.current!;
        // console.log(">>>check ref:", timeEl, durationEl, hover, waveform);

        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('decode', (duration) => (durationEl.textContent = formatTime(duration))),
            wavesurfer.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime)))
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    return (
        <div style={{ marginTop: 50 }}>
            <div ref={containerRef} className='wave-form-container'>
                <div ref={timeRef} className="time">0:00</div>
                <div ref={durationRef} className="duration">0:00</div>
                <div ref={hoverRef} className="hover-wave"></div>
                <div className="overlay"
                    style={{
                        position: "absolute",
                        height: "30px",
                        width: "100%",
                        bottom: "0",
                        background: "#ccc"
                    }}
                ></div>
            </div>
            <button onClick={() => onPlayClick()}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>

    )
}

export default WaveTrack;