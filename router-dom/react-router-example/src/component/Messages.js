import React from 'react';

import { Link, Route, Switch } from 'react-router-dom';
import Message from './Message';

const Messages = ({match}) => (
  <div>
    <h2>Messages</h2>
    <ul>
    {
      [...Array(5).keys()].map(n => {
        return <li key={n}>
          <Link to={`${match.url}/${n+1}`}>
            Messages {n+1}
          </Link>
          </li>;
      })
    }
    </ul>
    <Switch>
      <Route path={`${match.url}/:id`} component={Message} />
      <Route
        path={match.url}
        render={() => <h3>Please select a message</h3>}
      />
    </Switch>
  </div>
);

export default Messages;
