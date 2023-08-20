import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { DataLayer } from './DataLayer/DataLayer';
import reducer, { initialState } from './DataLayer/reducer';
import AdminPanel from './Pages/AdminPanel';
import { darkTheme } from './theme';
function App() {

  return (
    <DataLayer initialState={initialState} reducer={reducer}>
      <ThemeProvider theme={darkTheme}>
        <AdminPanel />
      </ThemeProvider>
    </DataLayer>
  )

}

export default App;
