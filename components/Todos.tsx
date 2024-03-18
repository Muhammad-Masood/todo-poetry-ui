"use client";
import { deleteTodo, getTodos, updateTodo } from "@/lib/server";
import { Todo } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState<Todo>({
    id: "",
    title: "",
    status: false,
  });
  const router = useRouter();

  const handleUpdate = () => {};
  return (
    <div className="flex flex-col gap-3" onClick={() => setIsUpdating(true)}>
      {todos ? (
        todos.map((todo: Todo) => (
          <div
            key={todo.id}
            className="flex p-2 rounded-md border cursor-pointer justify-between m-3"
          >
            <p>{todo.title}</p>
            <div className="flex space-x-2 items-center">
              <Badge variant={"outline"}>
                {!todo.status ? "Pending" : "Done"}
              </Badge>
              <Trash
                className="w-4 h-4"
                onClick={() => setIsDeleteAlertOpen(true)}
              />
            </div>
            <AlertDialog
              open={isDeleteAlertOpen}
              onOpenChange={setIsDeleteAlertOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setIsDeleted(true);
                      const responseMessage = deleteTodo(todo.id);
                      console.log(responseMessage);
                      router.refresh();
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Dialog open={isUpdating} onOpenChange={setIsUpdating}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Todo</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                  <div className="space-y-2">
                    <Input
                      id="title"
                      defaultValue={todo.title}
                      onChange={(e) =>
                        setUpdatedTodo({
                          ...updatedTodo,
                          title: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                    <Badge
                      className="cursor-pointer"
                      onClick={() =>
                        setUpdatedTodo({
                          ...updatedTodo,
                          status: !updatedTodo.status,
                        })
                      }
                    >
                      {!updatedTodo.status ? "Pending" : "Done"}
                    </Badge>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={async () => {
                        updatedTodo.id = todo.id;
                        await updateTodo(updatedTodo);
                        router.refresh();
                      }}
                    >
                      Update
                    </Button>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <p className="pt-[1rem]">No Todos</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
