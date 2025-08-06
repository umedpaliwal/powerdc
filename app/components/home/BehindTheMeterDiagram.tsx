"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function BehindTheMeterDiagram() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        style={{ maxWidth: "400px", maxHeight: "300px" }}
      >
        {/* Grid Connection */}
        <g>
          <rect
            x="20"
            y="80"
            width="80"
            height="40"
            rx="5"
            fill="rgba(255,255,255,0.1)"
            stroke="#4fc3f7"
            strokeWidth="2"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease" }}
          />
          <text
            x="60"
            y="105"
            textAnchor="middle"
            fill="#4fc3f7"
            fontSize="12"
            fontWeight="600"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.2s" }}
          >
            GRID
          </text>
        </g>

        {/* Gas Plant */}
        <g>
          <rect
            x="150"
            y="70"
            width="100"
            height="60"
            rx="8"
            fill="rgba(255,152,0,0.2)"
            stroke="#FF9800"
            strokeWidth="2"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.3s" }}
          />
          <text
            x="200"
            y="95"
            textAnchor="middle"
            fill="#FF9800"
            fontSize="11"
            fontWeight="600"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.5s" }}
          >
            GAS PLANT
          </text>
          <text
            x="200"
            y="110"
            textAnchor="middle"
            fill="rgba(255,152,0,0.8)"
            fontSize="9"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.5s" }}
          >
            5% Backup
          </text>
        </g>

        {/* Behind-the-Meter Box */}
        <g>
          <rect
            x="280"
            y="40"
            width="100"
            height="140"
            rx="8"
            fill="rgba(58,134,255,0.1)"
            stroke="#3a86ff"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.6s" }}
          />
          <text
            x="330"
            y="55"
            textAnchor="middle"
            fill="#3a86ff"
            fontSize="9"
            fontWeight="600"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.8s" }}
          >
            BEHIND-THE-METER
          </text>
        </g>

        {/* Data Center */}
        <g>
          <rect
            x="290"
            y="130"
            width="80"
            height="40"
            rx="5"
            fill="rgba(76,175,80,0.2)"
            stroke="#4caf50"
            strokeWidth="2"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.7s" }}
          />
          <text
            x="330"
            y="148"
            textAnchor="middle"
            fill="#4caf50"
            fontSize="10"
            fontWeight="600"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.9s" }}
          >
            DATA CENTER
          </text>
          <text
            x="330"
            y="162"
            textAnchor="middle"
            fill="rgba(76,175,80,0.8)"
            fontSize="8"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.9s" }}
          >
            95% Clean
          </text>
        </g>

        {/* Solar Panels */}
        <g>
          <rect
            x="290"
            y="70"
            width="35"
            height="25"
            rx="3"
            fill="rgba(255,235,59,0.3)"
            stroke="#FFC107"
            strokeWidth="1.5"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.8s" }}
          />
          <rect
            x="292"
            y="72"
            width="6"
            height="6"
            fill="#FFC107"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 1s" }}
          />
          <rect
            x="300"
            y="72"
            width="6"
            height="6"
            fill="#FFC107"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 1.1s" }}
          />
          <rect
            x="308"
            y="72"
            width="6"
            height="6"
            fill="#FFC107"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 1.2s" }}
          />
          <rect
            x="316"
            y="72"
            width="6"
            height="6"
            fill="#FFC107"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 1.3s" }}
          />
          <text
            x="307"
            y="110"
            textAnchor="middle"
            fill="#FFC107"
            fontSize="9"
            fontWeight="600"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 1.1s" }}
          >
            SOLAR
          </text>
        </g>

        {/* Battery Storage */}
        <g>
          <rect
            x="335"
            y="70"
            width="35"
            height="25"
            rx="3"
            fill="rgba(76,175,80,0.3)"
            stroke="#4caf50"
            strokeWidth="1.5"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 0.8s" }}
          />
          <rect
            x="340"
            y="75"
            width="25"
            height="15"
            rx="2"
            fill="rgba(76,175,80,0.5)"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 1s" }}
          />
          <rect
            x="367"
            y="80"
            width="2"
            height="5"
            fill="#4caf50"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 1.1s" }}
          />
          <text
            x="352"
            y="110"
            textAnchor="middle"
            fill="#4caf50"
            fontSize="9"
            fontWeight="600"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 0.8s ease 1.1s" }}
          >
            BATTERY
          </text>
        </g>

        {/* Connection Lines */}
        {/* Grid to Gas Plant */}
        <line
          x1="100"
          y1="100"
          x2="150"
          y2="100"
          stroke="#4fc3f7"
          strokeWidth="3"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 0.4s" }}
        />

        {/* Gas Plant to Data Center */}
        <line
          x1="250"
          y1="100"
          x2="290"
          y2="150"
          stroke="#FF9800"
          strokeWidth="2"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 0.6s" }}
        />

        {/* Solar to Data Center */}
        <line
          x1="307"
          y1="95"
          x2="320"
          y2="130"
          stroke="#FFC107"
          strokeWidth="3"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 0.9s" }}
        />

        {/* Battery to Data Center */}
        <line
          x1="352"
          y1="95"
          x2="340"
          y2="130"
          stroke="#4caf50"
          strokeWidth="3"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 0.9s" }}
        />

        {/* Power Flow Animations */}
        {/* Solar Power Flow */}
        <circle
          cx="313"
          cy="112"
          r="3"
          fill="#FFC107"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 1.2s" }}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 7,18; 0,0"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Battery Power Flow */}
        <circle
          cx="346"
          cy="112"
          r="3"
          fill="#4caf50"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 1.3s" }}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; -6,18; 0,0"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Gas Backup Flow */}
        <circle
          cx="270"
          cy="125"
          r="2"
          fill="#FF9800"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 1.4s" }}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 20,25; 0,0"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.6;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Labels for percentages */}
        <text
          x="315"
          y="200"
          textAnchor="middle"
          fill="#00C853"
          fontSize="14"
          fontWeight="700"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 1.5s" }}
        >
          95% Clean Energy
        </text>
        <text
          x="260"
          y="220"
          textAnchor="middle"
          fill="#FF9800"
          fontSize="12"
          fontWeight="600"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 1.6s" }}
        >
          5% Gas Backup
        </text>

        {/* Arrow showing behind-the-meter concept */}
        <path
          d="M 275 45 L 285 45 L 280 40 M 285 45 L 280 50"
          stroke="#3a86ff"
          strokeWidth="2"
          fill="none"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 0.7s" }}
        />
      </svg>
    </Box>
  );
}