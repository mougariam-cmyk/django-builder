export const metadata = {
  title: 'DJANGO - Meme Coin Website Builder',
  description: 'AI-Powered Landing Page Generator for Crypto & Meme Tokens',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#09090b' }}>
        {children}
      </body>
    </html>
  );
}
