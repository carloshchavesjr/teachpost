import { Post } from "../../types/post";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/posts';


export const PostsService = {
    async getAll(): Promise<Post[]> {
      const { data } = await axios.get<Post[]>(API_BASE_URL);
      return data;
    },
  
    async create(post: Omit<Post, 'id'>): Promise<Post> {
      const { data } = await axios.post<Post>(API_BASE_URL, post);
      return data;
    },
  
    async update(id: number, post: Partial<Post>): Promise<Post> {
      const { data } = await axios.put<Post>(`${API_BASE_URL}/${id}`, post);
      return data;
    },
  
    async delete(id: number): Promise<void> {
      await axios.delete(`${API_BASE_URL}/${id}`);
    },
  
    async getById(id: number): Promise<Post> {
      const { data } = await axios.get<Post>(`${API_BASE_URL}/${id}`);
      return data;
    }
  };