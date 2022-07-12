import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	Center,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const POST_URL = "http://localhost:3001/api/student/user/verify";

export default function OTPVerify() {
	const navigate = useNavigate();
	const { setVerify, id } = useContext(AppContext);
	const [showPassword, setShowPassword] = useState(false);
	const [submitForm, setSubmitForm] = useState("");
	const [otp, setOtp] = useState({ _id: id, otp: "" });

	const handleVerify = (e) => {
		e.preventDefault();
		axios.post(POST_URL, otp).then((res) => {
			console.log(res);
			console.log(otp);
			setSubmitForm(res.data.OTPstatus);
			if (res.data.OTPstatus === "OTP verification success") {
				setVerify(true);
				navigate("/home");
			}
		});
	};

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Verify OTP
					</Heading>
					<Text color='red.400'>{submitForm}</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}>
					<Stack spacing={4}>
						<FormControl id='password' isRequired>
							<FormLabel>OTP</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "text"}
									onChange={(e) => setOtp({ ...otp, otp: e.target.value })}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Submitting'
								size='lg'
								bg={"blue.400"}
								color={"white"}
								type='submit'
								onClick={handleVerify}
								_hover={{
									bg: "blue.500",
								}}>
								Verify
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
