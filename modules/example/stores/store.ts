import moment from 'moment';
import { defineStore } from 'pinia';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useTodoStore = defineStore('useTodoStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      listTodo: [],
      repositories: [],
      CommitArray: [],
      gitBranchesList: [],
      workflows: [],
      labels: [],
      data: [],
      commitLabels: [],
      commitData: [],
      commitCount: [],
      commitLabelsFiltred: [],
      lastMonthLabelsPR: [],
      lastMonthDataPR: [],
      lastMonthDataCommit: [],
      lastMonthLabelsCommit: [],
    };
  },
  actions: {
    async getTodoList({ onError, onSuccess }: any) {
      try {
        const headers = {
          'Content-type': 'accept',
        };
        const response: any = await fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'GET',
          headers: headers,
        });
        const res = await response.json();
        this.listTodo = res;
        return onSuccess(res);
      } catch (e) {
        console.log(e);
        return onError(e);
      }
    },

    async testGraphQl({ onError, onSuccess }: any) {
      let results = await fetch('https://api.github.com/graphql', {
        method: 'POST',

        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer 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',
        },

        body: JSON.stringify({
          query: `{
  organization(login: "keyrustunisie") {
    repository(name: "of-care-monorepo") {
      pullRequests(orderBy: {field: CREATED_AT, direction: ASC}, first: 100) {
        nodes {
          createdAt
          commits(first: 100) {
            nodes {
              commit {
                author {
                  date
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}`,
        }),
      });
      let characters = await results.json();

      characters.data.organization.repository.pullRequests.nodes.map((e: any) => {
        this.labels.push(e.createdAt.split('T')[0]);
      });
      this.labels = [...new Set(this.labels)];

      this.labels.forEach((e: any, i: any) => {
        this.data[i] = 0;
      });

      characters.data.organization.repository.pullRequests.nodes.map((e: any) => {
        this.data[this.labels.indexOf(e.createdAt.split('T')[0])]++;
      });

      let labelsDate = [];
      characters.data.organization.repository.pullRequests.nodes.map((e: any) => {
        labelsDate.push(e.createdAt);
      });
      const lastItem = this.labels[this.labels.length - 1];
      const two = new Date(lastItem);
      var twoMonth = two.getMonth() + 1;
      var twoYear = two.getFullYear();

      for (let index = 0; index < this.labels.length; index++) {
        if (this.labels[index].includes(twoMonth && twoYear)) {
          this.lastMonthLabelsPR.push(this.labels[index]);
        }
      }

      let lastMonthSplit = [];
      for (let index = 0; index < this.lastMonthLabelsPR.length; index++) {
        lastMonthSplit.push(this.lastMonthLabelsPR[index].substring(0, 7));
      }
      console.log('lastMonthSplit', lastMonthSplit);

    
      this.lastMonthLabelsPR.forEach((e: any, i: any) => {
        this.lastMonthDataPR[i] = 0;
      });

      characters.data.organization.repository.pullRequests.nodes.map((e: any) => {
        this.lastMonthDataPR[this.lastMonthLabelsPR.indexOf(e.createdAt.split('T')[0])]++;
      });

  
      //hethi nkharjou beha le mois exactement
      // console.log('fffff', this.labels[0].substring(5, 7));
      return onSuccess();
    },

    async commitDate({ onError, onSuccess }: any) {
      let results = await fetch('https://api.github.com/graphql', {
        method: 'POST',

        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer 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',
        },

        body: JSON.stringify({
          query: `{
  organization(login: "keyrustunisie") {
    repository(name: "of-care-monorepo") {
      pullRequests(orderBy: {field: CREATED_AT, direction: ASC}, first: 100) {
        nodes {
          createdAt
          commits(first: 100) {
            nodes {
              commit {
                author {
                  date
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}`,
        }),
      });
      let resCommit = await results.json();
      resCommit.data.organization.repository.pullRequests.nodes.forEach((element) => {
        element.commits.nodes.forEach((element) => {
          this.commitLabels.push(element.commit.author.date.split('T')[0]);
        });
      });

      this.commitLabelsFiltred = [...new Set(this.commitLabels)];

      var reapeted;
      this.commitLabelsFiltred.forEach((elementDate, index) => {
        reapeted = 0;
        this.commitLabels.forEach((element) => {
          if (element.includes(elementDate)) {
            reapeted++;
          }
        });
        this.commitCount[index] = reapeted;
      });

      const lastItem = this.commitLabels[this.commitLabels.length - 1];
      console.log('LAST ITEM COMMIT', lastItem);
      const two = new Date(lastItem);
      var twoMonth = two.getMonth() + 1;
      console.log('twoMonth', twoMonth);

      var twoYear = two.getFullYear();
      console.log('twoMonth', twoYear);
      for (let index = 0; index < this.commitLabelsFiltred.length; index++) {
        if (this.commitLabelsFiltred[index].includes(twoMonth && twoYear)) {
          this.lastMonthLabelsCommit.push(this.commitLabelsFiltred[index]);
        }
      }
      console.log('lastMonthLabelsCommit', this.lastMonthLabelsCommit);

      for (var i = 0; i < this.lastMonthLabelsCommit.length; i++){
        this.lastMonthDataCommit.push(this.commitCount[i])
      }
        console.log('lastMonthDataCommit lastMonthDataCommit lastMonthDataCommit', this.lastMonthDataCommit);
      return onSuccess();
    },

    async getGitRepos({ onError, onSuccess }: any) {
      try {
        const headers = {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer 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',
        };
        const response: any = await fetch('https://api.github.com/search/repositories?q=user:keyrustunisie', {
          method: 'GET',
          headers: headers,
        });
        const res = await response.json();
        this.repositories = res.items;
        return onSuccess(res.items);
      } catch (e) {
        console.log(e);
        return onError(e);
      }
    },
    async getgitBranchList({ repoName, onSuccess, onError }: any) {
      console.log(repoName);
      try {
        const headers = {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer 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',
        };
        const response: any = await fetch('https://api.github.com/repos/keyrustunisie/' + repoName + '/branches', {
          method: 'GET',
          headers: headers,
        });
        const res = await response.json();
        this.gitBranchesList = res;
        return onSuccess(res);
      } catch (e) {
        console.log(e);
        return onError(e);
      }
    },

    // listes de tout les branches lmawjoudin
    async getGitBranchesList({ onError, onSuccess }: any) {
      try {
        const headers = {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer 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',
        };
        const response: any = await fetch('https://api.github.com/repos/fahmimrabti10/uaa/branches', {
          method: 'GET',
          headers: headers,
        });
        const res = await response.json();
        this.listTodo = res;
        return onSuccess(res);
      } catch (e) {
        console.log(e);
        return onError(e);
      }
    },

    //njibou beha TeamsName au mm temps les membres de chaque team
    async getTeamsMembers({ onError, onSuccess }: any) {
      const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: 'Bearer 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',
      };
      const responseTeam = await fetch('https://api.github.com/orgs/keyrustunisie/teams', {
        method: 'GET',
        headers: headers,
      });
      const res = await responseTeam.json();

      let array: any = [];
      //agregation des 2 resultats du fetch method
      await Promise.all(
        res.map(async (el: any, index: any) => {
          const teamName = el.name.replace(/\s/g, '-');
          const members = await fetch('https://api.github.com/orgs/keyrustunisie/teams/' + teamName + '/members', {
            method: 'GET',
            headers: headers,
          });
          const res = await members.json();
          array.push({
            key: index,
            name: teamName.replace(/-/g, ' '),
            member: res,
          });
        })
      );

      return onSuccess(array);
    },

    async getCommitList({ branchName, onSuccess }: any) {
      console.log(branchName);
      try {
        const headers = {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer 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',
        };
        const response: any = await fetch(`https://api.github.com/repos/fahmimrabti10/uaa/commits?sha=${branchName}`, {
          method: 'GET',
          headers: headers,
        });
        const res = await response.json();
        this.listTodo = res;
        const CommitArray: any = [];
        res.map((el: any, index: any) =>
          CommitArray.push({
            key: index,
            Avatar: el.author.avatar_url,
            Name: el.commit.author.name,
            Message: el.commit.message,
            Build: el.committer.id,
            Status: 'status',
            Date: el.commit.committer.date.replace('Z', '').replace('T', ''),
          })
        );
        return onSuccess(CommitArray);
      } catch (e) {
        console.log(e);
        // return onError(e);
      }
    },

    async tableWorkFlowList({ repoName, branchName, onSuccess }: any) {
      console.log(branchName);
      try {
        const headers = {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer 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',
        };
        const response: any = await fetch(
          'https://api.github.com/repos/keyrustunisie/' + repoName + '/actions/runs?branch=' + branchName,
          {
            method: 'GET',
            headers: headers,
          }
        );
        const res = await response.json();
        this.listTodo = res;
        this.workflows = res.workflow_runs;

        // console.log(res.workflow_runs);
        const CommitArray: any = [];
        this.workflows.map((el: any, index: any) =>
          CommitArray.push({
            key: index,
            author: {
              avatar: el.actor.avatar_url,
              name: el.name,
              message: el.head_commit.message,
            },
            build: el.run_number,
            status: el.conclusion,
            date: el.created_at.replace('Z', '   ').replace('T', '   ').replace(/-/g, '/'),
          })
        );
        return onSuccess(CommitArray);
      } catch (e) {
        console.log(e);
        // return onError(e);
      }
    },

    async tablecommitList({ repoName, branchName, onSuccess }: any) {
      console.log(branchName);
      try {
        const headers = {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer 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',
        };
        const response: any = await fetch(
          'https://api.github.com/repos/keyrustunisie/' + repoName + '/commits?sha=' + branchName,
          {
            method: 'GET',
            headers: headers,
          }
        );
        const res = await response.json();
        this.listTodo = res;
        const CommitArray: any = [];
        res.map((el: any, index: any) =>
          CommitArray.push({
            key: index,
            author: {
              avatar: el.author.avatar_url,
              name: el.commit.author.name,
              message: el.commit.message,
            },
            build: el.committer.id,
            status: 'status',
            date: el.commit.committer.date.replace('Z', '   ').replace('T', '   ').replace(/-/g, '/'),
          })
        );
        return onSuccess(CommitArray);
      } catch (e) {
        console.log(e);
        // return onError(e);
      }
    },
    // liste des commit d'une branche
    async getCommitsList({ branchName, onSuccess, onError }: any) {
      console.log(branchName);
      try {
        const headers = {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer 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',
        };
        const response: any = await fetch(`https://api.github.com/repos/fahmimrabti10/uaa/commits?sha=${branchName}`, {
          method: 'GET',
          headers: headers,
        });
        const res = await response.json();
        this.listTodo = res;
        console.log('error');
        return onSuccess(res);
      } catch (e) {
        console.log(e);
        return onError(e);
      }
    },

    async getCommits({ onError, onSuccess }: any) {
      try {
        const headers = {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'Bearer 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',
        };
        const response: any = await fetch('https://api.github.com/repos/fahmimrabti10/uaa/commits?sha=master', {
          method: 'GET',
          headers: headers,
        });
        const res = await response.json();
        this.listTodo = res;
        console.log('error');
        return onSuccess(res);
      } catch (e) {
        console.log(e);
        return onError(e);
      }
    },
  },
});
