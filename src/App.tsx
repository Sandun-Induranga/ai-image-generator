import { ThemeProvider } from "@emotion/react";
import ImageGeneratorScreen from "./Screens/ImageGenerator/ImageGeneratorScreen";
import { theme } from "./config/theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ImageGeneratorScreen />
    </ThemeProvider>
  );
};

export default App;
