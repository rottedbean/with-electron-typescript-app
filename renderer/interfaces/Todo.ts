const state = {
  Default: 'default',
  Done: 'done',
  Expire: 'expire',
  Periodical: 'periodical',
  Pending: 'pending',
} as const;

export type State = (typeof state)[keyof typeof state];

export interface Todo {
  id: string;
  title: string;
  text: string;
  state: State;
  expire_date: string;
  tag: string[];
}
