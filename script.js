document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const headerOffset = 70; // Adjust this based on your nav height
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});


// Show 'Back to Top' button
let topBtn = document.getElementById("topBtn");
window.onscroll = function() {
  if (document.body.scrollTop > 270 || document.documentElement.scrollTop > 270) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};
topBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function renderList(listId, items) {
  const list = document.getElementById(listId);
  if (!list || !Array.isArray(items) || !items.length) return;
  list.innerHTML = items.map(item => `<li>${item}</li>`).join('');
}

function renderResumeContent() {
  const content = window.portfolioContent;
  if (!content) return;

  const byId = (id) => document.getElementById(id);

  if (content.aboutSummary && byId('about-summary')) byId('about-summary').textContent = content.aboutSummary;
  if (content.resumePlaceholder && byId('resume-placeholder')) byId('resume-placeholder').textContent = content.resumePlaceholder;

  renderList('technical-skills', content.technicalSkills);
  renderList('soft-skills', content.softSkills);

  if (content.education) {
    if (content.education.degree && byId('education-degree')) byId('education-degree').textContent = content.education.degree;
    if (content.education.school && byId('education-school')) byId('education-school').innerHTML = content.education.school;
    if (content.education.metrics && byId('education-metrics')) byId('education-metrics').textContent = content.education.metrics;
    if (content.education.summary && byId('education-summary')) byId('education-summary').textContent = content.education.summary;
  }

  if (content.contact?.github && byId('contact-github')) byId('contact-github').href = content.contact.github;
  if (content.contact?.note && byId('contact-note')) byId('contact-note').textContent = content.contact.note;
}

function renderProjectCards() {
  const projects = window.portfolioContent?.newProjects;
  const grid = document.getElementById('projects-grid');
  if (!grid || !Array.isArray(projects) || !projects.length) return;

  projects.forEach((project) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    const githubHref = project.github || '#';
    const detailsHref = project.details || '#';
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <p class="project-stack"><strong>Tech:</strong> ${project.stack}</p>
      <div class="proj-btns">
        <a class="btn code" href="${githubHref}" target="_blank" rel="noopener noreferrer">${githubHref === '#' ? 'GitHub (Add Link)' : 'View Code'}</a>
        <a class="btn report" href="${detailsHref}" target="_blank" rel="noopener noreferrer">${detailsHref === '#' ? 'Details (Add Link)' : 'View Details'}</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderResumeContent();
renderProjectCards();
