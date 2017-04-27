// import './components/styles.css';
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
    this.updateTopRepos = this.updateTopRepos.bind(this);
  }

  //this isn't working
  filterRepos (repos) {
    let onPage = this.state.repos;
    let filtered = [];
    repos.forEach( (repo) => {
      if ( !onPage.includes(repo) ) {
        filtered.push(repo);
      } else {
      }
    });
    return filtered;
  }

  updateTopRepos() {
    let context = this;
    $.get({
      url: 'http://127.0.0.1:1128/repos',
      contentType: "application/json",
      success: function(newRepos) {

        console.log('something back from get repo request');
        context.setState({
          repos: newRepos
        });

      },
      error: function(err) { console.log('error updating top repos', err); }
    })
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
          //****************************
          //pass the correct this context
          console.log('Repos retrieved for ', term, ' successfully!');
        // let current = context.state.repos;
        // let toBeAdded = context.filterRepos( JSON.parse(newRepos) );
        // context.setState({
        //   repos: current.concat(toBeAdded)
        // });
        context.updateTopRepos();
      },
      error: function(err) {
        console.log('error ', err);
      }
    });


  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList 
        update={ this.updateTopRepos.bind(this) } 
        repos={this.state.repos} 
      />
      
      <Search onSearch={ this.search.bind(this) } />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));















