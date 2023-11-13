
export default async function NotFound() {

    return (
        <>
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
                        404
                    </h1>
                    <div style={{
                        display: 'inline-block'
                    }}>
                        <h2 style={{
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '28px'
                        }}>
                            This page could not be found.
                        </h2>
                    </div>
                </div>
            </div >
        </>
    )
}