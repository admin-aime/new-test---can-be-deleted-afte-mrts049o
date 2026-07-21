import React from 'react';
import ReactDOM from 'react-dom/client';
import { FeedbackProvider } from '@aime-platform/aime-feedback-module';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FeedbackProvider
      projectId="6a5e9c45d0111e8be009205a"
      projectsMsBaseUrl={import.meta.env.VITE_FEEDBACK_PROJECTS_MS_URL}
      projectsMsToken={import.meta.env.VITE_FEEDBACK_PROJECTS_MS_TOKEN}
      filesMsApiBaseUrl={import.meta.env.VITE_FEEDBACK_FILES_MS_URL}
      filesMsToken={import.meta.env.VITE_FEEDBACK_FILES_MS_TOKEN}
      teamsUrl={import.meta.env.VITE_PROJECT_TOOLS_URL}
      notifyUsers={import.meta.env.VITE_FEEDBACK_NOTIFY_USERS}
    >
      <App />
    </FeedbackProvider>
  </React.StrictMode>
);
