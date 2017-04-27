import React from 'react';

const RepoListEntry = ({repo}) => (

  <div>
    <p>{repo.owner}</p>
    <p>{repo.name}</p>
    <p>{repo.forks}</p>
  </div>

)

export default RepoListEntry;