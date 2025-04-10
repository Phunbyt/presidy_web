import { Container } from "@mui/material";

import Hero from "./Hero";
import Features from "./Features";
import Create from "./Create";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../../context/GlobalContext";

const Moderator = () => {
  const navigate = useNavigate();

  const { user } = useContext(GlobalContext);

  useEffect(() => {
    if (user.isModerator) {
      navigate("/moderator-dashboard");
    }
  }, [navigate, user.isModerator]);

  return (
    <Container>
      <Hero />
      <Features />
      <Create />
    </Container>
  );
};

export default Moderator;
