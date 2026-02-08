// Utility to load and parse blog posts

// Helper function to parse various date formats
function parseDate(dateString) {
  // Handle formats like "20th February, 2025" or "15th January, 2025"
  const cleaned = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
  const parsed = new Date(cleaned);

  // If parsing fails, return a very old date so it appears last
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

export async function loadBlogPosts() {
  // In Vite, we can use import.meta.glob to load all markdown files
  const blogFiles = import.meta.glob('/data/*.md', { as: 'raw', eager: true });

  const posts = Object.entries(blogFiles).map(([filepath, content]) => {
    const filename = filepath.split('/').pop().replace('.md', '');
    const lines = content.split('\n');

    // Parse title (first line, remove # and trim)
    const title = lines[0].replace(/^#\s*/, '').trim();

    // Parse date (second line)
    const date = lines[1].trim();

    // Get the rest as content
    const postContent = lines.slice(2).join('\n').trim();

    return {
      slug: filename,
      title,
      date,
      dateObj: parseDate(date),
      content,
      postContent
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
}
