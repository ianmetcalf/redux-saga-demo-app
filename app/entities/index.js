import {schema} from 'normalizr';

const BASE_URL = 'https://api.github.com';

const userSchema = new schema.Entity('users', {}, {
  idAttribute: 'login',
});

const repoSchema = new schema.Entity('repos', {
  owner: userSchema,
}, {
  idAttribute: 'full_name',
});

export function user(id) {
  return {
    id: `user_${ id }`,
    url: `${ BASE_URL }/users/${ id }`,
    schema: userSchema,
  };
}

export function repo(id) {
  return {
    id: `repo_${ id }`,
    url: `${ BASE_URL }/repos/${ id }`,
    schema: repoSchema,
  };
}

export function starredRepos(userId) {
  return {
    id: `starred_repos_for_${ userId }`,
    url: `${ BASE_URL }/users/${ userId }/starred`,
    schema: new schema.Entity('users', {
      starred: [repoSchema],
    }, {
      idAttribute() {
        return userId;
      },
      processStrategy(value) {
        return {
          starred: value,
        };
      },
    }),
  };
}

export function stargazers(repoId) {
  return {
    id: `stargazers_for_${ repoId }`,
    url: `${ BASE_URL }/repos/${ repoId }/stargazers`,
    schema: new schema.Entity('repos', {
      stargazers: [userSchema],
    }, {
      idAttribute() {
        return repoId;
      },
      processStrategy(value) {
        return {
          stargazers: value,
        };
      },
    }),
  };
}
