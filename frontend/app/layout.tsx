import './globals.css';



export const metadata = {
  title: 'Система мережі салонів краси',
  description: 'Система для керування мережею салонів краси'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
     
    </html>
  );
}
