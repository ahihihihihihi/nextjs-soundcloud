'use client' // Error components must be Client Components
import AppHeader from '@/components/header/app.header'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <>
            <AppHeader />
            <div style={{
                fontFamily: 'sans-serif',
                height: 'calc(100vh - 124px)',
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    lineHeight: "48px"
                }}>
                    <h1 style={{
                        display: 'inline-block',
                        margin: '0 20px 0 0',
                        paddingRight: '23px',
                        fontSize: '24px',
                        fontWeight: '500',
                        verticalAlign: 'top',
                        borderRight: '1px solid rgba(0,0,0,.3)'
                    }}>
                        (^_^)
                    </h1>
                    <div style={{
                        display: 'inline-block'
                    }}>
                        <h2 style={{
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '28px'
                        }}>
                            Something is not right!
                        </h2>
                    </div>
                </div>
            </div >
        </>
    )
}