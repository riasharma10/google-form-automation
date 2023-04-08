import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ‘google - apps - script’;


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email_to_send_1: '',
            email_to_send_2: '',
            email_to_send_3: '',
            phone_to_send_1: '',
            phone_to_send_2: '',
            phone_to_send_3: '',
            google_form: '',
            spreadsheet: '',
            nameError: '',
            emailError: '',
            phoneError: '',
            namesList: [],
            emailsList: [],
            phoneList: []
        }

        this.validateEmail = this.validateEmail.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this.updateState = this.updateState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };



    validateEmail(input) {
        //language=JSRegexp
        //TODO: Fix this regex, doesn't actually take everything into account.
        var regexp = /^([a-zA-Z0-9]+)@(.+)(\.)(com|org|net|edu)/;
        return regexp.test(input);
    }

    validateName(input) {
        if (input.length >= 2) {
            return true;
        } return false;
    }

    validatePhone(input) {
        var regexp = /[0-9]{10}/;
        return regexp.test(input);
    }



    //TODO: Make sure class name and state name are the same.
    //updates the state by taking in an event, a validator function (i.e validateName, validatePhone), and an error name to update the state of.
    updateState(e, validatorFunction, errorName) {
        if (validatorFunction === true) {
            this.setState({ [e.target.classList[0]]: e.target.value });
            this.setState({ [errorName]: 'Valid' });
            document.getElementById(e.target.classList[0]).style.color = "green";
        }
        else if (e.target.value.length === 0) {
            this.setState({ [errorName]: 'Empty submission' });
            document.getElementById(e.target.classList[0]).style.color = "red";
        }
        else {
            this.setState({ [errorName]: 'Invalid form input' });
            document.getElementById(e.target.classList[0]).style.color = "red";
            //Test
        }
    }

    //create custom error method.

    //Maybe create a validator component that changes depending on the input?
    onSubmit(event) {
        event.preventDefault(); // Prevent default submission

        alert('Your registration was successfully submitted!');
        var name = document.getElementById("name").value;
        var email1 = document.getElementById("email1").value;
        var email2 = document.getElementById("email2").value;
        var email3 = document.getElementById("email3").value;
        var phone1 = document.getElementById("phone1").value;
        var phone2 = document.getElementById("phone2").value;
        var phone3 = document.getElementById("phone3").value;
        var googleform = document.getElementById("googleform").value;
        var spreadsheet = document.getElementById("spreadsheet").value;
        this.setState({
            name: name, email_to_send_1: email1, email_to_send_2: email2, email_to_send_3: email3,
            phone_to_send_1: phone1, phone_to_send_2: phone2, phone_to_send_3: phone3,
            google_form: googleform, spreadsheet: spreadsheet, namesList: [name],
            emailsList: [email1, email2, email3], phonesList: [phone1, phone2, phone3]
        });

        // parse spreadsheet link for the id
        const myArray = spreadsheet.split("/d/");
        const myArray2 = myArray[1].split("/edit");
        const spreadsheetId = myArray2[0];
        const numUsers = this.emailsList.length();
        const endingIndex = 1 + numUsers

        try {
            const response = Sheets.Spreadsheets.Values.get(spreadsheetId, 'Sheet1!A2:A' + endingIndex);
            if (response.values) {
                console.log(response.values);
                return;
            }
        } catch (e) {
            console.log('Failed to get range of values from spreadsheet');
        }


    }

    render() {

        return (
            <div className="App">
                <div className="App-header">

                    <h2>Welcome to Google Form Automater</h2>
                </div>
                <form onSubmit={this.onSubmit}>
                    Name:
                    <input className="name" type="text" id="name"
                        onChange={(event) => this.updateState(event, this.validateName(event.target.value), "nameError")} />
                    <p id="name">  {this.state.nameError} </p> <br />
                    Email To Send To 1:
                    <input className="email" type="text" id="email1"
                        onChange={(event) => this.updateState(event, this.validateEmail(event.target.value), "emailError")} />
                    <p id="email">  {this.state.emailError} </p> <br />
                    Email To Send To 2:
                    <input className="email" type="text" id="email2"
                        onChange={(event) => this.updateState(event, this.validateEmail(event.target.value), "emailError")} />
                    <p id="email">  {this.state.emailError} </p> <br />
                    Email To Send To 3:
                    <input className="email" type="text" id="email3"
                        onChange={(event) => this.updateState(event, this.validateEmail(event.target.value), "emailError")} />
                    <p id="email">  {this.state.emailError} </p> <br />
                    Phone To Send to 1:
                    <input className="phone" /*{phoneClass}*/ type="text" id="phone1"
                        onChange={(event) => this.updateState(event, this.validatePhone(event.target.value), "phoneError")} />
                    <p id="phone">  {this.state.phoneError} </p> <br />
                    Phone To Send to 2:
                    <input className="phone" /*{phoneClass}*/ type="text" id="phone2"
                        onChange={(event) => this.updateState(event, this.validatePhone(event.target.value), "phoneError")} />
                    <p id="phone">  {this.state.phoneError} </p> <br />
                    Phone To Send to 3:
                    <input className="phone" /*{phoneClass}*/ type="text" id="phone3"
                        onChange={(event) => this.updateState(event, this.validatePhone(event.target.value), "phoneError")} />
                    <p id="phone">  {this.state.phoneError} </p> <br />
                    Link To Google Form:
                    <input className="phone" /*{phoneClass}*/ type="text" id="googleform"
                        onChange={(event) => this.updateState(event, this.validatePhone(event.target.value), "phoneError")} />
                    <p id="phone">  {this.state.phoneError} </p> <br />
                    Link To Spreadsheet of Responses:
                    <input className="phone" /*{phoneClass}*/ type="text" id="spreadsheet"
                        onChange={(event) => this.updateState(event, this.validatePhone(event.target.value), "phoneError")} />
                    <p id="phone">  {this.state.phoneError} </p> <br />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default App;
