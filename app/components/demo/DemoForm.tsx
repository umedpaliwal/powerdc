"use client";

import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";

interface DemoFormData {
  fullName: string;
  company: string;
  email: string;
  role: string;
  timeline: string;
  projectDetails?: string;
}

interface DemoFormProps {
  onSubmit: (data: DemoFormData) => void;
}

export default function DemoForm({ onSubmit }: DemoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DemoFormData>({
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      role: "",
      timeline: "",
      projectDetails: "",
    },
  });

  const roles = [
    "Data Center Executive",
    "Renewable Developer",
    "Infrastructure Investor",
    "Utility/Grid Operator",
    "Consultant/Advisor",
    "Other",
  ];

  const timelines = [
    "Immediate (< 3 months)",
    "Near-term (3-6 months)",
    "Planning (6-12 months)",
    "Exploring options",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Full Name */}
        <Controller
          name="fullName"
          control={control}
          rules={{ required: "Full name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              variant="outlined"
              fullWidth
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 229, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00E5FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ff6b6b",
                },
              }}
            />
          )}
        />

        {/* Company */}
        <Controller
          name="company"
          control={control}
          rules={{ required: "Company name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Name"
              variant="outlined"
              fullWidth
              error={!!errors.company}
              helperText={errors.company?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 229, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00E5FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ff6b6b",
                },
              }}
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Work email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Work Email"
              type="email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 229, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00E5FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ff6b6b",
                },
              }}
            />
          )}
        />

        {/* Role */}
        <Controller
          name="role"
          control={control}
          rules={{ required: "Please select your role" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Your Role"
              variant="outlined"
              fullWidth
              error={!!errors.role}
              helperText={errors.role?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 229, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00E5FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ff6b6b",
                },
              }}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Timeline */}
        <Controller
          name="timeline"
          control={control}
          rules={{ required: "Please select your project timeline" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Project Timeline"
              variant="outlined"
              fullWidth
              error={!!errors.timeline}
              helperText={errors.timeline?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 229, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00E5FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ff6b6b",
                },
              }}
            >
              {timelines.map((timeline) => (
                <MenuItem key={timeline} value={timeline}>
                  {timeline}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Project Details (Optional) */}
        <Controller
          name="projectDetails"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Tell us about your project (Optional)"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              placeholder="Share any details about your data center or renewable project..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 229, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00E5FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              }}
            />
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          endIcon={<Send />}
          sx={{
            mt: 2,
            py: 1.5,
            backgroundColor: "#00E5FF",
            color: "#0a0a0a",
            fontWeight: 600,
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: "#00B8D4",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(0, 229, 255, 0.3)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Request Demo
        </Button>

        {/* Privacy Note */}
        <Typography
          variant="caption"
          sx={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.5)",
            mt: -1,
          }}
        >
          We'll never spam you. Your information is secure and confidential.
        </Typography>
      </Box>
    </form>
  );
}