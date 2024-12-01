
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Fintech Platform</h2>
      <p>Track your spending, analyze your budget, and much more.</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default Home;
