import { useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js'
import { WaveSurferOptions } from "wavesurfer.js";


export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}


// WaveSurfer hook
export const useWavesurfer = (
    containerRef: React.RefObject<HTMLDivElement>,
    options: Omit<WaveSurferOptions, 'container'>,
) => {
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