publish:
  # Build the Vite project
  yarn build

  # Navigate to the dist directory
  cd dist

  # Initialize a new Git repository in the dist folder
  git init

  # Add and commit all files
  git add -A
  git commit -m "Deploy to GitHub Pages"

  # Get the repository URL from the parent directory
  REPO_URL=$(git -C .. config --get remote.origin.url)


  # Push to the gh-pages branch (replace <REPO_URL> with your repository URL)
  git push -f $REPO_URL master:gh-pages

  # Return to the main project directory
  cd ..