import React from 'react';

const RepoListEntry = ({repo}) => (

  <div>
    <p>REPO OWNER: {repo.owner}</p>
    REPO NAME: <a href={repo.link}>{repo.name}</a>
    <p>REPO FORKS: {repo.forks}</p>
  </div>

)

export default RepoListEntry;