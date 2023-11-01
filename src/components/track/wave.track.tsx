'use client'
import { useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = () => {

    // useEffect(() => {
    //     const element = document.getElementById('hoidanit');
    //     if (element) {
    //         WaveSurfer.create({
    //             container: element,
    //             waveColor: 'rgb(200, 0, 200)',
    //             progressColor: 'rgb(100, 0, 100)',
    //             url: '/audio/hoidanit.mp3',
    //         })
    //     }
    // }, [])

    useEffect(() => {
        const wavesurfer = WaveSurfer.create({
            container: document.getElementById('hoidanit')!,
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: '/audio/hoidanit.mp3',
        })

        wavesurfer.on('click', () => {
            wavesurfer.play()
        })
    }, [])

    return (
        <div id='hoidanit'>
            Wave Track Detail!
        </div>
    )
}

export default WaveTrack;