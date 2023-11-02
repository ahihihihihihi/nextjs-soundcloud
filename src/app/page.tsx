import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function HomePage() {

  const session = await getServerSession(authOptions)
  // console.log(">>>check session server:", session)

  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'POST',
    body: {
      category: 'CHILL',
      limit: 10
    }
  })

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'POST',
    body: {
      category: 'WORKOUT',
      limit: 10
    }
  })

  const parties = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
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
