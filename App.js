import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [pickedNumber, setPickedNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [round, setRound] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setPickedNumber(pickedNumber);
  }

  function gameOverHandler(number) {
    setGameIsOver(true);
    setRound(number);
  }

  function restartGameHandler() {
    setPickedNumber(null);
    setGameIsOver(false);
  }
  let screen = <StartGameScreen onPick={pickedNumberHandler} />;

  if (pickedNumber) {
    screen = (
      <GameScreen userNumber={pickedNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver) {
    screen = (
      <GameOverScreen
        pickedNumber={pickedNumber}
        onRestart={restartGameHandler}
        round ={round}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
