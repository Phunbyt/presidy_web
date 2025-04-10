/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/material";

import { useState, useContext, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import validator from "validator";
import { GlobalContext } from "../../context/GlobalContext";
// import { useNavigate } from "react-router";

import Header from "./Header";
import StatsCards from "./StatsCards";
import ModeratorTabs from "./ModeratorTabs";
import SubscriptionsTab from "./SubscriptionsTab";
import BankAccountsTab from "./BankAccountsTab";
import PayoutHistoryTab from "./PayoutHistoryTab";
import AddSubscriptionDialog from "./AddSubscriptionDialog";
import AddBankAccountDialog from "./AddBankAccountDialog";
// import ConfirmationDialog from "./ConfirmationDialog";
import {
  addBankAccount,
  addPlan,
  getModeratorDashboardData,
} from "../../api/lib/moderator";
import Loader from "../../components/Loader/Loader";
import { hand } from "../../assets/animations";

interface Subscription {
  id: string;
  planId: string;
  name: string;
  specialEmail: boolean;
  status: "pending" | "active" | "inactive";
  familyLink: string;
  familyActiveMembers: number;
  familyMembersLimit: number;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  firstName: string;
  lastName: string;
}

interface Payout {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "success" | "failed";
  subscription: string;
  createdAt: string;
  planId: string;
}

const ModeratorDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openSubscriptionDialog, setOpenSubscriptionDialog] = useState(false);
  const [openBankDialog, setOpenBankDialog] = useState(false);
  // const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  // const [dialogAction, setDialogAction] = useState<"delete" | "primary">(
  //   "delete"
  // );
  // const [selectedItemId, setSelectedItemId] = useState("");

  const { user, token } = useContext(GlobalContext);

  const [newSubscription, setNewSubscription] = useState({
    planId: "",
    familyLink: "",
  });

  const [newBankAccount, setNewBankAccount] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    bankName: "",
  });

  // Sample data - in a real app, this would come from API
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [availableSubscriptions, setAvailableSubscriptions] = useState<any[]>(
    []
  );

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  const [payouts, setPayouts] = useState<Payout[]>([]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSubscriptionChange = (
    e: Record<string, Record<string, string>>
  ) => {
    const { id, value, name } = e.target;

    const changeValue = id || name;

    setNewSubscription((prev) => ({ ...prev, [changeValue]: value }));
  };

  const handleBankAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewBankAccount((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddSubscription = async () => {
    setIsLoading(true);

    if (!newSubscription.planId || !newSubscription.familyLink) {
      toast.error("Please fill all required fields");
      setIsLoading(false);

      return;
    }

    if (!validator.isURL(newSubscription.familyLink)) {
      toast.error("Please enter a valid family link URL");
      setIsLoading(false);

      return;
    }

    const { data, error } = await addPlan(
      {
        ...newSubscription,
      },
      token
    );
    if (error) {
      setIsLoading(false);
      return;
    }
    const newList = availableSubscriptions.filter(
      (sub) => sub.planId !== newSubscription.planId
    );
    setAvailableSubscriptions(newList);
    setSubscriptions([...subscriptions, data]);
    setNewSubscription({
      planId: "",
      familyLink: "",
    });
    setIsLoading(false);

    setOpenSubscriptionDialog(false);
    toast.success("Subscription added successfully!");
  };

  const handleAddBankAccount = async () => {
    setIsLoading(true);

    if (
      !newBankAccount.bankName ||
      !newBankAccount.accountNumber ||
      !newBankAccount.lastName ||
      !newBankAccount.firstName
    ) {
      setIsLoading(false);

      toast.error("Please fill all required fields");
      return;
    }

    if (bankAccounts.length >= 3) {
      setIsLoading(false);
      toast.error("You can only add up to 3 bank accounts");
      return;
    }

    const { data, error } = await addBankAccount(
      {
        ...newBankAccount,
        accountNumber: +newBankAccount.accountNumber,
      },
      token
    );
    if (error) {
      setIsLoading(false);
      return;
    }

    setBankAccounts([...bankAccounts, data]);
    setNewBankAccount({
      firstName: "",
      lastName: "",
      accountNumber: "",
      bankName: "",
    });
    setIsLoading(false);
    setOpenBankDialog(false);
    toast.success("Bank account added successfully!");
  };

  // const handleDeleteItem = (type: "subscription" | "bank", id: string) => {
  //   if (type === "subscription") {
  //     setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  //   } else {
  //     setBankAccounts(bankAccounts.filter((account) => account.id !== id));
  //   }
  //   setConfirmDialogOpen(false);
  //   toast.success("Item deleted successfully");
  // };

  // const openConfirmDialog = (action: "delete" | "primary", id: string) => {
  //   setDialogAction(action);
  //   setSelectedItemId(id);
  //   setConfirmDialogOpen(true);
  // };

  // const handleConfirmAction = () => {
  //   if (dialogAction === "delete") {
  //     // Determine if it's a subscription or bank account
  //     const isSubscription = subscriptions.some(
  //       (sub) => sub.id === selectedItemId
  //     );
  //     handleDeleteItem(
  //       isSubscription ? "subscription" : "bank",
  //       selectedItemId
  //     );
  //   }
  // };

  const calculateEarnings = () => {
    // Calculate total earnings from payouts
    return payouts
      .filter((p) => p.status === "success")
      .reduce((sum, payout) => sum + +payout.amount, 0);
  };

  const calculatePendingPayouts = () => {
    // Calculate expected earnings from active subscriptions
    return payouts
      .filter((sub) => sub.status === "pending")
      .reduce((sum, sub) => {
        const amount = +sub.amount;
        return sum + amount;
      }, 0);
  };

  const handleSubscriptionDialog = (value: boolean) => {
    setOpenSubscriptionDialog(value);
  };

  const handleBankDialog = (value: boolean) => {
    if (bankAccounts.length >= 3) {
      setIsLoading(false);
      setOpenBankDialog(false);
      toast.error("You can only add up to 3 bank accounts");
      return;
    }

    setOpenBankDialog(value);
  };

  // const handleConfirmDialogOpen = (value) => {
  //   setConfirmDialogOpen(value);
  // };

  // const handleConfirmDialog = (buttonValue, id) => {
  //   openConfirmDialog(buttonValue, id);
  // };

  const handleDashboardData = async () => {
    setIsPageLoading(true);
    const { data } = await getModeratorDashboardData(token);
    setSubscriptions(data.moderatorPlans);
    setBankAccounts(data.bankAccounts);
    setPayouts(data.transactions);
    setAvailableSubscriptions(data.emptyPlans);
    setIsPageLoading(false);
  };

  useLayoutEffect(() => {
    handleDashboardData();
  }, []);

  return (
    <Container>
      <Header firstName={user?.firstName} lastName={user?.lastName} />

      {isPageLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Loader animationData={hand} />
        </Box>
      ) : (
        <>
          {/* Stats Cards */}
          <StatsCards
            subscriptions={subscriptions}
            earnings={calculateEarnings().toFixed(2)}
            payouts={calculatePendingPayouts().toFixed(2)}
          />
          {/* Tabs */}
          <ModeratorTabs
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />

          {/* Tab Content */}
          <Box>
            {/* Subscriptions Tab */}
            {activeTab === 0 && (
              <SubscriptionsTab
                handleSubscriptionDialog={handleSubscriptionDialog}
                subscriptions={subscriptions}
              />
            )}

            {/* Bank Accounts Tab */}
            {activeTab === 1 && (
              <BankAccountsTab
                handleBankDialog={handleBankDialog}
                bankAccounts={bankAccounts}
                // handleConfirmDialog={handleConfirmDialog}
              />
            )}

            {/* Payout History Tab */}
            {activeTab === 2 && <PayoutHistoryTab payouts={payouts} />}
          </Box>
        </>
      )}
      {/* Add Subscription Dialog */}
      <AddSubscriptionDialog
        openSubscriptionDialog={openSubscriptionDialog}
        handleSubscriptionDialog={handleSubscriptionDialog}
        newSubscription={newSubscription}
        handleSubscriptionChange={handleSubscriptionChange}
        handleAddSubscription={handleAddSubscription}
        availableSubscriptions={availableSubscriptions}
        isLoading={isLoading}
      />
      {/* Add Bank Account Dialog */}
      <AddBankAccountDialog
        openBankDialog={openBankDialog}
        handleBankDialog={handleBankDialog}
        newBankAccount={newBankAccount}
        handleBankAccountChange={handleBankAccountChange}
        handleAddBankAccount={handleAddBankAccount}
        isLoading={isLoading}
      />
      {/* Confirmation Dialog */}
      {/* <ConfirmationDialog
        confirmDialogOpen={confirmDialogOpen}
        handleConfirmDialogOpen={handleConfirmDialogOpen}
        dialogAction={dialogAction}
        handleConfirmAction={handleConfirmAction}
      /> */}
      <Box
        sx={{
          mb: 10,
        }}
      />
    </Container>
  );
};

export default ModeratorDashboard;
