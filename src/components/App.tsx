import React, {useState, useEffect} from "react";

const App = () => {
  // generated will be a state.generate value in Store, not a Hook
  // const [generated] = useState(false)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // setTimeout(()=>{setLoading(false)}, 2000);
    setLoading(false);
  }, [])
  return (loading ? (null) : (
    <div>
      <h2>My portfolio</h2>
      <h3>dd</h3>
    </div>
  ));
};

export default App;
