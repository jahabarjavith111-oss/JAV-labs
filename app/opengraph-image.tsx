import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#102A43",
          padding: "0 90px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 74,
              height: 54,
              borderRadius: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#05080d",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            JAV
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 26, color: "#F8FAFC", fontWeight: 600 }}>
              JAV Digital Engineering Studio
            </div>
            <div style={{ fontSize: 18, color: "#7C879A" }}>
              Abdul Javid J. · Websites, AI &amp; SaaS
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 48,
          }}
        >
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: "#F8FAFC",
              lineHeight: 1.1,
              maxWidth: 960,
            }}
          >
            Websites, Web Apps &amp; AI Products
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: "#00C2FD",
              lineHeight: 1.1,
              maxWidth: 960,
              marginTop: 8,
            }}
          >
            That Help Businesses Grow.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 24,
            color: "#A8B3C7",
          }}
        >
          Business Websites · Full-Stack Applications · AI Solutions · SaaS MVPs
        </div>

        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: 9999,
            backgroundColor: "#00A8F5",
            opacity: 0.2,
            filter: "blur(60px)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
