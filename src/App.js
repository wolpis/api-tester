import logo from './logo.svg';
import './App.css';
import { Suspense, lazy } from 'react';

function App() {
  const HomePage = lazy( () => import("./pages/home") )
  return (
    <Suspense>
      <HomePage/>
    </Suspense>
  );
}

export default App;
