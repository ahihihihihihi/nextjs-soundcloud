import WaveTrack from '@/components/track/wave.track'
import Container from '@mui/material/Container'
import { sendRequest } from '@/utils/api';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/(user)/api/auth/[...nextauth]/route";


const DetailTrackPage = async (props: any) => {
    const session = await getServerSession(authOptions)
    console.log(">>>check session DetailTrackPage", session)
    const { params } = props;

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
        method: 'GET'
    })

    const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
        url: 'http://localhost:8000/api/v1/tracks/comments',
        method: 'POST',
        // headers: {
        //     'Authorization': `Bearer ${session}`
        // },
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: params.slug,
            sort: "-createdAt"
        }
    })

    console.log(">>>check res DetailTrackPage", res)
    console.log(">>>check res DetailTrackPage1", res1)

    return (
        <Container>
            Detail Track Page
            <div>
                {
                    res.statusCode === 200 &&
                    <WaveTrack
                        track={res?.data ?? null}
                        comments={res1?.data?.result ?? null}
                    />
                }

            </div>
        </Container>
    )
}

export default DetailTrackPage;