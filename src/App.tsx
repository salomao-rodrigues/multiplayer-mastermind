import React, { SFC } from 'react';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash-es';

import MainLayout from './MainLayout';

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      username
      email
      createdAt
    }
  }
`;

interface AuthFormFields {
  email: string;
  password: string;
  user: object;
  errors: Array<object>;
  [key: string]: any;
}

class AuthPiece extends React.Component<{}, AuthFormFields> {
  state = {
    email: '',
    password: '',
    errors: [],
    user: {}
  };

  readonly onChangeHandler = ({
    currentTarget: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [name]: value });
  };

  getErrorMessages = (errors: { graphQLErrors: any[] }): string[] => {
    return errors.graphQLErrors.reduce((messages: string[], error: object) => {
      const message = get(error, 'extensions.exception.details[0].message');

      if (message) {
        messages.push(message);
      }

      return messages;
    }, []);
  };

  render(): React.ReactNode {
    const { email, password } = this.state;
    return (
      <Mutation mutation={SIGN_IN_MUTATION}>
        {(signIn, { error }) => (
          <div>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                signIn({ variables: { email, password } });
                this.setState({ email: '', password: '' });
              }}
            >
              <div>
                <label>
                  Email:{' '}
                  <input
                    name="email"
                    onChange={this.onChangeHandler}
                    value={email}
                  />
                </label>
              </div>
              <div>
                <label>
                  Password:{' '}
                  <input
                    name="password"
                    type="password"
                    onChange={this.onChangeHandler}
                    value={password}
                  />
                </label>
              </div>
              <button type="submit">Login</button>
              <button type="button" onClick={console.log}>
                Logout
              </button>
              {/* { loading && <div>Loading...</div>} */}
              {error && (
                <div style={{ color: 'red' }}>
                  <div />{' '}
                  {this.getErrorMessages(error).map((message, index) => (
                    <div key={index}>{message}</div>
                  ))}
                </div>
              )}
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

const AuthPieceWithClient = graphql(SIGN_IN_MUTATION)(AuthPiece);

const App: SFC<{}> = () => (
  <MainLayout>
    <AuthPieceWithClient />
  </MainLayout>
);

export default App;
