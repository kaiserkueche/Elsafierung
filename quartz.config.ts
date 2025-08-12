import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Elsäfierung",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "fr-FR",
    baseUrl: "elsafierung.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
          header: {
			name: "Vollkorn",
			weights: [700, 900],
          },
        body: "Vollkorn",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#eff1f5",							// page background
          lightgray: "#1e66f5",						// borders, graph lines (blue)
          gray: "#d20f39",							// graph dots, heavier borders (e.g. table) (red)
          darkgray: "#4c4f69",						// body text
          dark: "#8839ef",							// header, graph node title (mauve)
          secondary: "#40a02b",						// links, folder, main title, active node (green)
          tertiary: "#fe640b",						// hover states, active file in folder view (orange/peach)
          highlight: "rgba(234, 118, 203, 0.15)",	// internal link background (pink)
          textHighlight: "#df8e1d88",				// markdown highlighted text (yellow)
        },
        darkMode: {
          light: "#24273a",
          lightgray: "#",
          gray: "#",
          darkgray: "#cad3f5",
          dark: "#",
          secondary: "#",
          tertiary: "#",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
