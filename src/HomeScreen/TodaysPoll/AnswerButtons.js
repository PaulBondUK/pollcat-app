import React from "react";
import { StyleSheet, Alert } from "react-native";
import { CardItem, Body, H2, Button, Text } from "native-base";
import * as Api from "../../../Api";

export default AnswerButtons = ({
  answerData,
  index,
  userUid,
  question_id,
  townName,
  countyName,
  votedAnswer,
  addAnswerIndex,
  consoleLog
}) => {
  const { answer } = answerData;
  let disabledButton;
  if (typeof votedAnswer === "number") {
    disabledButton = true;
  } else {
    disabledButton = false;
  }

  return (
    <Button onPress={() => consoleLog()} style={styles.button} block>
      <Text style={styles.buttonText}>{answer}</Text>
    </Button>
  );
};

const submitVote = (
  index,
  question_id,
  userUid,
  townName,
  countyName,
  answer
) => {
  Api.postAnswer({
    question_id,
    userUid,
    answerIndex: index,
    townName,
    countyName
  })
    .then(({ data }) => {
      Alert.alert("💣 BOOM!", `Your vote for '${answer}' has been recorded`);
    })
    .catch(err => console.log(err));
};

const buttonStyles = StyleSheet.create({
  button: {
    marginTop: 5,
    marginBottom: 5,
    height: 50
  },
  buttonSelectedVote: {
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    borderColor: "green",
    borderWidth: 5
  },
  buttonNotSelectedVote: {
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    borderColor: "tomato",
    borderWidth: 5
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  input: {
    marginTop: 10,
    height: 50
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    height: 50
  },
  buttonSelectedVote: {
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    borderColor: "green",
    borderWidth: 5
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
