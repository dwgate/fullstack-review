import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';


class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.update();
  }

  render() {
    return (
      <div>

        <h4> Repo List Component </h4>
        There are {this.props.repos.length} repos.
        
        {this.props.repos.map( (repo, index) => {
          return (
            <RepoListEntry key={index} repo={repo} />
          );
        })}

      </div>
    );
  }
}

export default RepoList;



// const RepoList = (props) => (
//   <div>
//     <h4> Repo List Component </h4>
//     There are {props.repos.length} repos.
    
//     {props.repos.map( (repo, index) => {
//       return (
//         <RepoListEntry key={index} repo={repo} />
//       );
//     })}

//   </div>
// )

// export default RepoList;