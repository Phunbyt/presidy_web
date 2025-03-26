import { Container } from "@mui/material";
import UserSubscriptions from "./UserSubscriptions";
import AvailableSubscriptions from "./AvailableSubscriptions";

import { useContext, useEffect, useState } from "react";
import {
  getAPublicPlans,
  getAvailablePlans,
  getUserPlans,
} from "../../api/lib/plan";
import { GlobalContext } from "../../context/GlobalContext";

const Subscriptions = () => {
  const { token } = useContext(GlobalContext);

  const [userSubscriptionsData, setUserSubscriptionsData] = useState([]);
  const [availableSubscriptionsData, setAvailableSubscriptionsData] = useState(
    []
  );

  const handleUserSubscriptions = async () => {
    if (token) {
      const { data } = await getUserPlans({ token });

      setUserSubscriptionsData(data.planIds);
    }
  };
  const handleAvailableSubscriptions = async () => {
    if (token) {
      const { data } = await getAvailablePlans({ token });
      setAvailableSubscriptionsData(data);
    } else {
      const { data } = await getAPublicPlans();

      setAvailableSubscriptionsData(data);
    }
  };

  useEffect(() => {
    handleUserSubscriptions();
    handleAvailableSubscriptions();
  }, []);

  return (
    <Container>
      <UserSubscriptions userSubscriptionsData={userSubscriptionsData} />
      <AvailableSubscriptions
        availableSubscriptionsData={availableSubscriptionsData}
      />
    </Container>
  );
};

export default Subscriptions;
