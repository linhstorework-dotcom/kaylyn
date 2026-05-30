import { prisma } from "@/lib/prisma";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      publishedAt: {
        not: null,
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 20,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
  });

  const items = posts
    .map((post) => {
      const pubDate = new Date(post.publishedAt!).toUTCString();

      return `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${baseUrl}/bai-viet/${post.slug}</link>
        <guid>${baseUrl}/bai-viet/${post.slug}</guid>
        <description>${escapeXml(post.excerpt ?? "")}</description>
        <pubDate>${pubDate}</pubDate>
      </item>
    `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Kaylyn Spa Blog</title>
    <link>${baseUrl}/bai-viet</link>
    <description>Chăm sóc da chuyên sâu - Kaylyn Spa</description>
    <language>vi-vn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
