import { useQuery } from '@tanstack/react-query';
import { getTodos } from "../services/todos.service";

interface Todo {
  id: string;
  title: string;
}

const Home: React.FC = () => {
  const { isLoading, isError, data, error } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
    retry: false
  });

  if (isLoading) {
    return <h1>Carganding...</h1>;
  }

  if (isError || error) {
    return <h1>¡cHiN! {error.message}</h1>;
  }

  console.log("data: ", data);
  
  return(
    <ol>
        {
            data?.map((element) => <li key={element.id}>{element.title}</li>)
        }
    </ol>
)
};

export default Home;
