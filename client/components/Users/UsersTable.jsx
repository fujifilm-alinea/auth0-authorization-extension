import React, { Component } from 'react';
import { Table, TableCell, TableRouteCell, TableBody, TableTextCell, TableHeader, TableColumn, TableRow } from 'auth0-extension-ui';

class UsersTable extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.users !== this.props.users;
  }

  render() {
    const { users } = this.props;
    return (
      <Table>
        <TableHeader>
          <TableColumn width="6%" />
          <TableColumn width="22%">Name</TableColumn>
          <TableColumn width="29%">Email</TableColumn>
          <TableColumn width="15%">Latest Login</TableColumn>
          <TableColumn width="10%">Logins</TableColumn>
          <TableColumn width="25%">Connection</TableColumn>
          { this.props.renderActions ? <TableColumn width="8%" /> : null }
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>
                <img className="img-circle" src={user.picture} alt={user.name || user.email || user.user_id} width="32" />
              </TableCell>
              <TableRouteCell route={`/users/${user.user_id}`}>{ user.name || user.email || user.user_id }</TableRouteCell>
              <TableTextCell>{ user.email || 'N/A' }</TableTextCell>
              <TableTextCell>{ user.last_login ? user.last_login_relative : 'Never' }</TableTextCell>
              <TableTextCell>{ user.logins_count }</TableTextCell>
              <TableTextCell>{ user.identities[0].connection }</TableTextCell>
              { this.props.renderActions ? <TableCell>{this.props.renderActions(user, index)}</TableCell> : null }
            </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

UsersTable.propTypes = {
  users: React.PropTypes.array.isRequired,
  loading: React.PropTypes.bool.isRequired,
  renderActions: React.PropTypes.func.isRequired
};

export default UsersTable;
