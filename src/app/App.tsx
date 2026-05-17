import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {routesArray} from "@/app/routes";
import {ProtectedRoute} from "@/widgets";

function App() {
  return (
      <Router>
        <>
          <Routes>
              {
                  routesArray.everyone.map((route)=> (
                      <Route path={route.path} element={<route.element/>}/>
                  ))
              }
              {
                  routesArray.user.map((route) => (
                      <Route path={route.path} element={
                          <ProtectedRoute>
                              <route.element/>
                          </ProtectedRoute>
                      }/>
                  ))
              }
          </Routes>
        </>
      </Router>
  )
}

export default App
