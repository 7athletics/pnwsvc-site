// Eleventy config for the PNW SVC site.
// Content lives in src/_data/*.json (editable in Pages CMS); templates in src/.
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // Deterministic evergreen tree-line silhouette as an SVG path.
  // seed: changes the ridge; base: baseline y (0-100); amp: tree height range.
  eleventyConfig.addShortcode("treeline", (seed = 1, base = 92, minH = 18, maxH = 46, step = 2.6) => {
    let s = seed * 9301 + 49297;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    let d = `M0,100 L0,${base}`;
    let x = 0;
    while (x < 1000) {
      const w = step * (4.5 + rnd() * 3.5);
      const h = minH + rnd() * (maxH - minH);
      const top = base - h;
      const cx = x + w / 2;
      // stepped fir: zig-zag edges that widen toward the ground
      const P = (dx, fy) => ` L${(cx + w * dx).toFixed(1)},${(base - h * fy).toFixed(1)}`;
      d += ` L${(cx - w * 0.06).toFixed(1)},${base}`;
      d += P(-0.06, 0.08) + P(-0.5, 0.1) + P(-0.2, 0.36) + P(-0.38, 0.34) + P(-0.13, 0.6) + P(-0.27, 0.58) + P(-0.06, 0.82) + P(-0.15, 0.8);
      d += ` L${cx.toFixed(1)},${top.toFixed(1)}`;
      d += P(0.15, 0.8) + P(0.06, 0.82) + P(0.27, 0.58) + P(0.13, 0.6) + P(0.38, 0.34) + P(0.2, 0.36) + P(0.5, 0.1) + P(0.06, 0.08);
      d += ` L${(cx + w * 0.06).toFixed(1)},${base}`;
      x += w * (0.45 + rnd() * 0.45);
    }
    d += ` L1000,${base} L1000,100 Z`;
    return d;
  });

  eleventyConfig.addFilter("footerSponsors", (tiers) =>
    tiers.flatMap((t) => t.sponsors).filter((s) => s.footer)
  );

  // PREVIEW=1 builds a copy with relative links so it opens by double-clicking index.html.
  if (process.env.PREVIEW) {
    eleventyConfig.addTransform("relative-links", function (content) {
      if (!(this.page.outputPath || "").endsWith(".html")) return content;
      const segs = this.page.url.split("/").filter(Boolean); const depth = segs.length - (this.page.url.endsWith(".html") ? 1 : 0);
      const up = depth ? "../".repeat(depth) : "./";
      return content.replace(/(href|src)="\/(?!\/)([^"#]*)(#[^"]*)?"/g, (m, attr, path, hash = "") => {
        let p = path;
        if (attr === "href" && (p === "" || p.endsWith("/"))) p += "index.html";
        return `${attr}="${up}${p}${hash}"`;
      }).replace(/url\('\/assets/g, `url('${up}assets`);
    });
  }

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
  };
}
