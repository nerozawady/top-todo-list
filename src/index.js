import {v4 as uuid} from 'uuid';
import './style.css';
import * as Todo from './Todo';
import * as Project from './Project';
import * as DOM from './DOM';

const elements = {};
// const DOM = {};
const projectsList = [];
const todosList = [];

function queryElements() {
  elements.buttons = document.querySelectorAll('button');
  elements.TodoExpandSubtodosButtons = document.querySelectorAll('.todo__expand-subtodos');
  const ETodoDeleteButtons = document.querySelectorAll('.todo__delete');
  const EAddProjectButton = document.querySelector('.page-navigation [name="add-project"]');
  const EAddProjectForm = document.querySelector('.add-project');
  const EProjectsList = document.querySelector('[data-is-projects-list]');

  const ESelectedProject = document.querySelector(
    '.page-navigation [data-is-project].page-navigation__list-item--selected'
  );
}

function loadData() {
  const tempProjectsList = JSON.parse(localStorage.getItem('projectsList'));
  if (tempProjectsList !== null) {
    projectsList = tempProjectsList;
  } else {
    projectsList = [
      {
        id: uuid(),
        name: 'Default',
        selected: true,
      },
      {
        id: uuid(),
        name: 'A',
        selected: false,
      },
    ];

    projectsList.forEach(project => {
      project.element = addProjectElement(project.name);
    });

    ESelectedProject = projectsList.find(project => project.selected).element;
    ESelectedProject.classList.add('page-navigation__list-item--selected');
    ESelectedProject.children[0].classList.add('page-navigation__button--selected');
  }
}

function saveData() {
  localStorage.setItem('projectsList', JSON.stringify(projectsList));
}

function setupEvents() {
  EButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.blur();
    });
  });

  ETodoExpandSubtodosButtons.forEach(button =>
    button.addEventListener('click', event => {
      const todo = event.target.parentElement.parentElement;
      const subtodo = todo.querySelector('.todo__subtodos');
      subtodo.classList.toggle('hidden');
    })
  );

  ETodoDeleteButtons.forEach(button =>
    button.addEventListener('click', event => {
      event.target.parentElement.parentElement.remove();
    })
  );

  EAddProjectButton.addEventListener('click', () => {
    document.querySelector('.add-project').classList.remove('hidden');
  });

  EAddProjectForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(EAddProjectForm);
    const projectName = formData.get('project-name');

    const projectElement = addProjectElement(projectName);
    projectsList.push(
      ProjectFactory({
        name: projectName,
        element: projectElement,
      })
    );

    projectElement.children[0].addEventListener('click', () => {
      if (projectElement !== ESelectedProject) {
        ESelectedProject.children[0].classList.remove('page-navigation__button--selected');
        ESelectedProject.classList.remove('page-navigation__list-item--selected');

        projectElement.children[0].classList.add('page-navigation__button--selected');
        projectElement.classList.add('page-navigation__list-item--selected');
      }
    });

    EAddProjectForm.reset();
    EAddProjectForm.classList.add('hidden');
  });

  EAddProjectForm.addEventListener('reset', () => {
    EAddProjectForm.reset();
    EAddProjectForm.classList.add('hidden');
  });
}

function resetForms() {
  document.querySelectorAll('form').forEach(form => form.reset());
}

function init() {
  queryElements();
  loadData();
  saveData();
  setupEvents();
  resetForms();
}

init();
