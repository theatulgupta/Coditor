import React from "react";

interface EmailTemplateProps {
  name: string;
  url: string;
}

const EmailWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    {"<!DOCTYPE html>"}
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@400;500;600;700&display=swap');
          body {
            margin: 0;
            padding: 0;
            font-family: 'Alumni Sans', sans-serif;
            background-color: #f9f9f9;
            color: #333;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  </>
);

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  url,
}) => (
  <EmailWrapper>
    <div
      style={{
        backgroundColor: "#e6f9f4",
        padding: "40px",
        borderRadius: "14px",
        maxWidth: "480px",
        margin: "auto",
        color: "#1a1a1a",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        border: "1px solid #c0e8d6",
        fontFamily: "'Alumni Sans', sans-serif",
      }}
    >
      <h1
        style={{
          color: "#117a56",
          fontWeight: "700",
          fontSize: "1.9rem",
          marginBottom: "1rem",
          fontFamily: "'Alumni Sans', sans-serif",
        }}
      >
        Hello, {name}!
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          marginBottom: "1.2rem",
          color: "#2a2a2a",
          fontFamily: "'Alumni Sans', sans-serif",
        }}
      >
        We received a request to reset your password.
      </p>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          marginBottom: "1.8rem",
          color: "#2a2a2a",
          fontFamily: "'Alumni Sans', sans-serif",
        }}
      >
        Click the button below to reset your password:
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "14px 28px",
          backgroundColor: "#3bd59a",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "600",
          fontSize: "1rem",
          boxShadow: "0 4px 12px rgba(59, 213, 154, 0.5)",
          transition: "background-color 0.3s ease",
          fontFamily: "'Alumni Sans', sans-serif",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#32bc8a")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#3bd59a")
        }
      >
        Reset Password
      </a>
      <p
        style={{
          marginTop: "2.5rem",
          fontSize: "0.9rem",
          color: "#555",
          fontFamily: "'Alumni Sans', sans-serif",
        }}
      >
        If you did not request this, please ignore this email.
      </p>
    </div>
  </EmailWrapper>
);
