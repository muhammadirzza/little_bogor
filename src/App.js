import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Community from './components/bogor';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/footer';
import Addata from './components/adddata';
import Header from './components/header';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/' exact component={Community} />
        <Route path='/input' exact component={Addata} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
