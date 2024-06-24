import './App.css'
import CandidateForm from './components/CandidateForm'


const appStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
};

function App() {
  

  return (
    <div style={appStyle}>
      <CandidateForm />
    </div>
  )
}

export default App
