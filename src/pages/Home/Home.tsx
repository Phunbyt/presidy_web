import { Container } from "@mui/material";
import Hero from "./Hero";
import Features from "./Features";
import Plans from "./Plans";
import About from "./About";

const Home = () => {
  return (
    <Container>
      <Hero />
      <Features />
      <Plans />
      <About />
    </Container>
  );
};

export default Home;
