import {
    LoaderFunction,
    LoaderFunctionArgs,
    useLoaderData,
    useNavigate,
} from "react-router-dom";
import { BASE_URL } from "../CONSTANTS";
import { ErrorResponse, UserDataRes } from "../Types";
import ErrorPage from "./ErrorPage";
import {
    Typography,
    Container,
    List,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export let savedMovieLoader: LoaderFunction = function (
    args: LoaderFunctionArgs
) {
    return fetch(`${BASE_URL}/user`);
};

function UserCard(props: { user: UserDataRes }) {
    let navigate = useNavigate();
    let user = props.user;
    return (
        <ListItemButton
            onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                navigate(`/saved/${user.id}`);
            }}
        >
            <ListItemAvatar>
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={user.name}
                secondary={`Email: ${user.email}`}
            ></ListItemText>
            <Typography>{`Saved Movies: ${user.savedMovies.length}`}</Typography>
        </ListItemButton>
    );
}
export default function Users() {
    let response = useLoaderData() as ErrorResponse | UserDataRes[] | null;
    if (response == null) {
        return <Typography variant="h2">No saved movies!</Typography>;
    }
    if ("err" in response) {
        return <ErrorPage></ErrorPage>;
    }
    return (
        <Container>
            <Typography variant="h2">Users</Typography>
            <List>
                {response.map((user) => (
                    <UserCard key={user.id} user={user}></UserCard>
                ))}
            </List>
        </Container>
    );
}
