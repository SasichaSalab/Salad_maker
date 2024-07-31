import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Params {
    post: string;
}

// Generate metadata dynamically based on params
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const title = params.post.split('-').join(' ');
    return {
        title: `Blog Post: ${title}`,
        description: `Blog post about ${title}`,
    };
}

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
}
