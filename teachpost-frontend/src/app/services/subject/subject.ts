// Exemplo usando Axios
import { Subject } from '@/app/types/subjects';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/subjects';

export const SubjectsService = {
    async fetchSubjects(): Promise<Subject[]> {
      try {
        const response = await axios.get<Subject[]>(API_BASE_URL);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar as matérias:', error);
        throw new Error('Não foi possível carregar as matérias no momento.');
      }
    },
  };