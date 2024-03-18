"use server";

import axios from "axios";
import { Todo } from "./utils";

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteTodo = async (id: string): Promise<String> => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/${id}`
    );
    return res.data.message;
  } catch (error) {
    console.log(error);
    return String(error);
  }
};

export const updateTodo = async (updatedTodo: Todo): Promise<String> => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/${updatedTodo.id}`,
      updatedTodo
    );
    return res.data.message;
  } catch (error) {
    console.log(error);
    return String(error);
  }
};
