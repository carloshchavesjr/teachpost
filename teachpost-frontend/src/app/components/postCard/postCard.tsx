'use client';

import Link from 'next/link';
import { Post } from '../../types/post';

interface PostCardProps {
  post: Post;
  showDescription?: boolean;

}

export function PostCard({ post, showDescription = true }: PostCardProps) {
    return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full mb-2">
{post.subject?.name || 'Sem matéria'}
</span>
      <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-2">por {post.author}</p>
      {showDescription && <p className="text-gray-700 mb-4">{post.description}</p>}

      <div className="flex justify-between items-center">
        

      {!showDescription && (
              <Link
          href={`/post/${post.id}`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-4"
        >
          Ler post →
        </Link>
)}
      </div>
    </div>
  );
}
