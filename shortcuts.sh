alias push_with_commit_message='git add . && git commit -m "$(git show | curl -X POST -d @- http://127.0.0.1:8080/api/generate-commit-message -H "Content-Type: text/plain")" && git push origin main'


#writing some random gibberish 
