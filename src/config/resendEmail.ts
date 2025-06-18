import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/template/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailTemplateProps {
  name: string;
  url: string;
}

export const sendEmail = async (
  toEmail: string,
  subject: string,
  templateProps: EmailTemplateProps
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Coditor<onboarding@resend.dev>",
      to: [toEmail],
      subject: subject,
      react: await EmailTemplate(templateProps),
    });

    if (error) {
      throw new Error(error.message || "Failed to send email");
    }

    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    return null;
  }
};
