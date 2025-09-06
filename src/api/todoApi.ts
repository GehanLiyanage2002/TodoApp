import axios from "axios";
import type { Todo } from "../types/Todo";

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || "/api";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await axios.get(`${API_URL}/`);
  return res.data;
};

export const addTodo = async (text: string): Promise<Todo> => {
  const res = await axios.post(`${API_URL}/`, { text });
  return res.data;
};

export const updateTodo = async (
  id: number,
  data: Partial<{ text: string; completed: boolean }>
) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
