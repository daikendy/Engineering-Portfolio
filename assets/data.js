/**
 * Centralized Site Configuration & Data Store
 * Edit this file to update contacts, social links, resume links, and status across the entire portfolio.
 */
const SITE_DATA = {
  name: "Kenneth Torcuator",
  role: "Full-Stack Software Engineer",
  email: "torcuatorkenneth6@gmail.com",
  github: "https://github.com/daikendy",
  linkedin: "https://linkedin.com/in/kenneth-torcuator",
  twitter: "https://x.com/hawkmoth110",
  resumeUrl: "assets/resume.pdf",
  subpageResumeUrl: "../assets/resume.pdf",
  statusText: "currently building",
  location: "Metro Manila, Philippines",
  education: "BS Computer Engineering, NU",
  scholarship: "SM Foundation Scholar",
  posthogApiKey: "phc_usqGSFGbgjMBnWHuEdLno4eUkgYuYcJJ7hQqUvMDeKP2",
  posthogApiHost: "https://us.i.posthog.com"
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_DATA;
}
