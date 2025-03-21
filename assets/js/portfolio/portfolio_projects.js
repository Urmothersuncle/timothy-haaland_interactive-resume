const portfolioProjects = [
    {
        id: 1,
        title: "Inside the Archery Game",
        description: "This is the complete code for my Archery Game. A big thanks to Jason Weimann for his amazing YouTube tutorial, which helped lay the foundation for the game. I started this project before joining CS50, and after struggling through several challenging weeks of learning C, I felt more confident in struggling through C# and adding additional features to the game.",
        image: "assets/images/portfolio/inside/image1.jpg", 
        video: "assets/images/portfolio/inside/donut_animation.mp4"  
    },
    {
        id: 2,
        title: "Interactive Resume",
        description: "An engaging, interactive resume that lets users learn more about me through playful experiences.",
        githubRepo: "Urmothersuncle/timothy-haaland_interactive-resume"
    },
    {
        id: 3,
        title: "Future Repository Folder 2.",
        description: "Here will be a future project of mine to be displayed",
        image: "assets/images/portfolio/inside/image3.jpg",
        video: "assets/images/portfolio/inside/donut_animation.mp4"
    }
];

function initPortfolioProjects() {
    const container = document.querySelector('.portfolio-projects'); 
    portfolioProjects.forEach(project => {
        const projectSection = document.createElement('div');
        projectSection.className = 'project'; 

        const titleHeading = document.createElement('h3');
        titleHeading.textContent = project.title;
        titleHeading.className = 'project-title'; 
        titleHeading.onclick = function () { openModal(project.id); };

        projectSection.appendChild(titleHeading); 
        container.appendChild(projectSection); 
    });
}

function openModal(projectId) {
    const project = portfolioProjects.find(p => p.id === projectId);

    if (project) {
        const modal = new bootstrap.Modal(document.getElementById('portfolioModal'));

        document.getElementById('portfolioModalLabel').textContent = project.title;
        document.getElementById('modal-description').textContent = project.description;

        const modalImage = document.getElementById('modal-image');
        const modalVideo = document.getElementById('modal-video');
        const modalVideoSource = modalVideo.querySelector('source');

        if (project.image) {
            modalImage.src = project.image;
            modalImage.style.display = "block";
        } else {
            modalImage.style.display = "none"; 
        }

        if (project.video) {
            modalVideoSource.src = project.video;
            modalVideo.load(); 
            modalVideo.style.display = "block"; 
        } else {
            modalVideo.style.display = "none"; 
        }

        const modalGitHubData = document.getElementById('modal-github-data');
        if (project.githubRepo) {
            if (project.stars !== undefined) {
                let githubContent = `
                    <p>⭐ ${project.stars} | 🍴 ${project.forks}</p>
                    <p>Language: ${project.language}</p>
                    <a href="${project.repoUrl}" target="_blank">View on GitHub</a>
                `;
                if (project.readme) {
                    githubContent += `<div>${project.readme}</div>`;
                }
                modalGitHubData.innerHTML = githubContent;
                modalGitHubData.style.display = "block";
            } else {
                modalGitHubData.style.display = "none";
            }
        } else {
            modalGitHubData.style.display = "none";
        }

        modal.show(); 
    } else {
        console.error("Project not found!");
    }
}

function fetchGitHubData() {
    portfolioProjects.forEach(project => {
        if (project.githubRepo) {
            const [username, repoName] = project.githubRepo.split('/');

            fetch(`https://api.github.com/repos/${username}/${repoName}`)
                .then(response => response.json())
                .then(data => {
                    project.stars = data.stargazers_count;
                    project.forks = data.forks_count;
                    project.language = data.language;
                    project.repoUrl = data.html_url;

                    fetch(`https://api.github.com/repos/${username}/${repoName}/readme`, {
                        headers: {
                            'Accept': 'application/vnd.github.v3.html+json'
                        }
                    })
                        .then(response => response.text())
                        .then(readmeData => {
                            project.readme = readmeData;
                        })
                        .catch(error => console.error(`Error fetching README for ${repoName}:`, error));

                })
                .catch(error => console.error(`Error fetching repository info for ${repoName}:`, error));
        }
    });
}

// Unity Archery Game Launcher
function launchFullScreen(gamePath) {
    const gameContainer = document.createElement("iframe");
  
    // Configure the iframe
    gameContainer.src = gamePath;
    gameContainer.style.position = "fixed";
    gameContainer.style.top = 0;
    gameContainer.style.left = 0;
    gameContainer.style.width = "100%";
    gameContainer.style.height = "100%";
    gameContainer.style.border = "none";
    gameContainer.style.zIndex = 1000; // Ensure it appears above other elements
  
    // Append the iframe to the body
    document.body.appendChild(gameContainer);
  
    // Enable full screen (optional)
    if (gameContainer.requestFullscreen) {
      gameContainer.requestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) {
      gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
      gameContainer.msRequestFullscreen();
    }
  
    // Close the game on escape or when the user exits full screen
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        gameContainer.remove();
      }
    });
  }


  
document.addEventListener('DOMContentLoaded', () => {
    initPortfolioProjects(); 
    fetchGitHubData(); 

    const projectTitles = document.querySelectorAll('.project-title');

    projectTitles.forEach(title => {
        title.addEventListener('click', function() {
            this.classList.toggle('clicked');
        });
    });
});
