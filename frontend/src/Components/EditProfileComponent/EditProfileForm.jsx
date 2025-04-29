import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
  Avatar,
  Box,
  Heading,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserDetailsAction,
  getUserProfileAction,
} from "../../Redux/User/Action";
import { useToast } from "@chakra-ui/react";
import ChangeProfilePhotoModal from "./ChangeProfilePhotoModal";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";

const EditProfileForm = () => {
  const { user } = useSelector((store) => store);
  const toast = useToast();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState(null);

  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    mobile: "",
    gender: "",
    website: "",
    private: false,
  });

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  useEffect(() => {
    const newValue = {};
    for (let item in initialValues) {
      if (user.reqUser && user.reqUser[item]) {
        newValue[item] = user.reqUser[item];
      }
    }
    formik.setValues(newValue);
  }, [user.reqUser]);

  const formik = useFormik({
    initialValues: { ...initialValues },
    onSubmit: (values) => {
      const data = {
        jwt: token,
        data: { ...values, id: user.reqUser?.id },
      };
      dispatch(editUserDetailsAction(data));
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  async function handleProfileImageChange(event) {
    const selectedFile = event.target.files[0];
    const image = await uploadToCloudinary(selectedFile);
    setImageFile(image);
    const data = {
      jwt: token,
      data: { image, id: user.reqUser?.id },
    };
    dispatch(editUserDetailsAction(data));
    onClose();
  }

  return (
    <Box maxW="3xl" mx="auto" p={{ base: 4, md: 8 }} bg="white" borderRadius="lg" boxShadow="sm">
      <Heading as="h2" size="lg" mb={6} color="gray.800">
        Edit Profile
      </Heading>
      
      <Flex alignItems="center" mb={8}>
        <Avatar
          size="xl"
          name={user.reqUser?.name}
          src={
            imageFile ||
            user.reqUser?.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          mr={4}
        />
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            {user.reqUser?.username}
          </Text>
          <Button
            variant="link"
            colorScheme="blue"
            onClick={onOpen}
            fontSize="sm"
          >
            Change Profile Photo
          </Button>
        </Box>
      </Flex>

      <Divider mb={6} />

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={6}>
          <FormControl>
            <Flex direction={{ base: "column", md: "row" }}>
              <FormLabel width={{ md: "30%" }} fontWeight="medium" pt={2}>
                Name
              </FormLabel>
              <Box flex={1}>
                <Input
                  placeholder="Name"
                  size="md"
                  {...formik.getFieldProps("name")}
                />
                <FormHelperText fontSize="xs" mt={1} color="gray.500">
                  Help people discover your account by using the name you're known by.
                </FormHelperText>
              </Box>
            </Flex>
          </FormControl>

          <FormControl>
            <Flex direction={{ base: "column", md: "row" }}>
              <FormLabel width={{ md: "30%" }} fontWeight="medium" pt={2}>
                Username
              </FormLabel>
              <Box flex={1}>
                <Input
                  placeholder="Username"
                  size="md"
                  {...formik.getFieldProps("username")}
                />
                <FormHelperText fontSize="xs" mt={1} color="gray.500">
                  You can change your username every 14 days.
                </FormHelperText>
              </Box>
            </Flex>
          </FormControl>

          <FormControl>
            <Flex direction={{ base: "column", md: "row" }}>
              <FormLabel width={{ md: "30%" }} fontWeight="medium" pt={2}>
                Website
              </FormLabel>
              <Box flex={1}>
                <Input
                  placeholder="Website"
                  size="md"
                  {...formik.getFieldProps("website")}
                />
              </Box>
            </Flex>
          </FormControl>

          <FormControl>
            <Flex direction={{ base: "column", md: "row" }}>
              <FormLabel width={{ md: "30%" }} fontWeight="medium" pt={2}>
                Bio
              </FormLabel>
              <Box flex={1}>
                <Textarea
                  placeholder="Tell your story..."
                  size="md"
                  rows={4}
                  {...formik.getFieldProps("bio")}
                />
                <FormHelperText fontSize="xs" color="gray.500">
                  Max 150 characters
                </FormHelperText>
              </Box>
            </Flex>
          </FormControl>

          <Box py={6}>
            <Heading as="h3" size="md" mb={2} color="gray.700">
              Personal Information
            </Heading>
            <Text fontSize="sm" color="gray.500">
              This information won't appear on your public profile.
            </Text>
          </Box>

          <FormControl>
            <Flex direction={{ base: "column", md: "row" }}>
              <FormLabel width={{ md: "30%" }} fontWeight="medium" pt={2}>
                Email
              </FormLabel>
              <Box flex={1}>
                <Input
                  placeholder="Email"
                  type="email"
                  size="md"
                  {...formik.getFieldProps("email")}
                />
              </Box>
            </Flex>
          </FormControl>

          <FormControl>
            <Flex direction={{ base: "column", md: "row" }}>
              <FormLabel width={{ md: "30%" }} fontWeight="medium" pt={2}>
                Phone
              </FormLabel>
              <Box flex={1}>
                <Input
                  placeholder="Phone number"
                  type="tel"
                  size="md"
                  {...formik.getFieldProps("mobile")}
                />
              </Box>
            </Flex>
          </FormControl>

          <FormControl>
            <Flex direction={{ base: "column", md: "row" }}>
              <FormLabel width={{ md: "30%" }} fontWeight="medium" pt={2}>
                Gender
              </FormLabel>
              <Box flex={1}>
                <Input
                  placeholder="Gender"
                  size="md"
                  {...formik.getFieldProps("gender")}
                />
              </Box>
            </Flex>
          </FormControl>

          <FormControl>
            <Flex>
              <Checkbox
                {...formik.getFieldProps("private")}
                colorScheme="blue"
                ml={{ md: "30%" }}
              >
                Private Account
              </Checkbox>
            </Flex>
          </FormControl>

          <Flex justifyContent="flex-end" mt={8}>
            <Button
              colorScheme="blue"
              type="submit"
              px={8}
              isLoading={user.isLoading}
              loadingText="Saving..."
            >
              Save Changes
            </Button>
          </Flex>
        </Stack>
      </form>

      <ChangeProfilePhotoModal
        handleProfileImageChange={handleProfileImageChange}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </Box>
  );
};

export default EditProfileForm;