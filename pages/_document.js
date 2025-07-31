import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Fix for i18n.changeLanguage error
              window.i18n = window.i18n || {
                changeLanguage: function() { return Promise.resolve(); },
                t: function(key) { return key; },
                language: 'en',
                isInitialized: false
              };
              
              // Prevent errors from undefined i18n methods
              if (typeof window !== 'undefined') {
                window.addEventListener('error', function(e) {
                  if (e.message && e.message.includes('i18n.changeLanguage')) {
                    e.preventDefault();
                    console.warn('i18n.changeLanguage called but not properly initialized');
                  }
                });
              }
            `
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
