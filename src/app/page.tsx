// src/pages/index.tsx
import Quiz from '../app/components/Quiz'

const Home: React.FC = () => {
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Quiz />
    </div>
  );
};

export default Home;
