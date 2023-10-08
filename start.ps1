
# Start the front-end in a new PowerShell window
Start-Process -FilePath "npm" -ArgumentList "run start" -WorkingDirectory "./project/frontend"

# Start the back-end in a new PowerShell window
Start-Process -FilePath "npm" -ArgumentList "run start" -WorkingDirectory "./project/backend" 
