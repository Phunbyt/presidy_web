import { Paper, Tab, Tabs } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import LinkIcon from "@mui/icons-material/Link";
import HistoryIcon from "@mui/icons-material/History";
import PaymentsIcon from "@mui/icons-material/Payments";
const ModeratorTabs = ({ activeTab, handleTabChange }: { activeTab: number; handleTabChange: (event: React.SyntheticEvent, value: number) => void }) => {
  return (
    <Paper sx={{ mb: 3 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab
          label="My Subscriptions"
          icon={<LinkIcon />}
          iconPosition="start"
        />
        <Tab
          label="Bank Accounts"
          icon={<PaymentIcon />}
          iconPosition="start"
        />
        <Tab
          label="Payout History"
          icon={<HistoryIcon />}
          iconPosition="start"
        />
        <Tab label="Payment Receipts" icon={<PaymentsIcon />} iconPosition="start" />
      </Tabs>
    </Paper>
  );
};

export default ModeratorTabs;
