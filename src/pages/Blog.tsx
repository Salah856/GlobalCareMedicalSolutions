// src/pages/Blog.tsx
export function Blog() {
  const blogPosts = [
    {
      title: "Understanding Medical Billing Codes",
      excerpt: "Learn about the different medical billing codes and how they impact your practice.",
      date: "2024-01-15"
    },
    {
      title: "Maximizing Revenue Cycle Management",
      excerpt: "Tips and strategies to optimize your revenue cycle management process.",
      date: "2024-01-10"
    },
    {
      title: "The Future of Telehealth Billing",
      excerpt: "How telehealth is changing the landscape of medical billing.",
      date: "2024-01-05"
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Latest insights and updates from the world of medical billing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden">
              <div className="p-6">
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </time>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-2 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
                <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
};

