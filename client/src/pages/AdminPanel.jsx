import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

import "../styles/Admin.css";
import ShopsPanel from "../components/admin/ShopsPanel";
import { useAuthStore } from "../store/Store";
import OrderPanelList from "../components/admin/OrderPanelList";
import AdminsPanelList from "../components/admin/AdminsPanelList";

const AdminPanel = () => {
  const role = useAuthStore((state) => state.role);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="admin-panel-container">
        <h1>Адміністративна панель</h1>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            height: "auto",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Заклади" {...a11yProps(0)} />
            <Tab label="Замовлення" {...a11yProps(1)} />
            {/* <Tab label="Відгуки" {...a11yProps(2)} /> */}
            {role === "owner" && <Tab label="Адміни" {...a11yProps(2)} />}
          </Tabs>
          <TabPanel value={value} index={0}>
            <ShopsPanel />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderPanelList />
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
            Відгуки
          </TabPanel> */}
          {role === "owner" && (
            <TabPanel value={value} index={2}>
              <AdminsPanelList />
            </TabPanel>
          )}
        </Box>
      </div>
    </>
  );
};

export default AdminPanel;
