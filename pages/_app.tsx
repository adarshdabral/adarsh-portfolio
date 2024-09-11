import '../styles/globals.css';  // Your own global styles
// import 'react-chatbotify/dist/style.css';  // Chatbot's global CSS
import type { AppProps } from 'next/app';  // TypeScript types for App

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
