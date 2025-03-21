import { useState } from "react";
import {
  Typography,
  Container,
  Card,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Box,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BrushIcon from "@mui/icons-material/Brush";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { config } from "dotenv";

const ImageGeneratorScreen = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [style, setStyle] = useState<any>("realistic");
  const [resolution, setResolution] = useState<number>(512);
  const [colorMode, setColorMode] = useState<string>("color");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `${prompt}, Style: ${style}, Color Mode: ${colorMode}`,
          }),
        }
      );

      if (!response.ok) throw new Error("Hugging Face API request failed");
      const imageBlob = await response.blob();
      setImageUrl(URL.createObjectURL(imageBlob));
    } catch (err: any) {
      setError(err.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "generated-image.png";
      link.click();
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Input Section */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label="Enter your prompt"
                  placeholder="e.g., A futuristic city at sunset"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                />
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Settings</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      {/* Style Dropdown */}
                      <div>
                        <Typography gutterBottom>Style</Typography>
                        <Select
                          value={style}
                          onChange={(e: any) => setStyle(e.target.value)}
                          fullWidth
                        >
                          <MenuItem value="realistic">Realistic</MenuItem>
                          <MenuItem value="cartoon">Cartoon</MenuItem>
                          <MenuItem value="abstract">Abstract</MenuItem>
                        </Select>
                      </div>
                      {/* Resolution Slider */}
                      <div>
                        <Typography gutterBottom>Resolution</Typography>
                        <Slider
                          value={resolution}
                          onChange={(_, val) => setResolution(val as number)}
                          min={256}
                          max={1024}
                          step={256}
                          marks
                          valueLabelDisplay="auto"
                        />
                      </div>
                      {/* Color Mode Toggle */}
                      <div>
                        <Typography gutterBottom>Color Mode</Typography>
                        <ToggleButtonGroup
                          value={colorMode}
                          exclusive
                          onChange={(_, val: string) =>
                            val && setColorMode(val)
                          }
                        >
                          <ToggleButton value="color">Color</ToggleButton>
                          <ToggleButton value="grayscale">
                            Grayscale
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<BrushIcon />}
                  onClick={handleGenerate}
                  disabled={loading || !prompt}
                >
                  Generate Image
                </Button>
              </Stack>
            </Grid>

            {/* Output Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <CircularProgress />
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Generated"
                    style={{ maxWidth: "100%", borderRadius: 8 }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 300,
                      height: 300,
                      backgroundColor: "#e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Typography color="textSecondary">
                      Image will appear here
                    </Typography>
                  </Box>
                )}
                {imageUrl && !loading && (
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={handleRegenerate}
                    >
                      Try Again
                    </Button>
                  </Stack>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default ImageGeneratorScreen;
