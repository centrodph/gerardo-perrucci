import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Gerardo Perrucci",
  tagline: "Software Engineer",
  favicon: "img/2073951.jpeg",

  // Set the production url of your site here
  url: "https://centrodph.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/gerardo-perrucci/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "centrodph", // Usually your GitHub org/user name.
  projectName: "gerardo-perrucci", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    maxHeadingLevel: 5,
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
    },
    // Replace with your project's social card
    // image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "GP",
      logo: {
        alt: "Gerardo Perrucci Website",
        src: "img/2073951.jpeg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "About me",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/centrodph",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Work",
          items: [
            {
              label: "GitHub",
              href: "https://x.com/GerardoPerrucci",
            },
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/users/6620340/gerardo-perrucci",
            },
          ],
        },
        {
          title: "Life",
          items: [
            {
              label: "Instagram",
              href: "https://www.instagram.com/gerardoperrucci",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Twitter",
              href: "https://x.com/GerardoPerrucci",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.nightOwl,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
