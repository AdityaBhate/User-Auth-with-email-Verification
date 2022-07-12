import {
	Heading,
	Avatar,
	Box,
	Center,
	Text,
	Stack,
	Button,
	Badge,
	useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export default function Profile() {
	const navigate = useNavigate();
	const [userinfo, setUserInfo] = useState({});
	const { setAuth, setVerify, setId, id } = useContext(AppContext);
	const signOut = () => {
		setAuth(false);
		setVerify(false);
		setId("");
		navigate("/");
	};
	const GET_URL = `http://localhost:3001/api/student/user/login/${id}`;
	const getUser = () => {
		axios.get(GET_URL).then((res) => setUserInfo(res.data));
	};
	useEffect(() => {
		getUser();
	}, []);
	return (
		<Center py={6}>
			<Box
				maxW={"320px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"2xl"}
				rounded={"lg"}
				p={6}
				textAlign={"center"}>
				<Avatar
					size={"xl"}
					src={
						"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAACOCAMAAADQI8A6AAAAMFBMVEXk5ueutLfo6uu5vsGrsbTc3+C9wsXX2tvBxsjU19mxt7rKztDh4+TQ09XHy821u749Y1AiAAADHklEQVR4nO2a27KDMAhFlcTEaNT//9sTa+3l1BpAwT5kP3Q604eugZ0bUFVFRUVFRUVFRUVFRUVFRUWHBFcDrAKA2Hjv4/ztapbo28muMr2/MkzgXWdt/ZS1U9tcBARD94ryIHL+AiDw0wbMDah26hGC8QvMAjTo8jRbeXoFahVhIEeTeCY9HJ+DmdVFnYSBR8DM8YkqOA2KRitfsUPiJD/LpwtajHHuPOLrHQY8TeKRtg8QYBKOE6bZ24y3eLwoDnZVPWQk3UMNjnR4qDSi7qEtqzuP4OJyZJra9mLuiXQaSTOjTvIPSWWLcj68KEjhTBwa2wvhsKwjt9TJW/KiScjLuFvgp2RoqsCjsTI0nD254FyF81ve+TEr/9q+g39hvclJHeksHDsK0QDj9iX49mOu9EaGJnmZg9NJ0VQV48IjWDegP7NkH1qRjiNZ5AFDDo7cu6ZivCWsbIWHGB7Z4FRAXOvS5UraW8uKtycorxsrdno+REmXRiUXeiyPVWncYO1jg1LbBsUjX1ReBS7PoxabCuEf26l2INMjZw/ITsrtR9gxkK1lj4ZtIG/sFpGtnVJj7R8PBPcBZOvLGulzynrT1Y8pg3py4dppDIDoQ9861459aOL1UxhvupBj/ogh9GOKzawUnyE0C6IySkpRylC3emZx8WqgNqVNDQlSSNpu/vev+076pTODgpMAmtHskLxBTW2QBJpZcCjPMDkvtCcCDGb3oPoWo1FgK4I40llWorM36gMwN6DanVpV6Y/AnB2h/bsNmqg/w9RQmTNgZp7p+A2RW2rfBmqPvpERl3QKT3fEQYgZLzIQ/94K4WyY+sDMHP71S+Ph1RE4dUkcj/md2Nx46L1jQZo5PsR8ibj4hYfoZ2brCs9DW++8zhWFh1CMZ85+kITvnAgbZxFh+2FNopCFTJfY/vdP2JatDg2yeKjh40WosnMjvshXWcQY1qnXv4wQZwWoBQc14sjqBnNxxlx4RE/yD+VvPqxJArZy2Yo6O/Jd2YNU0zqIewZvrJSNkxlB0HVy9pYK/WQ0lb1lgK4yNEVFRUVFRb+qP9uTJh9dJFlVAAAAAElFTkSuQmCC"
					}
					alt={"Avatar Alt"}
					mb={4}
					pos={"relative"}
					_after={{
						content: '""',
						w: 4,
						h: 4,
						bg: "green.300",
						border: "2px solid white",
						rounded: "full",
						pos: "absolute",
						bottom: 0,
						right: 3,
					}}
				/>
				<Heading fontSize={"2xl"} fontFamily={"body"}>
					{userinfo.username}
				</Heading>
				<Text fontWeight={600} color={"gray.500"} mb={4}>
					{userinfo.email}
				</Text>
				<Text
					textAlign={"center"}
					color={useColorModeValue("gray.700", "gray.400")}
					px={3}>
					Actress, musician, songwriter and artist. PM for work inquires or me
					in your posts
				</Text>

				<Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue("green.200", "green.800")}
						fontWeight={"400"}>
						Email Verified
					</Badge>
				</Stack>

				<Stack mt={8} direction={"row"} spacing={4}>
					<Button
						flex={1}
						fontSize={"sm"}
						rounded={"full"}
						onClick={signOut}
						_focus={{
							bg: "gray.200",
						}}>
						Sign out
					</Button>
				</Stack>
			</Box>
		</Center>
	);
}
