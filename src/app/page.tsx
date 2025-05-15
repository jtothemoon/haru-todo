import TodoList from "@/components/todo/TodoList";

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold text-center">하루살이 TODO</h1>
      <TodoList />
    </main>
  );
}