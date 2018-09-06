// tslint:disable
// graphql typescript definitions

export namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    hi: string;
    bye: string;
    getAllUsers: Array<IUser>;
  }

  interface IUser {
    __typename: 'User';
    _id: string;
    email: string;
    username: string;
    isAdmin: boolean | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    loginUser: IToken | null;
    registerUser: IToken | null;
  }

  interface ILoginUserOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegisterUserOnMutationArguments {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    isAdmin?: boolean | null;
  }

  interface IToken {
    __typename: 'Token';
    token: string;
  }
}

// tslint:enable
