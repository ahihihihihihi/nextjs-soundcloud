import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";


export default async function HomePage() {

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'POST',
    body: {
      category: 'CHILL',
      limit: 3
    }
  })

  console.log(">>> check res server typescripts: ", res)

  return (
    <Container>
      <MainSlider />
      <MainSlider />
      <MainSlider />
    </Container>
  );
}
