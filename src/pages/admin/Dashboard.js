import React from "react";
import { Stack, Box, Grid, Typography } from "@mui/material";

import ActiveIcon from "../../assets/icons/active.png";
import ExpiredIcon from "../../assets/icons/expired.png";
import CollectionIcon from "../../assets/icons/todayCollection.png";
import WeekCollectionIcon from "../../assets/icons/rupee.png";
import PendingIcon from "../../assets/icons/pending.png";
import TodayRenewalIcon from "../../assets/icons/renewal.png";
import MonthRenewalIcon from "../../assets/icons/renewal_month.png";
import AttendenceIcon from "../../assets/icons/attendence.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TabPanel from "../../components/TabPanel";
import MembershipTab from "../../components/MembershipTab";

import { Pie } from "react-chartjs-2";
import { SideNav } from "./SideNav";

const Dashboard = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [tabVal, setTabVal] = useState(0);
  const data = {
    labels: ["earnings", "expenses"],
    datasets: [
      {
        label: "earnings",
        data: [12, 19],
        backgroundColor: ["#119e37", "#c71429"],
        borderColor: ["#065e1d", "#850514"],
        borderWidth: 1,
      },
    ],
  };

  function handleChange(e, val) {
    console.log(val);
    setTabVal(val);
  }
  return (
    <Box display="flex" width="100%">
      <Stack direction="row" height="100%" width="100%">
        {/* <Stack
          sx={{
            backgroundColor: "white",
            width: "17%",
            height: "100vh",
            minWidth: "160px",
            boxShadow: "6px 5px 6px lightgray",
            padding: "2%",
            zIndex: 1,
          }}>
          <SideNav />
        </Stack> */}
        <Stack
          sx={{
            height: { xs: "5%", md: "10%", sm: "100%", lg: "100%" },
            width: { xs: "100%", md: "100%", sm: "100%", lg: "100%" },
          }}>
          <Grid
            container
            padding={2}
            sx={{
              height: { xs: "5%", md: "100vh", sm: "10%", lg: "20%" },
              width: { xs: "100%", md: "80vw", sm: "100%", lg: "100%" },
            }}>
            <Grid xs={3}>
              <Stack
                direction="row"
                sx={{
                  height: "25%",
                  width: "90%",
                  backgroundColor: "lightblue",
                  borderRadius: "2%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "17%",
                }}>
                <Stack>
                  <i>
                    <img src={ActiveIcon} height={50} />
                  </i>
                </Stack>
                <Stack>
                  <Typography>11</Typography>
                  <Typography>active members</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={3}>
              <Stack
                direction="row"
                sx={{
                  height: "15%",
                  width: "90%",
                  backgroundColor: "lightgreen",
                  borderRadius: "2%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "17%",
                }}>
                <Stack>
                  <i>
                    <img src={ExpiredIcon} height={50} />
                  </i>
                </Stack>
                <Stack>
                  <Typography>11</Typography>
                  <Typography>today plan expiry</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={3}>
              <Stack
                direction="row"
                sx={{
                  height: "15%",
                  width: "90%",
                  backgroundColor: "lightgray",
                  borderRadius: "2%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "17%",
                }}>
                <Stack>
                  <i>
                    <img src={CollectionIcon} height={50} />
                  </i>
                </Stack>
                <Stack>
                  <Typography>₹ 1400</Typography>
                  <Typography>todays collection</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={3}>
              <Stack
                direction="row"
                sx={{
                  height: "15%",
                  width: "90%",
                  backgroundColor: "lightpink",
                  borderRadius: "2%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "17%",
                }}>
                <Stack>
                  <i>
                    <img src={WeekCollectionIcon} height={50} />
                  </i>
                </Stack>
                <Stack>
                  <Typography>₹ 1200</Typography>
                  <Typography>weeks collection</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Grid
            container
            padding={2}
            sx={{
              height: { xs: "5%", md: "100vh", sm: "10%", lg: "20%" },
              width: { xs: "100%", md: "80vw", sm: "100%", lg: "100%" },
            }}>
            <Grid xs={3}>
              <Stack
                direction="row"
                sx={{
                  height: "15%",
                  width: "90%",
                  backgroundColor: "lightblue",
                  borderRadius: "2%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "17%",
                }}>
                <Stack>
                  <i>
                    <img src={PendingIcon} height={50} />
                  </i>
                </Stack>
                <Stack>
                  <Typography>11</Typography>
                  <Typography>pending balance</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={3}>
              <Stack
                direction="row"
                sx={{
                  height: "15%",
                  width: "90%",
                  backgroundColor: "lightgreen",
                  borderRadius: "2%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "17%",
                }}>
                <Stack>
                  <i>
                    <img src={TodayRenewalIcon} height={50} />
                  </i>
                </Stack>
                <Stack>
                  <Typography>11</Typography>
                  <Typography>todays renewal</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={3}>
              <Stack
                direction="row"
                sx={{
                  height: "15%",
                  width: "90%",
                  backgroundColor: "lightgray",
                  borderRadius: "2%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "17%",
                }}>
                <Stack>
                  <i>
                    <img src={MonthRenewalIcon} height={50} />
                  </i>
                </Stack>
                <Stack>
                  <Typography>₹ 1400</Typography>
                  <Typography>months renewal</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={3}>
              <Stack
                direction="row"
                sx={{
                  height: "15%",
                  width: "90%",
                  backgroundColor: "lightpink",
                  borderRadius: "2%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "17%",
                }}>
                <Stack>
                  <i>
                    <img src={AttendenceIcon} height={50} />
                  </i>
                </Stack>
                <Stack>
                  <Typography>12</Typography>
                  <Typography>member present</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Grid
            container
            padding={2}
            sx={{
              height: { xs: "5%", md: "10%", sm: "10%", lg: "20%" },
            }}>
            <Grid xs={6}>
              <Stack
                direction="row"
                sx={{
                  height: "70%",
                  width: "95%",
                  backgroundColor: "lightblue",
                  borderRadius: "2%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "17%",
                }}>
                <Stack
                  textAlign="center"
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Typography>Expenses vs Earnings</Typography>
                  <Pie data={data} />;
                </Stack>
              </Stack>
            </Grid>

            <Grid xs={6}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: "70%",
                  width: "100%",
                  backgroundColor: "lightgray",
                  borderRadius: "2%",

                  padding: "2%",
                }}>
                <Tabs
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  value={tabVal}
                  style={{ width: "100%" }}
                  onChange={handleChange}>
                  <Tab label="Membership Expires" />
                  <Tab label="Membership due" />
                </Tabs>
                <TabPanel value={tabVal} index={0}>
                  <MembershipTab type="expired" />
                </TabPanel>
                <TabPanel value={tabVal} index={1}>
                  <MembershipTab type="due" />
                </TabPanel>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Dashboard;
