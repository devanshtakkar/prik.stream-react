import {Box, Button, Typography, Grid, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import { Form } from "react-router-dom";

export default function AppIndex(){
    return(
        <Box>
        <Typography variant="h1">
          How do you want to begin the search?
        </Typography>
        <Typography variant="body1">With an easy-to-use interface, [App Name] allows you to quickly input your preferences and receive tailored suggestions. Discover movies you might have never found through conventional methods.</Typography>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid mt={3}>
            <Form method="GET" action="search" style={{minWidth: "300px"}}>
              <TextField
                id="input-with-icon-textfield"
                label="Start by searching a movie in mind"
                size="medium"
                variant="standard"
                name="movie"
                sx={{width: 250}}
              />
              <IconButton type="submit" size="large">
                <SearchIcon></SearchIcon>
              </IconButton>
            </Form>
          </Grid>
          <Grid>
            <Typography variant="h2">OR</Typography>
          </Grid>
          <Grid textAlign="center">
            <Typography variant="body2">Discover new favorites from scratch—no movie in mind required!</Typography>
            <Button size="large" variant="outlined">
              Begin From Scratch
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
}