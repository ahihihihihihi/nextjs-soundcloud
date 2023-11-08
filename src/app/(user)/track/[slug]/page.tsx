import WaveTrack from '@/components/track/wave.track'
import Container from '@mui/material/Container'
import { sendRequest } from '@/utils/api';


const DetailTrackPage = async (props: any) => {
    const { params } = props;

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
        method: 'GET'
    })

    console.log(">>>check res DetailTrackPage", res)

    return (
        <Container>
            Detail Track Page
            <div>
                {
                    res.statusCode === 200 &&
                    <WaveTrack
                        track={res?.data ?? null}
                    />
                }

            </div>
        </Container>
    )
}

export default DetailTrackPage;