import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
  Container,
  VStack,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signinAction } from "../../Redux/Auth/Action";
import { getUserProfileAction } from "../../Redux/User/Action";
import logo from "../../Assets/logo1.png";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const Signin = () => {
  const initialValues = { email: "", password: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, signin } = useSelector((store) => store);
  const toast = useToast();

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (token) dispatch(getUserProfileAction(token || signin));
  }, [signin, token, dispatch]);

  useEffect(() => {
    if (user?.reqUser?.username && token) {
      navigate(`/${user.reqUser?.username}`);
      toast({
        title: "Sign in successful",
        status: "success",
        duration: 8000,
        isClosable: true,
      });
    }
  }, [user.reqUser, token, navigate, toast]);

  const handleSubmit = (values, actions) => {
    dispatch(signinAction(values));
    actions.setSubmitting(false);
  };

  return (
    <Container maxW="md" py={8}>
      <VStack spacing={6}>
        <Box textAlign="center">
          <img
            src={logo}
            alt="ELearnXpert Logo"
            style={{ maxHeight: "60px", margin: "0 auto" }}
          />
          <Heading size="md" mt={2} color="gray.600">Sign in to your account</Heading>
        </Box>

        <Box w="100%" bg="white" borderRadius="md" boxShadow="sm" p={6}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <Form>
                <VStack spacing={4}>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <Input
                          {...field}
                          id="email"
                          placeholder="Email address"
                          size="md"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.password && form.touched.password}
                      >
                        <Input
                          {...field}
                          type="password"
                          id="password"
                          placeholder="Password"
                          size="md"
                        />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    w="100%"
                    mt={2}
                    colorScheme="blue"
                    type="submit"
                    isLoading={formikProps.isSubmitting}
                    size="md"
                  >
                    Sign In
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>

          <Box my={4} textAlign="center">
            <Divider my={4} />
            <Text fontSize="sm" color="gray.500" mb={2}>OR</Text>
            <Button
              as="a"
              href="http://localhost:5454/oauth2/authorization/google"
              w="100%"
              variant="outline"
              colorScheme="blue"
              size="md"
            >
              Sign in with Google
            </Button>
          </Box>
        </Box>

        <Box textAlign="center" p={4}>
          <Text>
            Don't have an account?{" "}
            <Text
              as="span"
              color="blue.500"
              fontWeight="medium"
              cursor="pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Text>
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Signin;