// Utility to load and parse blog posts

// Helper function to parse various date formats
function parseDate(dateString) {
  // Handle formats like "20th February, 2025" or "15th January, 2025"
  const cleaned = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
  const parsed = new Date(cleaned);

  // If parsing fails, return a very old date so it appears last
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

// Lazy load markdown files (not eager)
const blogFiles = import.meta.glob('/data/*.md', { as: 'raw' });

// Load only metadata (title, date, slug) for the blog list
export async function loadBlogMetadata() {
  const metadata = await Promise.all(
    Object.entries(blogFiles).map(async ([filepath, importFn]) => {
      const content = await importFn();
      const filename = filepath.split('/').pop().replace('.md', '');
      const lines = content.split('\n');

      // Parse title (first line, remove # and trim)
      const title = lines[0].replace(/^#\s*/, '').trim();

      // Parse date (second line)
      const date = lines[1].trim();

      return {
        slug: filename,
        title,
        date,
        dateObj: parseDate(date),
      };
    })
  );

  // Sort by date (newest first)
  return metadata.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
}

// Load full content for a specific blog post
export async function loadBlogPost(slug) {
  const filepath = `/data/${slug}.md`;
  const importFn = blogFiles[filepath];

  if (!importFn) {
    return null;
  }

  const content = await importFn();
  const lines = content.split('\n');

  // Parse title (first line, remove # and trim)
  const title = lines[0].replace(/^#\s*/, '').trim();

  // Parse date (second line)
  const date = lines[1].trim();

  return {
    slug,
    title,
    date,
    dateObj: parseDate(date),
    content,
  };
}

// Legacy function for backward compatibility (loads all posts with full content)
export async function loadBlogPosts() {
  const posts = await Promise.all(
    Object.entries(blogFiles).map(async ([filepath, importFn]) => {
      const content = await importFn();
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
    })
  );

  // Sort by date (newest first)
  return posts.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
}
