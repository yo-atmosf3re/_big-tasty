import logo from './logo.svg';
import './App.css';
import './scss/app.scss'
import Header from './components/Header/Header'
import Content from './components/Content/Content';

function App() {
  return (
    <div>
      <div class="wrapper">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default App;
