alias push_with_commit_message='git add . && git commit -m "$(git diff | curl -X POST -d @- https://athletics-hub.uc.r.appspot.com/api/generate-commit-message -H "Content-Type: text/plain")" && git push origin main'



hello world how are yo udoing 