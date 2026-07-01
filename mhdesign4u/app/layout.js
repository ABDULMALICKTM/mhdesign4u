import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";

export const metadata = {
  metadataBase: new URL("https://mhdesign4u.com"),
  title: {
    default: "mhdesign4u — Design & Development Studio, Bangalore",
    template: "%s · mhdesign4u",
  },
  description:
    "mhdesign4u is a Bangalore-based design and development studio, founded 2018. Website design & development, UI/UX architecture, graphic design, branding, and video/motion graphics for Banking, Healthcare, HR, E-Commerce, B2B, B2C and B2D teams.",
  keywords: [
    "mhdesign4u",
    "Bangalore design agency",
    "UI UX studio India",
    "website development agency",
    "branding studio Bangalore",
  ],
  openGraph: {
    title: "mhdesign4u — Design & Development Studio, Bangalore",
    description:
      "Website design & development, UI/UX architecture, graphic design, branding and motion — for Fintech, Healthcare, HR, E-Commerce, B2B, B2C and B2D.",
    url: "https://mhdesign4u.com",
    siteName: "mhdesign4u",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <div className="orb-field" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
