import { Panel, Placeholder, Row, Col, FlexboxGrid, PanelGroup } from 'rsuite';
import { AppHeader } from './components/Header';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import { ProjectPage } from './pages/ProjectPage';
import { TestSuitPage } from './pages/TestSuitePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectPage/>,
  },
  {
    path: "/suit/:id",
    element: <TestSuitPage/>,
  },
]);

const App = () => (
  // <>
  //   <AppHeader/>
  //   <RouterProvider router={router} />
  // </>
  
  <BrowserRouter>
    <AppHeader/>
    <Routes>
      <Route path="/" element={<ProjectPage />}/>
      <Route path="/suit/:id" element={<TestSuitPage />} />
    </Routes>
  </BrowserRouter>

);


export default App
