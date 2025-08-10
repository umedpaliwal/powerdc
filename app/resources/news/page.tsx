"use client";

import { Box, Container, Typography, Card, CardContent, Grid, Link, Button } from "@mui/material";
import { Article, ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function NewsPage() {
  const router = useRouter();

  const newsStories = [
    {
      title: "500 GW of solar could interconnect at existing fossil-fired generators",
      source: "PV Magazine USA",
      date: "November 13, 2024",
      summary: "UC Berkeley study estimates 500 GW of solar PV could be added nationwide via surplus interconnection.",
      link: "https://pv-magazine-usa.com/2024/11/13/500-gw-of-solar-could-interconnect-at-existing-fossil-fired-generators/"
    },
    {
      title: "Leveraging surplus interconnection could unleash 800 GW of energy the US needs today",
      source: "Utility Dive",
      date: "February 21, 2025",
      summary: "GridLab and UC Berkeley report projects 800 GW nationwide potential from surplus interconnection service.",
      link: "https://www.utilitydive.com/news/surplus-interconnection-gridlab-berkeley-report/740262/"
    },
    {
      title: "FERC approves PJM's plan to accelerate power plant connections",
      source: "E&E News",
      date: "February 12, 2025",
      summary: "FERC green-lights PJM's surplus interconnection revisions, enabling faster connections for new resources.",
      link: "https://www.eenews.net/articles/ferc-approves-pjms-plan-to-accelerate-power-plant-connections/"
    },
    {
      title: "California could nearly double generation capacity using surplus interconnection",
      source: "Utility Dive",
      date: "May 29, 2025",
      summary: "Study shows California could add 16 GW via surplus interconnection at retiring thermal plants.",
      link: "https://www.utilitydive.com/news/california-could-nearly-double-generation-capacity-using-surplus-interconnection-berkeley/749236/"
    }
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)" }}>
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push("/resources")}
            sx={{
              color: "#00E5FF",
              mb: 3,
              "&:hover": {
                backgroundColor: "rgba(0, 229, 255, 0.1)"
              }
            }}
          >
            Back to Resources
          </Button>
          
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: "#00E5FF", 
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            News Coverage
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: "rgba(255,255,255,0.9)", 
              maxWidth: "800px",
              lineHeight: 1.6
            }}
          >
            Recent media coverage highlighting the transformative potential of 
            surplus interconnection for renewable energy and data center deployment.
          </Typography>
        </Box>

        {/* News Stories */}
        <Grid container spacing={3}>
          {newsStories.map((story, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                height: "100%",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 40px rgba(0, 229, 255, 0.2)",
                  background: "rgba(255,255,255,0.08)"
                }
              }}>
                <CardContent sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", alignItems: "start", mb: 2 }}>
                    <Article sx={{ color: "#764ba2", mr: 2, mt: 0.5, fontSize: 28 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        <Link 
                          href={story.link} 
                          target="_blank" 
                          rel="noopener"
                          sx={{ 
                            color: "white", 
                            textDecoration: "none",
                            fontWeight: 600,
                            lineHeight: 1.4,
                            "&:hover": { 
                              color: "#00E5FF",
                              textDecoration: "underline" 
                            }
                          }}
                        >
                          {story.title}
                        </Link>
                      </Typography>
                      
                      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                        <Typography variant="body2" sx={{ color: "#00E5FF", fontWeight: 600 }}>
                          {story.source}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                          • {story.date}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.6, flex: 1 }}>
                        {story.summary}
                      </Typography>
                      
                      <Button
                        href={story.link}
                        target="_blank"
                        rel="noopener"
                        variant="text"
                        sx={{
                          mt: 3,
                          color: "#00E5FF",
                          justifyContent: "flex-start",
                          p: 0,
                          "&:hover": {
                            backgroundColor: "transparent",
                            textDecoration: "underline"
                          }
                        }}
                      >
                        Read Full Article →
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Stay Updated Section */}
        <Box sx={{ mt: 8, p: 5, borderRadius: 3, background: "rgba(118, 75, 162, 0.1)", border: "1px solid rgba(118, 75, 162, 0.3)" }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#764ba2", mb: 3, textAlign: "center" }}>
            Stay Updated
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.9)", textAlign: "center", mb: 4, fontSize: "1.1rem" }}>
            Get the latest insights on surplus interconnection and data center deployment opportunities.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/demo")}
              sx={{
                backgroundColor: "#764ba2",
                color: "white",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#5e3a80",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(118, 75, 162, 0.3)"
                }
              }}
            >
              Request Demo
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="mailto:contact@wattcanvas.com"
              sx={{
                borderColor: "#764ba2",
                color: "#764ba2",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#5e3a80",
                  backgroundColor: "rgba(118, 75, 162, 0.1)"
                }
              }}
            >
              Contact Media Team
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}