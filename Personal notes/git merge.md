```bash
# Make new branch :
git branch myNewBranch

# See all branches : 
git branch -a

# Move to a branch :
git checkout myNewBranch

# Make and checkout to a new branch (in one command) :
git checkout -b newnewbranch

# Push the new branch to the repository:
git push origin myNewBranch

# Merging to main :
    # Before merging goto (checkout) to main
git checkout main
git merge myNewBranch
# sometimes we have conflicts while merging (since main branch might have moved forward while we were working on this branch)
# so to fix that we go to the indicated files in the message and merge the code manually and add & commit again to main.

# (optional) delete a branch after merging it to main :
git branch -d myNewBranch
```

