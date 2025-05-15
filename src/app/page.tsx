"use client";

import Link from "next/link";
import { useTodos } from "@/hooks/useTodos";
import Header from "@/components/layout/Header";
import TodoList from "@/components/todo/TodoList";

export default function Home() {
 const { remainingTime } = useTodos();

 return (
   <main className="container mx-auto">
     <Header 
       showTime={true}
       remainingTime={remainingTime}
       rightElement={
         <Link
           href="/settings"
           className="text-sm text-gray-500 hover:text-gray-700 underline"
         >
           설정
         </Link>
       }
     />
     <TodoList />
   </main>
 );
}