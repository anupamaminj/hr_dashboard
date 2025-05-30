import '@styles/globals.css';


const Rootlayout = ({ children })  => {
  return (
    <html lang='en'>
        <body>
            <div className="main">
                <div className="gradient"/>
            </div>
            <main className="app">
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout;