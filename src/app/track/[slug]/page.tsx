import WaveTrack from '@/components/track/wave.track'
import Container from '@mui/material/Container'
import { sendRequest } from '@/utils/api';


import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation';


type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const temp = params?.slug?.split('.html') ?? []
    const temp2 = (temp[0]?.split('-') ?? []) as string[]
    const id = temp2[temp2.length - 1]

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: 'GET',
    })

    return {
        title: res.data?.title,
        description: res.data?.description,
        openGraph: {
            title: 'Hỏi Dân IT',
            description: 'Beyond Your Coding Skills',
            type: 'website',
            images: [`https://raw.githubusercontent.com/hoidanit/images-
hosting/master/eric.png`],
        },
    }
}

export async function generateStaticParams() {

    return [
        { slug: 'sau-con-mua-653780cdee9a5c8798c20046.html' },
        { slug: 'nu-hon-bisou-653780cdee9a5c8798c20042.html' },
        { slug: 'song-cho-het-doi-thanh-xuan-653780cdee9a5c8798c20049.html' },

    ]
}

const DetailTrackPage = async (props: any) => {
    const { params } = props;

    const temp = params?.slug?.split('.html') ?? []
    const temp2 = (temp[0]?.split('-') ?? []) as string[]
    const id = temp2[temp2.length - 1]

    // await new Promise(resolve => setTimeout(resolve, 3000))

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: 'GET',
        // nextOption: { cache: 'no-store' }
    })

    const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
        method: 'POST',
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: id,
            sort: "-createdAt"
        }
    })

    // demo error
    // const a = 1
    // console.log(a.b.c)

    if (!res.data) {
        notFound()
    }

    // console.log(">>>check res DetailTrackPage", res)
    // console.log(">>>check res DetailTrackPage1", res1)

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