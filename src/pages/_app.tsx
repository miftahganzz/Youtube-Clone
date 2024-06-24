import '../styles/globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { interFont } from '@/lib/constants';
import { AppProps } from 'next/app';

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <div className={interFont.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}
