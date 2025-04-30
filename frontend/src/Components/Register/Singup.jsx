import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Heading,
  Text,
  Container,
  VStack,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../Redux/Auth/Action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo1.png";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Required"),
});

const Signup = () => {
  const initialValues = { email: "", username: "", password: "", name: "" };
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (values, actions) => {
    dispatch(signupAction(values));
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (auth.signup?.username) {
      navigate("/login");
      toast({
        title: 'Account created successfully',
        status: 'success',
        duration: 8000,
        isClosable: true,
      });
    }
  }, [auth.signup, navigate, toast]);

  return (
    <Container maxW="md" py={8}>
      <VStack spacing={6}>
        <Box textAlign="center">
          <img
            src={logo}
            alt="ELearnXpert Logo"
            style={{ maxHeight: "60px", margin: "0 auto" }}
          />
          <Heading size="md" mt={2} color="gray.600">Create your account</Heading>
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

                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.username && form.touched.username}
                      >
                        <Input 
                          {...field} 
                          id="username" 
                          placeholder="Username"
                          size="md"
                        />
                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <Input 
                          {...field} 
                          id="name" 
                          placeholder="Full Name"
                          size="md"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                    Sign Up
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>

        <Box textAlign="center" p={4}>
          <Text>
            Already have an account?{" "}
            <Text
              as="span"
              color="blue.500"
              fontWeight="medium"
              cursor="pointer"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Text>
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Signup;