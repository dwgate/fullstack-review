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

  }

  search (term) {
    console.log(`${term} was searched`);
    //send an ajax post request to server path: /repos/import

    var X = {
      user: term
    };

    var search = JSON.stringify(X);

    //DATA IS WHAT GET PUT ON THE BODY!!!!!!!!!!!!!!!
    $.post({
      url: 'http://127.0.0.1:1128/repos/import',
      data: search,
      contentType: "application/json",
      success: function() {
        console.log('success');
      },
      error: function(err) {
        console.log(err);
      }
    });

      //server will send another request to github 
        //on success
          //add stuff to database
          //send stuff back to client 

      //on success, we want to send a post req to /repos/import

      //we also want to get the repositories from the server and 
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={ this.search.bind(this) }/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));