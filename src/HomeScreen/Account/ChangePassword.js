import React, { Component } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Platform,
  Alert
} from "react-native";
import {
  Header,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon
} from "native-base";
import * as firebase from "firebase";

export default class ChangePassword extends Component {
  state = {
    password: null,
    newPassword: null,
    repeatNewPassword: null,
    error: null,
    passwordCheck: true
  };

  render() {
    const { navigation } = this.props;
    const { password, newPassword, repeatNewPassword } = this.state;
    const errorHandler = {
      "auth/user-not-found": "User not found",
      "auth/invalid-email": "Invalid email address",
      "auth/wrong-password": "Wrong password",
      "auth/user-disabled": "Account disabled"
    };
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label> Current Password </Label>
              <Input
                style={styles.input}
                title="Password"
                placeholder="Current Password"
                onChangeText={text =>
                  this.setState({
                    password: text,
                    error: null
                  })
                }
                onFocus={() => {
                  this.setState({ error: null });
                }}
                value={password}
                secureTextEntry={true}
                textContentType="password"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label> New Password (at least 8 characters) </Label>
              <Input
                style={styles.input}
                title="password"
                placeholder="New Password"
                onChangeText={text =>
                  this.setState({
                    newPassword: text,
                    error: null
                  })
                }
                onFocus={() => {
                  this.setState({ error: null });
                }}
                value={newPassword}
                secureTextEntry={true}
                textContentType="newPassword"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label> Repeat New Password </Label>
              <Input
                style={styles.input}
                title="repeatNewPassword"
                placeholder="Repeat New Password"
                onChangeText={text =>
                  this.setState({
                    repeatNewPassword: text,
                    error: null
                  })
                }
                onFocus={() => {
                  this.setState({ error: null });
                }}
                value={repeatNewPassword}
                secureTextEntry={true}
                textContentType="newPassword"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
            <Button
              style={styles.button}
              onPress={() => {
                this.onChangePasswordPress(
                  password,
                  newPassword,
                  repeatNewPassword
                );
              }}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  reauthenticate = password => {
    var user = firebase.auth().currentUser;

    var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
  };

  onChangePasswordPress(password, newPassword, repeatNewPassword) {
    if (!password || !newPassword || !repeatNewPassword) {
      alert("Please enter password and new password");
    } else {
      if (newPassword !== repeatNewPassword) {
        alert("Passwords do not match. Please try again");
      } else {
        this.reauthenticate(password)
          .then(() => {
            let currentUser = firebase.auth().currentUser;

            currentUser.updatePassword(newPassword);
          })
          .then(() => {
            alert("Password changed successfully!");
          })
          .then(() => {
            this.props.navigation.navigate("Account");
          })
          .catch(error => {
            this.setState({ error });
          });
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
    justifyContent: "center",
    flex: 1,
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
    alignContent: "center",
    flex: 1
  }
});
