document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("project-form");
  const projectNameInput = document.getElementById("project-name");
  const clientInput = document.getElementById("client");
  const descriptionInput = document.getElementById("description");
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectName = projectNameInput.value.trim();
    const client = clientInput.value.trim();
    const description = descriptionInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!projectName || !client || !startDate || !endDate) {
      alert("Please fill in all required fields.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("End Date cannot be before Start Date.");
      return;
    }

    const newProject = {
      id: Math.random().toString(36).substr(2, 9),
      name: projectName,
      client,
      description,
      startDate,
      endDate,
      progress: 0,
      status: "Not Started",
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));

    alert("Project Created Successfully!");

    // Reset form fields
    form.reset();

    // Dispatch event to notify other components
    const event = new Event("projectsUpdate");
    window.dispatchEvent(event);
  });
});
