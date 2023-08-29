export const ProjectFactory = ({name, element}) => ({
  name,
  element,
  todoList: [],
});

export function addProjectElement(projectName) {
  const EProject = document.createElement('li');
  EProject.classList.add('page-navigation__list-item');

  const EProjectButton = document.createElement('button');
  EProjectButton.classList.add('page-navigation__button');
  EProjectButton.textContent = projectName;
  EProjectButton.setAttribute('data-name', 'add-project');
  EProjectButton.addEventListener('click', () => {
    EProjectButton.blur();
  });

  EProject.appendChild(EProjectButton);
  EProjectsList.appendChild(EProject);

  return EProject;
}
