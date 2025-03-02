import { Container } from "@mui/material";
import UserSubscriptions from "./UserSubscriptions";
import AvailableSubscriptions from "./AvailableSubscriptions";
import { plans } from "../../assets/svgs/test.plans";

const Subscriptions = () => {
  return (
    <Container>
      <UserSubscriptions userSubscriptionsData={plans} />
      <AvailableSubscriptions
        availableSubscriptionsData={[...plans, ...plans]}
      />
    </Container>
  );
};

export default Subscriptions;


