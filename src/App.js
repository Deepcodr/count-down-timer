import './App.css';
import Countdown from './components/Countdown';

function App() {
  return (
    <div className="App">
      <Countdown />
    </div>
  );
}

export default App;

// useEffect(() => {
    //     let intervalIds = {};

    //     timers.forEach((timer) => {
    //         if (timer.isRunning && timer.timeRemaining > 0) {
    //             intervalIds[timer.id] = setInterval(() => {
    //                 setTimers((prevTimers) =>
    //                     prevTimers.map((t) =>
    //                         t.id === timer.id ? { ...t, timeRemaining: t.timeRemaining - 1 } : t
    //                     )
    //                 );
    //             }, 1000);
    //         } else if (timer.timeRemaining === 0) {
    //             clearInterval(intervalIds[timer.id]);
    //             setTimers((prevTimers) =>
    //                 prevTimers.map((t) =>
    //                     t.id === timer.id ? { ...t, isRunning: false } : t
    //                 )
    //             );
    //         }
    //     });

    //     return () => {
    //         Object.values(intervalIds).forEach((intervalId) => clearInterval(intervalId));
    //     };
    // }, [timers]);
