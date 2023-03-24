import React, { useState } from "react";
import NavBar  from "./components/NavBar";
import NewsComponent from "./components/NewsComponent";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = ()=>{
  const [progress, setProgress] = useState(0) 
  return (
    <Router>
      <div>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <NewsComponent
                setProgress={setProgress}
                key="/"
                pageSize="5"
                country="us"
                category="general"
                api={process.env.REACT_APP_NEWS_API}
              />
            }
          ></Route>

          <Route
            exact
            path="/Business"
            element={
              <NewsComponent
                setProgress={setProgress}
                key="Business"
                pageSize="5"
                country="us"
                category="business"
                api={process.env.REACT_APP_NEWS_API}
              />
            }
          ></Route>

          <Route
            exact
            path="/Entertainment"
            element={
              <NewsComponent
                setProgress={setProgress}
                key="Entertainment"
                pageSize="5"
                country="us"
                category="entertainment"
                api={process.env.REACT_APP_NEWS_API}
              />
            }
          ></Route>

          <Route
            exact
            path="/General"
            element={
              <NewsComponent
                setProgress={setProgress}
                key="General"
                pageSize="5"
                country="us"
                category="general"
                api={process.env.REACT_APP_NEWS_API}
              />
            }
          ></Route>

          <Route
            exact
            path="/Health"
            element={
              <NewsComponent
                setProgress={setProgress}
                key="Health"
                pageSize="5"
                country="us"
                category="health"
                api={process.env.REACT_APP_NEWS_API}
              />
            }
          ></Route>

          <Route
            exact
            path="/Science"
            element={
              <NewsComponent
                setProgress={setProgress}
                key="Science"
                pageSize="5"
                country="us"
                category="science"
                api={process.env.REACT_APP_NEWS_API}
              />
            }
          ></Route>

          <Route
            exact
            path="/Sports"
            element={
              <NewsComponent
                setProgress={setProgress}
                key="Sports"
                pageSize="5"
                country="us"
                category="sports"
                api={process.env.REACT_APP_NEWS_API}
              />
            }
          ></Route>

          <Route
            exact
            path="/Technology"
            element={
              <NewsComponent
                setProgress={setProgress}
                key="Technology"
                pageSize="5"
                country="us"
                category="technology"
                api={process.env.REACT_APP_NEWS_API}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
