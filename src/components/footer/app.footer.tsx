'use client'
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useRef } from 'react'
import { useTrackContext } from "@/lib/track.wrapper";



const AppFooter = () => {
    // console.log(">>> check env: FOOTER | ", process.env.NEXT_PUBLIC_BACKEND_URL)
    const hasMounted = useHasMounted();
    const playerRef = useRef(null)
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext
    console.log(">>>check track context footer:", currentTrack)

    useEffect(() => {
        if (currentTrack?.isPlaying === false) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.pause();
        }
        if (currentTrack?.isPlaying === true) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.play();
        }
    }, [currentTrack])

    if (!hasMounted) {
        return (
            <></> //fragment
        )
    }


    return (
        <div style={{ marginTop: 50 }}>
            <AppBar
                position="fixed"
                sx={{
                    top: 'auto',
                    bottom: 0,
                    backgroundColor: '#f2f2f2',
                }}
            >
                <Container sx={{
                    display: 'flex',
                    gap: '10px',
                    '.rhap_main': {
                        gap: '30px',
                        '.rhap_controls-section': {
                            gap: '10px',
                        }
                    }
                }}>
                    <AudioPlayer
                        ref={playerRef}
                        layout="horizontal-reverse"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                        volume={0.5}
                        style={{
                            backgroundColor: '#f2f2f2',
                            boxShadow: 'unset',
                        }}
                        onPlay={() => {
                            setCurrentTrack({
                                ...currentTrack,
                                isPlaying: true,
                            })
                        }}
                        onPause={() => {
                            setCurrentTrack({
                                ...currentTrack,
                                isPlaying: false,
                            })
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'start',
                        minWidth: 100
                    }}
                    >
                        <div style={{ color: '#ccc' }}>{currentTrack.description}</div>
                        <div style={{ color: 'black' }}>{currentTrack.title}</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter;