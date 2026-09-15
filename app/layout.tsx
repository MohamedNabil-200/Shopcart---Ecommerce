const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col font-poppins antialiased">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
