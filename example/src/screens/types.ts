export interface DummyScreenParams {
  name: string;
  backgroundColor: string;
  nextScreen: string;
}

export type MainTabsParams = {
  Home: DummyScreenParams;
  Likes: DummyScreenParams;
  Search: DummyScreenParams;
  Profile: DummyScreenParams;
};
