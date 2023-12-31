import logo from './logo.svg';
import './App.css';
import './index.css';
import React, {useState,useEffect} from 'react';


const App = () => {
  const [theme,setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme:dark)");

  const options =[
    {
      icon:"sunny",
      text : 'light'
    },
    {
      icon:"moon",
      text : 'dark'
    },
    {
      icon:"desktop-outline",
      text : 'system'
    },
  ];
function onWindowMatch(){
  if(
      localStorage.theme === 'dark' || 
      (!("theme" in localStorage) && darkQuery.matches ) 
    ) {
      element.classList.add("dark");
  } else {
    element.classList.remove("dark") ;
  }
}
onWindowMatch();

useEffect(()=> {
  switch(theme){
    case 'dark':
      element.classList.add('dark');
      localStorage.setItem(`theme`,'dark');
    break;

    case 'light':
      element.classList.remove('dark');
      localStorage.setItem(`theme`,'light');
    break;

    default:
      localStorage.removeItem(`theme`);
      onWindowMatch();
      break;
  }
}, [theme]);

darkQuery.addEventListener("change",(e)=>{
  if(!("theme" in localStorage)){
    if(e.matches){
      element.classList.add("dark")
    }else{
      element.classList.remove("dark");
    }
  }
})

  return (
    <section className='min-h-screen pt-8 dark:text-gray-100 dark:bg-slate-900 duration-100'>
      <div className='fixed top-5 right-10 duration-100 dark:bg-slate-900 bg-gray-100 rounded'>
        {
          options?.map((opt)=>(
            <button 
              key={opt.text} 
              onClick={()=> setTheme(opt.text)}
              className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${
                theme === opt.text && "text-sky-600"
              }`}
            >
              
              <ion-icon name={opt.icon}></ion-icon>
          </button>
          ))
        }
        


      </div>

      <div className='max-w-3xl mx-auto px-5'>
        <div className='text-center'>
          <h2>LIGHT AND DARK MODE</h2>
          <h5><strong>React Dark Mode Switcher Component</strong></h5>
        </div>
        <p>
          This is a simple react component that can be used to switch between light and dark mode in your website or app. 
        </p>

      </div>
    </section>
  )
}

export default App;
