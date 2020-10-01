import React from 'react';
import Layout from './core/Layout'


const App = () => {
  return (
    <div>
      <Layout>
        <div className="container" style={{marginTop:40}}>
           <div className="row justify-content-center">
              <div className="col-lg-8 col-sm-12">
                <center>
                     <h1>MERN</h1>
                     <hr/>
                    <h5>Mongodb,Express,React,NodeJs</h5>
                    <br/>
                    <p>
                    A stack is the combination of technologies used to create a web application. Any web application will be made using multiple technologies (frameworks, libraries, databases etc).

The MERN stack is a JavaScript stack that’s designed to make the development process smoother. MERN includes four open-source components: MongoDB, Express, React, and Node.js. These components provide an end-to-end framework for developers to work in.  
                    </p>
                  </center>
              </div>
           </div>
        </div>
      </Layout>
    </div>
  )
}

export default App;
