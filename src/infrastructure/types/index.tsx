export type RepoProps = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  open_issues_count: number;
  owner: {
    avatar_url: string;
  };
};
