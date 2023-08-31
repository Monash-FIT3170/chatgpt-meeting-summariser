import React, { Component } from "react";
import axios from "axios";

var config = require('../config.json');
const port = config.port || 5000;

export default class CreateMeetingSummary extends Component {
  constructor(props) {
    super(props);
    this.onChangeTranscript = this.onChangeTranscript.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      transcript: "",
    };
  }

  onChangeTranscript(e) {
    this.setState({
      transcript: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const newMeetingSummary = {
      transcript: this.state.transcript,
    };
    console.log(newMeetingSummary);

    axios
      .post(`http://localhost:${port}/meetingSummaries/add`, newMeetingSummary)
      .then((res) => console.log(res.data));

    this.setState({
      transcript: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Create New Meeting Summary</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Transcript: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.transcript}
              onChange={this.onChangeTranscript}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Meeting Summary"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
