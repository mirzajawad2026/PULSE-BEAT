import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="min-h-screen pt-20 pb-36 pl-0 text-white xl:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
      <MusicPlayer />
    </>
  );
}

export default Layout;