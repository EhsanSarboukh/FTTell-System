import React from 'react';
import '../styles/faq.css';
import Header from './header';


const Guide = ()=>{
  localStorage.setItem('canAccessRegister'.'false');

  return(
    <div className="guidePage">
        <Header/>
        <div className='v1'>
            <p className='pforVguide'>Toturial for website visitors</p>
            <iframe width="500" height="400" src="https://youtube.com/embed/kHU132ZhgbM" allowFullScreen></iframe>
        </div>
        <div className='v2'>
            <p className='pforVguide'>Toturial for pediatrician to use the patient diagnosing system</p>
            <iframe width="500" height="400" src="https://youtube.com/embed/f2OzrWGweHw" allowFullScreen></iframe>
        </div>
    </div>
  );
};

export default Guide;
