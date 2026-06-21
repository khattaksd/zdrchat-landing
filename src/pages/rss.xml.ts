import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  const posts = await pagesGlobToRssItems(import.meta.glob('../content/blog/*.md'));

  return rss({
    title: 'ZDR Chat Blog',
    description: 'Articles about ZDR Chat, privacy-first AI chat, zero data retention, and bringing your own key.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      link: `/blog/${post.slug}/`,
      pubDate: post.pubDate,
    })),
    customData: '<language>en-us</language>',
    stylesheet: '/rss/styles.xsl',
  });
}