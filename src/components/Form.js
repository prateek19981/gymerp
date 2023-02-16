import {
  Box,
  TextField,
  Typography,
  Stack,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { register, addUser, login } from "../slice/userSlice/userSlice";
import { DatePicker } from "@mui/x-date-pickers";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase_setup/firebase";
import { addUserToStore } from "../slice/userSlice/userSlice";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useRef } from "react";

const Form = ({
  title,
  type,
  setEmail,
  setPassword,
  password,
  email,
  name,
  setName,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const formRef = useRef();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    gender: "female",
    role: "member",
    adminId: "",
    dob: "",
  });

  async function handleAction(type, state) {
    const authentication = getAuth();

    if (type === "register") {
      const valid = formRef.current.reportValidity();

      if (valid) {
        dispatch(addUserToStore(user))
          .unwrap()
          .then((res) => {
            navigate("/profile");
          })
          .catch((err) => {});
      }
    } else if (type === "login") {
      dispatch(login(user))
        .unwrap()
        .then((res) => {
          navigate("/profile");
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ margin: "100px" }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontFamily: "monospace",
          fontWeight: "600",
        }}>
        {title}
      </Typography>
      {type === "register" ? (
        <>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              margin: "26px",
              gap: "20px",
            }}
            noValidate
            autoComplete="off"
            ref={formRef}>
            <TextField
              id="name"
              label="Enter name"
              variant="outlined"
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, name: e.target.value };
                })
              }
            />
            <TextField
              id="email"
              label="Enter the Email"
              variant="outlined"
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, email: e.target.value };
                })
              }
            />
            <TextField
              id="password"
              label="Enter the Password"
              variant="outlined"
              type="password"
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, password: e.target.value };
                })
              }
            />
            <TextField
              id="number"
              label="Enter number"
              variant="outlined"
              type="number"
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, number: e.target.value };
                })
              }
            />
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue=""
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setUser((p) => {
                  return { ...p, dob: e.target.value };
                });
              }}
            />
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, gender: e.target.value };
                })
              }
              defaultValue="female"
              label="gender"
              name="radio-buttons-group">
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <Select
              id="demo-simple-select"
              value={user.role}
              label="user"
              onChange={(e) => {
                setUser((p) => {
                  return { ...p, role: e.target.value };
                });
              }}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="member">Member</MenuItem>
            </Select>
            {user.role === "member" && (
              <TextField
                required={true}
                id="number"
                style={{ width: "93%" }}
                label="Enter Admin Id"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setUser((p) => {
                    return { ...p, adminId: e.target.value };
                  })
                }
              />
            )}
          </Box>

          <Button
            title={title}
            handleAction={handleAction}
            type={type}
            state={location.state}
          />
        </>
      ) : (
        <>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              margin: "26px",
              gap: "20px",
            }}
            noValidate
            autoComplete="off">
            <TextField
              id="email"
              label="Enter the Email"
              variant="outlined"
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, email: e.target.value };
                })
              }
            />
            <TextField
              id="password"
              label="Enter the Password"
              variant="outlined"
              type="password"
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, password: e.target.value };
                })
              }
            />
          </Box>
          <Button
            title={title}
            handleAction={handleAction}
            type={type}
            state={location.state}
          />
        </>
      )}
    </Stack>
  );
};

export default Form;
