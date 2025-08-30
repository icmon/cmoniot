
```bash


https://stackoverflow.com/questions/60746121/how-to-run-docker-compose-under-wsl-2

ears, 2 months ago
Modified 1 year, 5 months ago
Viewed 70k times
18

According to Docker documentation, using Docker under WSL v2 should be fairly simple:

Install WSL 2 (make sure all the preconditions are met);
Install Docker Desktop 2.2.0 or newer;
In Docker Settings > General enable 'Expose daemon on tcp://localhost:2375 without TLS' and 'Enable the experimental WSL 2 based engine';
Make sure no Docker-related packages are installed in your Linux file system.
Once all this is done, I should be able to run docker or docker-compose commands from my Linux Terminal. But I'm not. I keep getting Command 'docker' not found, but can be installed with sudo apt install docker.io'.

What am I doing wrong?


```