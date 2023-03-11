import React from "react";
import { Stack } from "@mui/system";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { Typography, Box, MenuItem, Chip, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import Textfield from "../../components/FormsUI/Textfield";
import Select from "../../components/FormsUI/Select";
import DateTimePicker from "../../components/FormsUI/DateTimePicker";
import Button from "../../components/FormsUI/Button";
import { addUserByAdmin } from "../../slice/userSlice/userSlice";

import { useState, useEffect } from "react";

const AddMember = () => {
  const dispatch = useDispatch();
  const memberships = useSelector((state) => state.memberships);

  let user = useSelector((state) => state.users);

  const [planDetail, setPlanDetail] = useState({});
  console.log({ planDetail });
  function setPlanHandler(plan) {
    console.log("inside [plan handler", plan);
    console.log({ memberships });
    const planObj = memberships.find((item) => {
      return item.name.toLowerCase() === plan.toLowerCase();
    });
    setPlanDetail((p) => {
      return planObj;
    });
  }

  // useEffect(() => {
  //   console.log("in use");
  //   INITIAL_FORM_STATE.planDetail = planDetail;
  // }, [planDetail]);

  const INITIAL_FORM_STATE = {
    name: "",
    lastname: "gupta",
    email: "xxx@123.com",
    number: "12345",
    weight: "123",
    streetname: "test",
    city: "test",
    zip: "123",
    state: "test",
    joiningDate: "",
    plan: "",
    planDetail: planDetail,
    dob: "1986-05-12",
    password: "12345678",
    adminId: user.email,
  };
  const { setFieldValue } = useFormik({
    initialValues: INITIAL_FORM_STATE,
  });

  useEffect(() => {
    setFieldValue("planDetail", planDetail);
    console.log({ INITIAL_FORM_STATE });
  }, [planDetail]);

  console.log({ INITIAL_FORM_STATE });
  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string().email("invalid email").required("required"),
    weight: Yup.number().required("Required").typeError("enter valid number"),
    streetname: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.number().required("Required").typeError("enter valid number"),
    joiningDate: Yup.date().required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
    dob: Yup.date().required("Required"),
    plan: Yup.string().required("Required"),
    number: Yup.number()
      .integer()
      .required("required")
      .typeError("enter valid phone"),
  });

  return (
    <Stack width="100%">
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        onSubmit={(val) => {
          val = { ...val, planDetail };
          console.log(val);
          dispatch(addUserByAdmin(val));
        }}>
        <Form>
          <Stack
            sx={{
              height: "53.33%",
              width: "90%",
              backgroundColor: "white",
              boxShadow: "2px 1px 10px #d5dbe0",
              margin: "1% auto",
              textAlign: "center",
              padding: "1%",
              borderRadius: "10px",
            }}>
            <Typography
              variant="h4"
              fontFamily={"sans-serif"}
              fontWeight="600"
              letterSpacing={5}
              lineHeight={2}>
              Member Details
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%">
              <Stack width="33.33%" height="100%" sx={{ margin: "1%" }}>
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
                  <Textfield name="name" label="first name" />
                  <Textfield
                    label="Phone number"
                    variant="outlined"
                    name="number"
                  />
                  <Textfield label="Weight" name="weight" variant="outlined" />
                </Box>
              </Stack>
              <Stack width="33.33%" height="100%" sx={{ margin: "1%" }}>
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
                  <Textfield name="lastname" label="last name" />
                  <Textfield name="email" label="Email" variant="outlined" />
                  <Textfield
                    name="password"
                    label="member login password"
                    variant="outlined"
                    type="password"
                  />
                  {/* <Textfield
                    id="date"
                    label="date of birth"
                    type="date"
                    defaultValue=""
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> */}
                </Box>
              </Stack>
              <Stack width="33.33%" height="100%">
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
                  <Select
                    label="gender"
                    name="gender"
                    options={{
                      male: "male",
                      female: "female",
                      other: "other",
                    }}
                  />
                  <DateTimePicker name="joiningDate" label="joining date" />
                  <DateTimePicker name="dob" label="date of birth" />
                </Box>
              </Stack>
            </Box>
          </Stack>
          <Stack
            sx={{
              height: "23.33%",
              width: "90%",
              backgroundColor: "white",
              boxShadow: "2px 1px 10px #d5dbe0",
              margin: "1% auto",
              textAlign: "center",
              borderRadius: "10px",
            }}>
            <Typography
              variant="h4"
              fontFamily={"sans-serif"}
              fontWeight="600"
              letterSpacing={5}
              lineHeight={2}
              color="lightslate">
              Address
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                margin: "26px",
                gap: "20px",
              }}
              noValidate
              autoComplete="off">
              <Textfield
                name="streetname"
                label="streetname"
                variant="outlined"
              />
              <Textfield label="city" name="city" variant="outlined" />
              <Textfield name="zip" label="zip/postalcode" variant="outlined" />
              <Textfield
                id="state"
                name="state"
                label="state"
                variant="outlined"
              />
            </Box>
          </Stack>
          <Stack
            sx={{
              height: "23.33%",
              width: "90%",
              backgroundColor: "white",
              boxShadow: "2px 1px 10px #d5dbe0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1% auto",
              padding: "2%",
              borderRadius: "10px",
            }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",

                gap: "20px",
              }}
              noValidate
              autoComplete="off">
              <Select
                defaultValue="Ace"
                label="Plan"
                planDetail={planDetail}
                name="plan"
                helperText="Please select membership plan"
                options={{
                  Ace: "Ace",
                  Beginner: "Beginner",
                  Pro: "Pro",
                }}
                setPlanHandler={setPlanHandler}
              />
              {Object.keys(planDetail).length !== 0 && (
                <Stack
                  sx={{
                    height: "100%",
                    textAlign: "start",
                    padding: "9px",
                    width: "67%",
                    margin: "0 4%",
                    border: "1px dashed black",
                  }}>
                  <Typography variant="h5">{planDetail.name}</Typography>
                  <Divider />
                  <Stack direction="row" justifyContent="space-around">
                    <Stack justifyContent="center" alignItems="center">
                      <Typography variant="h7">Duration</Typography>
                      <Chip
                        label={planDetail.duration}
                        sx={{ backgroundColor: "#f5e6f4" }}
                      />
                    </Stack>
                    <Stack justifyContent="center" alignItems="center">
                      <Typography variant="h7">Price</Typography>
                      <Chip
                        label={planDetail.price}
                        sx={{ backgroundColor: "#f5e6f4" }}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </Box>
          </Stack>

          <Button sx={{ width: "50%", marginLeft: "26%", marginTop: "40px" }}>
            ➕ Add Member
          </Button>
        </Form>
      </Formik>
    </Stack>
  );
};

export default AddMember;
