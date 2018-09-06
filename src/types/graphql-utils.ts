import User from '../models/User';

export interface ResolverMap {
  [key: string]: {
    [key: string]: (
      parent: any,
      args: any,
      context: { User },
      info: any
    ) => any;
  };
}
