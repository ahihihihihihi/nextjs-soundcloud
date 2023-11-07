'use client'
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useContext } from 'react'
import { TrackContext } from "@/lib/track.wrapper";



const AppFooter = () => {
    // console.log(">>> check env: FOOTER | ", process.env.NEXT_PUBLIC_BACKEND_URL)
    const hasMounted = useHasMounted();

    if (!hasMounted) {
        return (
            <></> //fragment
        )
    }

    const { currentTrack, setCurrentTrack } = useContext(TrackContext) as ITrackContext
    console.log(">>>check track context:", currentTrack)



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
                        layout="horizontal-reverse"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                        volume={0.5}
                        style={{
                            backgroundColor: '#f2f2f2',
                            boxShadow: 'unset',
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
                        <div style={{ color: '#ccc' }}>Alex</div>
                        <div style={{ color: 'black' }}>Who are you?</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter;