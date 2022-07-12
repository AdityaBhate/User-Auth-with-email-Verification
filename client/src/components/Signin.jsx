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
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const POST_URL = "http://localhost:3001/api/student/user";

export default function Signin() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [submitForm, setSubmitForm] = useState("");
	const { setAuth, setId } = useContext(AppContext);
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (user.username && user.email && user.password) {
			setSubmitForm("");
			axios.post(POST_URL, user).then((res) => {
				console.log(res.data._id);
				if (res.data.username === "" && res.data.email === "") {
					setAuth(false);
				} else {
					setAuth(true);
					setId(res.data._id);
					navigate("/verify");
				}
			});
		} else {
			setSubmitForm("Fill the form correctly");
		}
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
						Sign In
					</Heading>
					<Text color='red.400'>{submitForm}</Text>
				</Stack>
				<form>
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
									onChange={(e) =>
										setUser({ ...user, username: e.target.value })
									}
								/>
							</FormControl>
							<FormControl id='email' isRequired>
								<FormLabel>Email</FormLabel>
								<Input
									type='email'
									onChange={(e) => setUser({ ...user, email: e.target.value })}
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
									_hover={{
										bg: "blue.500",
									}}
									type='submit'
									onClick={handleSubmit}>
									Sign in
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={"center"}>
									Alreday a user?{" "}
									<Link color={"blue.400"} href='/login'>
										Log in
									</Link>
								</Text>
							</Stack>
						</Stack>
					</Box>
				</form>
			</Stack>
		</Flex>
	);
}
