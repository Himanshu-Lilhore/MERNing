```bash
# Make new branch :
git branch myNewBranch

# See all branches : 
git branch -a

# Move to a branch :
git checkout myNewBranch

# Make and checkout to a new branch (in one command) :
git checkout -b newnewbranch

# Merging to main :
    # Before merging goto (checkout) to main
git checkout main
git merge myNewBranch
# sometimes we have conflicts while merging (since main branch might have moved forward while we were working on this branch)
# so to fix that fix that we go to the indicated file in the message and fix the code and add & commit again to main.

# (optional) delete a branch after merging it to main :
git branch -d myNewBranch
```

