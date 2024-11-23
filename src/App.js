import React, {useEffect} from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import {Home} from './pages/Home/Home.jsx';
import {Login} from './pages/Login/Login.jsx';
import {Register} from './pages/Register/Register.jsx';
import {Header} from './components/Header/Header.jsx';
import TenderPlatform from './pages/TenderPlatform/TenderPlatform.jsx';
import ContestRequirements from './pages/ContestRequirements/ContestRequirements.jsx';
import ArchiveBidding from './pages/ArchiveBidding/ArchiveBidding.jsx';
import CurrentBiddnig from './pages/CurrentBiddnig/CurrentBiddnig.jsx';
import ScheduleBidding from './pages/ScheduleBidding/ScheduleBidding.jsx'
import LaunchTrading from './pages/LaunchTrading/LaunchTrading.jsx';
import { useDispatch } from 'react-redux';
import { fetchAuth } from './redux/slice/userSlice.js';
import {FullBidding} from './components/FullBidding/FullBidding.jsx';
import BiddingInfoConnection from './components/modal/BiddingInfoConnection.jsx';
import EndBidding from './components/EndBidding/EndBidding.jsx';
import { DetailsModal } from './components/modal/DetailsModel.jsx';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuth())
  }, [])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/tender-platform" element={<TenderPlatform/>}/>
        <Route path="/contest-requirements" element={<ContestRequirements/>}/>
        <Route path="/launch-trading" element={<LaunchTrading/>}/>
        <Route path="/scheduled-trading" element={<ScheduleBidding/>}/>
        <Route path="/current-trading" element={<CurrentBiddnig/>}/>
        <Route path="/biddings/:id" element={<FullBidding />} />
        <Route path="/archive-bidding" element={<ArchiveBidding/>}/>
        <Route path="/biddings/info/:id" element={<BiddingInfoConnection/>} />
        <Route path="/biddings/end/:id" element={<EndBidding/>} />
        <Route path="/scheduled-trading/:id" element={<DetailsModal/>} />
      </Routes>
    </div>
  );
}

export default App;
