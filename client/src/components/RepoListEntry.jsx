import React from 'react';

const RepoListEntry = ({repo}) => (

  <div>
    <p>Author: {repo.owner}</p>
    Name: <a href={repo.link}>{repo.name}</a>
    <p>Content size: {repo.size}</p>
  </div>

)

export default RepoListEntry;