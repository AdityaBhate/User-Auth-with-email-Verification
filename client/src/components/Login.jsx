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
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const POST_URL = "http://localhost:3001/api/student/user/login";

export default function Login() {
	const navigate = useNavigate();
	const { setAuth } = useContext(AppContext);
	const [showPassword, setShowPassword] = useState(false);
	const [submitForm, setSubmitForm] = useState("");
	const [user, setUser] = useState({ username: "", password: "" });

	const handleLogin = (e) => {
		e.preventDefault();
		axios.post(POST_URL, user).then((res) => {
			setSubmitForm(res.data.Auth);
			if (res.data.Auth === "success") {
				setAuth(true);
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
						Login
					</Heading>
					<Text color='red.400'>{submitForm}</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}>
					<Stack spacing={4}>
						<FormControl id='username' isRequired>
							<FormLabel>Username</FormLabel>
							<Input
								type='text'
								onChange={(e) => setUser({ ...user, username: e.target.value })}
							/>
						</FormControl>
						<FormControl id='password' isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
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
								onClick={handleLogin}
								_hover={{
									bg: "blue.500",
								}}>
								Login
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								New user?{" "}
								<Link color={"blue.400"} href='/'>
									Sign up
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
