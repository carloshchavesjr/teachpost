'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { Subject } from '../types/subjects';
import { PostsService } from '../services/post/post';
import { SubjectsService } from '../services/subject/subject';

export default function NewPostPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [formData, setFormData] = useState({
    subjectId: '',
    title: '',
    description: ''
  });

  useEffect(() => {
    if (session?.user.role !== 'teacher') {
      toast.error('Apenas professores podem criar posts');
      router.replace('/posts');
      return;
    }

    const loadSubjects = async () => {
      try {
        const subjectsData = await SubjectsService.fetchSubjects();
        // Filtra para remover a opção "Todos" caso exista
        const filteredSubjects = subjectsData.filter(subject => subject.name !== 'Todos');
        setSubjects(filteredSubjects);
      } catch (error) {
        console.error('Erro ao carregar matérias:', error);
        toast.error('Erro ao carregar matérias disponíveis');
      } finally {
        setIsLoadingSubjects(false);
      }
    };

    loadSubjects();
  }, [session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subjectId) {
      toast.error('Selecione uma matéria');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedSubject = subjects.find(s => s.id === Number(formData.subjectId));
      
      if (!selectedSubject) {
        throw new Error('Matéria selecionada não encontrada');
      }

      // Criando o objeto post conforme a interface Post
      const newPost = {
        title: formData.title,
        description: formData.description,
        subject: selectedSubject,
        subjectId: selectedSubject.id, 
        author: session?.user.name || 'Autor desconhecido',
        date: new Date().toISOString(),
        // Adicione outros campos necessários conforme sua interface Post
      };

      // Chamando o serviço de criação
      const createdPost = await PostsService.create(newPost);
      
      toast.success(`Post "${createdPost.title}" criado com sucesso!`);
      router.push('/posts');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao criar post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Criar Novo Post</h1>
        <p className="text-gray-600 mt-2">Compartilhe conhecimento com a comunidade acadêmica</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700">
            Matéria *
          </label>
          {isLoadingSubjects ? (
            <div className="animate-pulse h-10 bg-gray-200 rounded-md"></div>
          ) : (
            <select
              id="subjectId"
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
              disabled={isSubmitting}
            >
              <option value="">Selecione uma matéria</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Ex: Teorema Fundamental do Cálculo"
            required
            minLength={5}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Conteúdo *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[200px]"
            placeholder="Descreva o conteúdo do post com detalhes..."
            required
            minLength={10}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push('/posts')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSubmitting && <Loader2 className="animate-spin h-5 w-5" />}
            {isSubmitting ? 'Publicando...' : 'Publicar Post'}
          </button>
        </div>
      </form>
    </div>
  );
}