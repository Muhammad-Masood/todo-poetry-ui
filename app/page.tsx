import CreateBar from "@/components/CreateBar";
import TodoList from "@/components/Todos";
import { getTodos } from "@/lib/server";
import { Todo } from "@/lib/utils";

export default async function Home() {
  const todos: Todo[] = await getTodos();
  return (
    <>
      <div className="w-full sm:w-[70%] md:w-[35%] h-[500px] shadow-lg rounded-lg border ">
        <div className="flex p-4 w-full h-full flex-col justify-between items-center">
          <div className="w-full h-[85%] overflow-y-scroll overflow-x-hidden">
            <TodoList todos={todos} />
          </div>
          <div className="py-3">
            <CreateBar />
          </div>
        </div>
      </div>
    </>
  );
}
