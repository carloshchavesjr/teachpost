'use client';

import { useEffect, useState } from 'react';
import { FiSearch, FiChevronDown, FiPlus } from 'react-icons/fi';
import { Post } from '../types/post';
import { useAuthRedirect } from '@/hook/useAuthRedirect';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { PostCard } from '../components/postCard/postCard';
import { PostsService } from '../services/post/post';
import { SubjectsService } from '../services/subject/subject';
import { toast } from 'react-toastify';
import { Subject } from '../types/subjects';

export default function PostsList() {
  const { isAuthChecked } = useAuthRedirect();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('Todos');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, subjectsData] = await Promise.all([
          PostsService.getAll(),
          SubjectsService.fetchSubjects(), // Já deve incluir 'Todos'
        ]);
        setPosts(postsData);
        setSubjects(subjectsData); // Usa diretamente a lista do serviço
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast.error('Erro ao carregar posts ou matérias');
      }
    };
  
    fetchData();
  }, []);

  if (!isAuthChecked) return null;

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === 'Todos' || post.subject.name === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Posts Acadêmicos</h1>
          <p className="text-gray-600">Encontre os melhores materiais de estudo</p>
          {session?.user.role === 'teacher' && (
            <Link
              href="/newpost"
              className="flex w-36 items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mt-4"
            >
              <FiPlus />
              Novo Post
            </Link>
          )}
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Seletor de Matéria */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full md:w-48 bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm"
            >
              <span>{selectedSubject}</span>
              <FiChevronDown
                className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => {
                      setSelectedSubject(subject.name);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      selectedSubject === subject.name ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar posts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Lista de Posts */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} showDescription={false} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum post encontrado</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSubject('Todos');
                }}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
