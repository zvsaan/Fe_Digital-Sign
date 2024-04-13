import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Login from "./scenes/login";
import Register from "./scenes/register";
import FAQ from "./scenes/faq";
import NotFoundPage from "./scenes/404";
import InvitePage from "./scenes/invite";
import EditProfile from "./scenes/edit_profile";
import Settings from "./scenes/settings";
import DataDocument from "./scenes/document";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const shouldShowSidebarAndTopbar = (path) => {
    return !["/login", "/register"].includes(path);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {shouldShowSidebarAndTopbar(window.location.pathname) && (
            <>
              <Sidebar isSidebar={isSidebarVisible} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebarVisible} />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/document" element={<DataDocument />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/invite" element={<InvitePage />} />
                  <Route path="/editprofile" element={<EditProfile />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </>
          )}
          <Routes>
            <Route
              path="/login"
              element={<Login setIsSidebar={setIsSidebarVisible} />}
            />
            <Route
              path="/register"
              element={<Register setIsSidebar={setIsSidebarVisible} />}
            />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;