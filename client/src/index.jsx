import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

    //anytme i need to use a method with 'this', needs to bind in constructor
    this.search = this.search.bind(this);
  }

  search (term) {
    let context = this;
    console.log(`${term} was searched`);
    let userName = {
      'user': term
    };
    //DATA IS WHAT GET PUT ON THE BODY!!!!!!!!!!!!!!!
    $.post({
      url: 'http://127.0.0.1:1128/repos/import',
      data: JSON.stringify(userName),
      contentType: "application/json",
      success: function(newRepos) {
        //this has incorrect binding
          //need to make a function, and then bind it and pass it into this function
          //**************************************************************
          //pass the correct this obj
          let current = context.state.repos 
        context.setState({
          repos: current.concat(JSON.parse(newRepos))
        })

      },
      error: function(err) {
        console.log('error ', err);
      }
    });


  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={ this.search.bind(this) } />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));















