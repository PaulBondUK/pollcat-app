import React, { Component } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  View,
  StyleSheet,
  AsyncStorage
} from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button
} from "native-base";
import firebase from "../Auth/Firebase";

export default class LoginHandler extends Component {
  state = {
    email: null,
    password: null,
    error: null,
    accountCreated: null
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
            justifyContent: "flex-start",
            marginTop: 100
          }}
        >
          <Form>
            <Item floatingLabel>
              <Label>Email Address</Label>
              <Input
                style={styles.input}
                onChangeText={text =>
                  this.setState({ email: text, error: null })
                }
                onFocus={() => {
                  this.setState({ error: null });
                }}
                value={this.state.email}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                style={styles.input}
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

            <Button
              style={styles.button}
              onPress={() => {
                const { email, password } = this.state;
                this.firebaseLoginHandler(email, password);
              }}
              block
              primary
            >
              <Text style={styles.buttonText}>Login</Text>
            </Button>
          </Form>

          {this.state.error && (
            <Text style={styles.error}>
              {errorHandler[this.state.error.code]
                ? errorHandler[this.state.error.code]
                : this.state.error.message}
            </Text>
          )}

          {this.state.accountCreated && (
            <Text>Account created. Please login to continue!</Text>
          )}
        </Content>
      </Container>
    );
  }

  firebaseLoginHandler(email, password) {
    if (!email || !password) {
      this.setState({
        error: { message: "Please enter a valid email address and password" }
      });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate("HomeScreen");
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  componentDidMount() {
    const { params } = this.props.route;
    if (params) {
      const email = JSON.parse(params);
      this.setState({ email, accountCreated: true });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    marginTop: 10,
    height: 50
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
    fontSize: 18,
    marginTop: 20,
    alignSelf: "center",
    flex: 1,
    alignContent: "center"
  }
});
