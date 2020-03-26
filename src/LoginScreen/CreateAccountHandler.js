import React, { Component } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Platform
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon
} from "native-base";
import firebase from "../Auth/Firebase";

export default class CreateAccountHandler extends Component {
  state = {
    email: null,
    displayName: null,
    password: null,
    repeatPassword: null,
    error: null,
    passwordCheck: true
  };

  render() {
    const errorHandler = {
      "auth/user-not-found": "User not found",
      "auth/invalid-email": "Invalid email address",
      "auth/wrong-password": "Wrong password",
      "auth/user-disabled": "Account disabled"
    };
    return (
      <Container>
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 300
          }}
        >
          <Form>
            <Item floatingLabel>
              <Label> Email Address </Label>
              <Input
                style={styles.input}
                title="email"
                placeholder="Email Address"
                onChangeText={text =>
                  this.setState({ email: text, error: null })
                }
                onFocus={() => {
                  this.setState({ error: null });
                }}
                value={this.state.email}
                keyboardType="email-address"
                returnKeyType="next"
                textContentType="emailAddress"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label> Password (at least 8 characters)</Label>
              <Input
                style={styles.input}
                title="password"
                placeholder="Password"
                onChangeText={text =>
                  this.setState({ password: text, error: null })
                }
                onFocus={() => {
                  this.setState({ error: null });
                }}
                value={this.state.password}
                secureTextEntry={true}
                textContentType="password"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label>Repeat Password</Label>
              <Input
                style={styles.input}
                title="repeat password"
                placeholder="repeat password"
                onChangeText={text =>
                  this.setState({ repeatPassword: text, error: null })
                }
                onFocus={() => {
                  this.setState({ error: null });
                }}
                value={this.state.repeatPassword}
                secureTextEntry={true}
                textContentType="password"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
            <Button
              style={styles.button}
              onPress={() => {
                const { email, password, repeatPassword } = this.state;
                this.firebaseCreateAccountHandler(
                  email,
                  password,
                  repeatPassword
                );
              }}
              block
              primary
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Button>
          </Form>
          {this.state.error && (
            <Text style={styles.error}>
              {errorHandler[this.state.error.code]
                ? errorHandler[this.state.error.code]
                : this.state.error.message}
            </Text>
          )}
        </Content>
      </Container>
    );
  }

  async firebaseCreateAccountHandler(email, password, repeatPassword) {
    if (password !== repeatPassword) {
      this.setState({
        error: { message: "Passwords do not match" }
      });
    } else if (!email || !password) {
      this.setState({
        error: { message: "Please complete all fields" }
      });
    } else if (password.length < 8) {
      this.setState({
        error: { message: "Password should be 8 characters or more" }
      });
    } else {
      const newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
          this.setState({ error });
        });

      if (await newUser) {
        this.props.navigation.navigate("CreateDisplayName");
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    marginTop: 10
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    backgroundColor: "#6347ff"
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold"
  },
  error: {
    color: "red",
    fontSize: 20,
    marginTop: 20,
    flex: 1
  }
});
