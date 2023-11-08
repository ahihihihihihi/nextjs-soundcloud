'use client'
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useContext, useRef } from 'react'
import { TrackContext } from "@/lib/track.wrapper";



const AppFooter = () => {
    // console.log(">>> check env: FOOTER | ", process.env.NEXT_PUBLIC_BACKEND_URL)
    const hasMounted = useHasMounted();
    const playerRef = useRef(null)
    if (!hasMounted) {
        return (
            <></> //fragment
        )
    }

    const { currentTrack, setCurrentTrack } = useContext(TrackContext) as ITrackContext
    console.log(">>>check track context:", currentTrack)

    if (playerRef?.current && currentTrack?.isPlaying === false) {
        //@ts-ignore
        playerRef?.current?.audio?.current?.pause();
    }
    if (playerRef?.current && currentTrack?.isPlaying === true) {
        //@ts-ignore
        playerRef?.current?.audio?.current?.play();
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
                        <div style={{ color: '#ccc' }}>{currentTrack.title}</div>
                        <div style={{ color: 'black' }}>{currentTrack.description}</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter;