gen_enforced_dependency(WorkspaceCwd, DependencyIdent, null, dependencies) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, dependencies),
  DependencyIdent \= 'amqplib', 
  DependencyIdent \= 'commander', 
  DependencyIdent \= 'dotenv'.

gen_enforced_dependency(WorkspaceCwd, DependencyIdent, null, devDependencies) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, devDependencies),
  DependencyIdent \= '@types/amqplib', 
  DependencyIdent \= '@types/bluebird', 
  DependencyIdent \= '@types/node', 
  DependencyIdent \= '@typescript-eslint/eslint-plugin', 
  DependencyIdent \= '@typescript-eslint/parser', 
  DependencyIdent \= 'eslint', 
  DependencyIdent \= 'prettier', 
  DependencyIdent \= 'test-npm-dependants', 
  DependencyIdent \= 'ts-node', 
  DependencyIdent \= 'typescript'.