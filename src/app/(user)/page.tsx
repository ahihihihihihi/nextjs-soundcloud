import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/auth.options";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'clone soundcloud',
  description: 'practise nextjs',
}

export default async function HomePage() {

  // demo error
  // const a = 1
  // console.log(a.b.c)

  const session = await getServerSession(authOptions)
  // console.log(">>>check session server:", session)

  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'CHILL',
      limit: 10
    }
  })

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'WORKOUT',
      limit: 10
    }
  })

  const parties = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'PARTY',
      limit: 10
    }
  })


  return (
    <Container>
      <MainSlider
        title={'chill top'}
        data={chills?.data ?? []}
      />
      <MainSlider
        title={'workout top'}
        data={workouts?.data ?? []}
      />
      <MainSlider
        title={'party top'}
        data={parties?.data ?? []}
      />
    </Container>
  );
}
