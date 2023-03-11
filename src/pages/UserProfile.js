import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

import { useSelector } from "react-redux";
const UserProfile = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Auth Token");

  let user = useSelector((state) => state.users.currentUser);
  const [currUser, setCurrUser] = useState(user);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      navigate("/profile");
    }
  }, [navigate, token]);

  return (
    <Stack
      direction="row"
      justifyContent="start"
      alignContent="start"
      height="90vh"
      width="100%">
      <Stack
        height="100%"
        width="100%"
        sx={{
          alignItems: "start",
          padding: "80px",
        }}>
        <Stack mb={10} alignSelf="center">
          <img
            src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ="
            className="profileImg"
          />
        </Stack>
        <Typography ml={2} mb={10} variant="h4" fontWeight={900}>
          Profile
        </Typography>

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",

            width: "100%",
          }}>
          <Stack
            sx={{
              flexGrow: "1",
            }}>
            <List>
              <ListItem
                sx={{
                  height: "90px",
                  width: "80%",
                  margin: "10px",

                  borderBottom: "1px solid #f2aaaa",
                }}>
                <ListItemText>Name</ListItemText>
                <ListItemText>{currUser?.name}</ListItemText>
              </ListItem>
              <ListItem
                sx={{
                  height: "90px",
                  width: "80%",
                  margin: "10px",

                  borderBottom: "1px solid #f2aaaa",
                }}>
                <ListItemText>Gender</ListItemText>
                <ListItemText>{currUser?.gender}</ListItemText>
              </ListItem>
              <ListItem
                sx={{
                  height: "90px",
                  width: "80%",
                  margin: "10px",

                  borderBottom: "1px solid #f2aaaa",
                }}>
                <ListItemText>Email</ListItemText>
                <ListItemText>{currUser?.email}</ListItemText>
              </ListItem>
            </List>
          </Stack>
          <Stack
            sx={{
              flexGrow: "1",
            }}>
            {" "}
            <List>
              <ListItem
                sx={{
                  height: "90px",
                  width: "80%",
                  margin: "10px",

                  borderBottom: "1px solid #f2aaaa",
                }}>
                <ListItemText>Phone</ListItemText>
                <ListItemText>{currUser?.number}</ListItemText>
              </ListItem>
              <ListItem
                sx={{
                  height: "90px",
                  width: "80%",
                  margin: "10px",

                  borderBottom: "1px solid #f2aaaa",
                }}>
                <ListItemText>DOB</ListItemText>
                <ListItemText>28/01/1998</ListItemText>
              </ListItem>
              <ListItem
                sx={{
                  height: "90px",
                  width: "80%",
                  margin: "10px",

                  borderBottom: "1px solid #f2aaaa",
                }}>
                <ListItemText>Address</ListItemText>
                <ListItemText>
                  Flat number-99, pocket-1,sector-24, rohini delhi
                </ListItemText>
              </ListItem>
            </List>
          </Stack>
          <Stack
            sx={{
              flexGrow: "1",
            }}>
            {" "}
            <List>
              <ListItem
                sx={{
                  height: "90px",
                  width: "80%",
                  margin: "10px",

                  borderBottom: "1px solid #f2aaaa",
                }}>
                <ListItemText>Weight</ListItemText>
                <ListItemText>69</ListItemText>
              </ListItem>
              <ListItem
                sx={{
                  height: "90px",
                  width: "80%",
                  margin: "10px",

                  borderBottom: "1px solid #f2aaaa",
                }}>
                <ListItemText>Height</ListItemText>
                <ListItemText>5.8'</ListItemText>
              </ListItem>
              <ListItem
                sx={{
                  height: "90px",
                  width: "80%",
                  margin: "10px",

                  borderBottom: "1px solid #f2aaaa",
                }}>
                <ListItemText>BMI</ListItemText>
                <ListItemText>68</ListItemText>
              </ListItem>
            </List>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserProfile;
