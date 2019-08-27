import React from 'react';
import TrelloListBoard from './components/TrelloListBoard';

class App extends React.Component {
  render() {
    return (
      <div>
        <TrelloListBoard title={'test'}/>
      </div>
    )
  }
}

export default App;
