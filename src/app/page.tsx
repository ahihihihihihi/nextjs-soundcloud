import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";


export default async function HomePage() {

  const res = await fetch('http://localhost:8000/api/v1/tracks/top', {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      category: 'CHILL',
      limit: 10
    }),
  })

  console.log(">>> check response server: ", await res.json())

  return (
    <Container>
      <MainSlider />
      <MainSlider />
      <MainSlider />
    </Container>
  );
}
