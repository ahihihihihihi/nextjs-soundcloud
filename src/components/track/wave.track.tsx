'use client'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWavesurfer } from '@/utils/customHook'
import { WaveSurferOptions } from "wavesurfer.js";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './wave.scss';
import Tooltip from '@mui/material/Tooltip';
import { useTrackContext } from "@/lib/track.wrapper";
import { fetchDefaultImages, sendRequest } from '@/utils/api';
import CommentTrack from './comment.track';
import LikeTrack from './like.track';
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface IProps {
    track: ITrackTop | null
    comments: ITrackComment[] | null
}

const WaveTrack = (props: IProps) => {

    const { track, comments } = props

    // console.log(">>>check track:", track)

    const router = useRouter();

    const firstViewRef = useRef(true)

    const containerRef = useRef<HTMLDivElement>(null)

    const hoverRef = useRef<HTMLDivElement>(null)

    const timeRef = useRef<HTMLDivElement>(null)

    const durationRef = useRef<HTMLDivElement>(null)

    const searchParams = useSearchParams()

    const fileName = searchParams.get('audio')

    const [isPlaying, setIsPlaying] = useState(false)

    const [trackDuration, setTrackDuration] = useState<number>(0)

    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext

    // console.log(">>>check currentTrack, setCurrentTrack wave.track:", currentTrack, setCurrentTrack)

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

    const calLeft = (moment: number) => {
        const duration = wavesurfer?.getDuration() ?? 0
        // const percent = (moment / trackDuration) * 100;
        const percent = (moment / duration) * 100;
        return `${percent}%`
    }

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
            wavesurfer.on('decode', (duration) => {
                durationEl.textContent = formatTime(duration)
                // console.log(">>>check duration:", duration);
                setTrackDuration(duration)
            }),
            wavesurfer.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime))),
            wavesurfer.once('interaction', () => {
                wavesurfer.play()
            })

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

    useEffect(() => {
        if (track?._id && !currentTrack?._id) {
            setCurrentTrack({ ...track, isPlaying: false })
        }
    }, [track])

    useEffect(() => {
        if (wavesurfer && currentTrack.isPlaying) {
            wavesurfer.pause();
        }
    }, [currentTrack])

    const handleIncreaseView = async () => {
        if (firstViewRef.current) {
            await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/increase-view`,
                method: "POST",
                body: {
                    trackId: track?._id
                }
            })

            await sendRequest<IBackendRes<any>>({
                url: `/api/revalidate`,
                method: "POST",
                queryParams: {
                    tag: 'track-by-id',
                    secret: 'justASecretForJWT'
                }
            })
            router.refresh()
            firstViewRef.current = false
        }

    }

    return (
        <div style={{ marginTop: 20 }}>
            <div
                style={{
                    display: "flex",
                    gap: 15,
                    padding: 20,
                    height: 400,
                    background: "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)"
                }}
            >
                <div className="left"
                    style={{
                        width: "75%",
                        height: "calc(100% - 10px)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    <div className="info" style={{ display: "flex" }}>
                        <div>
                            <div
                                onClick={() => {
                                    onPlayClick();
                                    handleIncreaseView()
                                    if (track && wavesurfer) {
                                        setCurrentTrack({
                                            ...currentTrack,
                                            isPlaying: false
                                        })
                                    }
                                }
                                }
                                style={{
                                    borderRadius: "50%",
                                    background: "#f50",
                                    height: "50px",
                                    width: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                }}
                            >
                                {isPlaying === true ?
                                    <PauseIcon
                                        sx={{ fontSize: 30, color: "white" }}
                                    />
                                    :
                                    <PlayArrowIcon
                                        sx={{ fontSize: 30, color: "white" }}
                                    />
                                }
                            </div>
                        </div>
                        <div style={{ marginLeft: 20 }}>
                            <div style={{
                                padding: "0 5px",
                                background: "#333",
                                fontSize: 30,
                                width: "fit-content",
                                color: "white"
                            }}>
                                {track?.title}
                            </div>
                            <div style={{
                                padding: "0 5px",
                                marginTop: 10,
                                background: "#333",
                                fontSize: 20,
                                width: "fit-content",
                                color: "white"
                            }}
                            >
                                {track?.description}
                            </div>
                        </div>
                    </div>
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
                                // background: "#ccc",
                                backdropFilter: "brightness(0.5)"
                            }}
                        ></div>
                        <div className="comments"
                            style={{ position: "relative" }}
                        >
                            {
                                comments &&
                                comments.map(item => {
                                    return (
                                        <Tooltip title={item.content} arrow key={item._id}>
                                            <Image
                                                onPointerMove={(e) => {
                                                    const hover = hoverRef.current!;
                                                    hover.style.width = calLeft(3 + item.moment)
                                                }}
                                                width={20}
                                                height={20}
                                                alt='user comment'
                                                style={{
                                                    position: "absolute",
                                                    top: 71,
                                                    zIndex: 20,
                                                    left: calLeft(item.moment)
                                                }}
                                                src={fetchDefaultImages(item.user.type)}
                                            />
                                        </Tooltip>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="right"
                    style={{
                        width: "25%",
                        padding: 15,
                        display: "flex",
                        alignItems: "center"
                    }}
                >

                    {
                        track?.imgUrl ?
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.imgUrl}`}
                                height={250}
                                width={250}
                                alt='track image'
                            />
                            :
                            <div style={{
                                background: "#ccc",
                                width: 250,
                                height: 250
                            }}></div>
                    }

                </div>
            </div>
            <div>
                <LikeTrack
                    track={track}
                />
            </div>
            <div>
                <CommentTrack
                    comments={comments}
                    track={track}
                    wavesurfer={wavesurfer}
                />
            </div>
        </div >

    )
}

export default WaveTrack;