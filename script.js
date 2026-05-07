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
  if (!list || !Array.isArray(items) || items.length === 0) return;
  list.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
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
    const githubHref = project.github || '';
    const detailsHref = project.details || '';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const summary = document.createElement('p');
    summary.textContent = project.summary;

    const stack = document.createElement('p');
    stack.className = 'project-stack';
    const stackLabel = document.createElement('strong');
    stackLabel.textContent = 'Tech: ';
    stack.appendChild(stackLabel);
    stack.append(document.createTextNode(project.stack));

    const btnRow = document.createElement('div');
    btnRow.className = 'proj-btns';

    const githubBtn = document.createElement('a');
    githubBtn.className = 'btn code';
    githubBtn.textContent = githubHref ? 'View Code' : 'GitHub (Add Link)';
    if (githubHref) {
      githubBtn.href = githubHref;
      githubBtn.target = '_blank';
      githubBtn.rel = 'noopener noreferrer';
    } else {
      githubBtn.href = '';
      githubBtn.setAttribute('aria-disabled', 'true');
      githubBtn.addEventListener('click', (event) => event.preventDefault());
    }

    const detailsBtn = document.createElement('a');
    detailsBtn.className = 'btn report';
    detailsBtn.textContent = detailsHref ? 'View Details' : 'Details (Add Link)';
    if (detailsHref) {
      detailsBtn.href = detailsHref;
      detailsBtn.target = '_blank';
      detailsBtn.rel = 'noopener noreferrer';
    } else {
      detailsBtn.href = '';
      detailsBtn.setAttribute('aria-disabled', 'true');
      detailsBtn.addEventListener('click', (event) => event.preventDefault());
    }

    btnRow.appendChild(githubBtn);
    btnRow.appendChild(detailsBtn);
    card.appendChild(title);
    card.appendChild(summary);
    card.appendChild(stack);
    card.appendChild(btnRow);
    grid.appendChild(card);
  });
}

renderResumeContent();
renderProjectCards();
