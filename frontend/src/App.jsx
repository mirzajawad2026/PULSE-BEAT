import { Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Albums from "./pages/Albums/Albums";
import Upload from "./pages/Upload/Upload";
import Profile from "./pages/Profile/Profile";
import CreateAlbum from "./pages/CreateAlbum/CreateAlbum";


import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Home */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Protected Albums */}

      <Route
        path="/albums"
        element={
          <ProtectedRoute>
            <Layout>
              <Albums />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Protected Upload */}

      <Route
        path="/upload"
        element={
          <ProtectedRoute role="artist">
            <Layout>
              <Upload />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Protected Profile */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
  path="/create-album"
  element={
    <ProtectedRoute role="artist">
      <Layout>
        <CreateAlbum />
      </Layout>
    </ProtectedRoute>
  }
/>

      {/* 404 Page */}

      <Route
        path="*"
        element={
          <h1 className="text-center text-white text-5xl mt-20">
            404 Page Not Found
          </h1>
        }
      />

    </Routes>


  );
}

export default App;