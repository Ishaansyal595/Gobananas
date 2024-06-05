import React, { Component } from "react";
import { TextField, Container, Typography, Grid } from "@mui/material";
import "./App.css";

export default class App extends Component {
  state = {
    data: [],
    filteredData: [], // State to store filtered data
    searchQuery: "", // State to store search query
  };

  async componentDidMount() {
    let url = "https://jsonplaceholder.typicode.com/posts";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ data: parsedData, filteredData: parsedData });
  }

  handleSearchChange = (event) => {
    const { data } = this.state;
    const searchQuery = event.target.value.toLowerCase();

    // Filter data based on search query
    const filteredData = data.filter(
      (item) =>
        item.userId.toString().includes(searchQuery) ||
        item.id.toString().includes(searchQuery) ||
        item.title.toLowerCase().includes(searchQuery) ||
        item.body.toLowerCase().includes(searchQuery)
    );

    this.setState({ searchQuery, filteredData });
  };

  render() {
    const { filteredData, searchQuery } = this.state;

    return (
      <Container>
        <Typography variant="h2">
          React App to display and fetch the items from URL
        </Typography>
        {/* Search bar */}
        <TextField
          className="textfield"
          label="Search..."
          variant="outlined"
          value={searchQuery}
          onChange={this.handleSearchChange}
          fullWidth
          sx={{ marginBottom: 4 }}
        />

        <Grid container spacing={2}>
          {filteredData.map((element) => (
            <Grid item xs={12} key={element.userId}>
              <Grid container spacing={2} className="grid-container">
                <Grid item xs={3}>
                  <Typography variant="body1" className="value">
                    UserId:
                  </Typography>
                  <Typography variant="body1">{element.userId}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" className="value">
                    Id:
                  </Typography>
                  <Typography variant="body1">{element.id}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" className="value">
                    Title:
                  </Typography>
                  <Typography variant="body1">{element.title}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" className="value">
                    Body:
                  </Typography>
                  <Typography variant="body1">{element.body}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}
