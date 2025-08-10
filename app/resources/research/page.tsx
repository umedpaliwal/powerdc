"use client";

import { Box, Container, Typography, Card, CardContent, Grid, Chip, Link, Button } from "@mui/material";
import { Science, ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function ResearchPage() {
  const router = useRouter();

  const researchPapers = [
    {
      title: "Unlocking the Power of Surplus Interconnection: Barriers, Opportunities, and Strategic Solutions",
      date: "February 21, 2025",
      authors: "Miles Farmer; Abe Silverman",
      type: "Technical Report",
      finding: "Identifies key barriers and proposes solutions for utilizing surplus interconnection service, urging standardized, flexible surplus service across regions to speed up adding new resources.",
      link: "https://surplusinterconnection.s3.us-east-1.amazonaws.com/2025-02-21_GridLab_Surplus_Interconnection_Barriers_Report.pdf"
    },
    {
      title: "Existing Fossil Fuel Plants Sharing Grid Access with Renewables Can Rapidly and Cost-Effectively Double U.S. Generation Capacity",
      date: "November 2024",
      authors: "Umed Paliwal; Emilia Chojkiewicz; Nikit Abhyankar; Amol Phadke",
      type: "UC Berkeley Study",
      finding: "Estimates ~800 GW of new solar/wind capacity could be added today – and ~1,000 GW by 2030 – by sharing unused interconnection capacity at existing fossil sites.",
      link: "https://gspp.berkeley.edu/assets/uploads/page/Surplus_Interconnection.pdf"
    },
    {
      title: "Clean Repowering: A Near-Term, IRA-Powered Energy Transition Accelerant",
      date: "January 16, 2024",
      authors: "Katie Siegner; Alex Engel",
      type: "RMI Analysis",
      finding: "Identifies ~250 GW of projects nationwide that could pursue clean repowering strategy, offering much faster timelines by reusing existing grid hookups.",
      link: "https://rmi.org/clean-repowering-a-near-term-ira-powered-energy-transition-accelerant/"
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
            Research & Studies
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: "rgba(255,255,255,0.9)", 
              maxWidth: "800px",
              lineHeight: 1.6
            }}
          >
            Leading academic and industry research demonstrating the massive potential 
            of surplus interconnection for accelerating renewable energy deployment.
          </Typography>
        </Box>

        {/* Research Papers */}
        <Grid container spacing={3}>
          {researchPapers.map((paper, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ 
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s",
                "&:hover": {
                  background: "rgba(255,255,255,0.08)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 40px rgba(0, 229, 255, 0.2)"
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "start", mb: 2 }}>
                    <Science sx={{ color: "#00E5FF", mr: 2, mt: 0.5, fontSize: 32 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" sx={{ color: "white", fontWeight: 600, mb: 2 }}>
                        <Link 
                          href={paper.link} 
                          target="_blank" 
                          rel="noopener"
                          sx={{ 
                            color: "#00E5FF", 
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" }
                          }}
                        >
                          {paper.title}
                        </Link>
                      </Typography>
                      
                      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                        <Chip 
                          label={paper.type} 
                          size="small" 
                          sx={{ 
                            backgroundColor: "rgba(118, 75, 162, 0.3)",
                            color: "white",
                            fontWeight: 600
                          }} 
                        />
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center" }}>
                          {paper.date}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
                        <strong style={{ color: "#00E5FF" }}>Authors:</strong> {paper.authors}
                      </Typography>
                      
                      <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 400, lineHeight: 1.7 }}>
                        {paper.finding}
                      </Typography>
                      
                      <Button
                        href={paper.link}
                        target="_blank"
                        rel="noopener"
                        variant="outlined"
                        sx={{
                          mt: 3,
                          borderColor: "#00E5FF",
                          color: "#00E5FF",
                          "&:hover": {
                            borderColor: "#00B8D4",
                            backgroundColor: "rgba(0, 229, 255, 0.1)"
                          }
                        }}
                      >
                        Read Full Study
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Additional Resources Section */}
        <Box sx={{ mt: 8, p: 5, borderRadius: 3, background: "rgba(0, 229, 255, 0.1)", border: "1px solid rgba(0, 229, 255, 0.3)" }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#00E5FF", mb: 3, textAlign: "center" }}>
            Want to Learn More?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.9)", textAlign: "center", mb: 4, fontSize: "1.1rem" }}>
            Our team can provide detailed analysis of how surplus interconnection applies to your specific data center deployment needs.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/demo")}
              sx={{
                backgroundColor: "#00E5FF",
                color: "#0a0a0a",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#00B8D4",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(0, 229, 255, 0.3)"
                }
              }}
            >
              Schedule a Demo
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}