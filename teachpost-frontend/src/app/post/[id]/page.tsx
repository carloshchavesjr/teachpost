"use client";

import { PostCard } from '@/app/components/postCard/postCard';
import { PostsService } from '@/app/services/post/post';
import { Post } from '@/app/types/post';
import { useAuthRedirect } from '@/hook/useAuthRedirect';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiSave, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function PostDetailPage() {
  const { isAuthChecked, session } = useAuthRedirect();
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await PostsService.getById(Number(id));
        setPost(postData);
        setEditedPost({
          title: postData.title,
          description: postData.description,
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Erro ao carregar post');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!isAuthChecked || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p>Post não encontrado.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Voltar
        </button>
      </div>
    );
  }

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await PostsService.delete(post.id);
        toast.success('Post excluído com sucesso!');
        router.push('/posts');
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Erro ao excluir post');
      }
    }
  };

  const handleSave = async () => {
    try {
      const updatedPost = await PostsService.update(post.id, {
        title: editedPost.title,
        description: editedPost.description,
      });
      setPost(updatedPost);
      setIsEditing(false);
      toast.success('Post atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Erro ao atualizar post');
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-start mb-6">
        {!isEditing && (
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <FiArrowLeft /> Voltar
          </button>
        )}
        
        {session?.user.role === 'teacher' && (
          <div className="flex gap-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700"
              >
                <FiSave /> Salvar
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-700"
              >
                <FiEdit /> Editar
              </button>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-6">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-bold text-2xl text-gray-700">Título:</label>
              <input
                type="text"
                name="title"
                value={editedPost.title}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-2xl text-gray-700">Descrição:</label>
              <textarea
                name="description"
                rows={6}
                value={editedPost.description}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ) : (
        <PostCard post={post} showDescription={true} />
      )}

<div className="mt-8 flex justify-between">
  {isEditing && (
    <button
      onClick={() => setIsEditing(false)}
      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
    >
      <FiArrowLeft /> Cancelar
    </button>
  )}

  {session?.user.role === 'teacher' && (
    <div className="flex gap-3">
      <button
        onClick={() => window.location.reload()}
        disabled={!isEditing}
        className={`flex items-center gap-1 px-3 py-1 rounded ${
          !isEditing 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        <FiRefreshCw /> Atualizar
      </button>

      {/* Botão Excluir - Sempre ativo */}
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-700"
      >
        <FiTrash2 /> Excluir Post
      </button>
    </div>
  )}
</div>
    </div>
  );
}