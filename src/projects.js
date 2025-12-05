async function loadProjects() {
  const username = "cybertarr-A";

  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await response.json();

  // Filter: hide forks and non-portfolio repos
  const filtered = repos
    .filter(repo => !repo.fork && repo.topics.includes("portfolio"))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const projectSection = document.getElementById("project-list");
  projectSection.innerHTML = "";

  filtered.forEach(repo => {
    const project = `
      <div class="project-card">
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available"}</p>
        <a href="${repo.html_url}" target="_blank">View Project</a>
      </div>
    `;
    projectSection.innerHTML += project;
  });
}

loadProjects();
