import { Component, signal } from '@angular/core';
import { applyEach, form, FormField, FormRoot, required, schema } from '@angular/forms/signals';

@Component({
  selector: 'app-projects',
  imports: [FormField, FormRoot],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {

  projects = signal<ProjectsFormI>({
    projectName: '',
    projectTitle: '',
    projectCategory: '',
    projects: ['']
  })

  projectForm = form(
    this.projects,
    (path) => {
      required(path.projectName, { message: 'This is required' })
      required(path.projectCategory, { message: 'This is required' })
      required(path.projectTitle, {
        when: (ctx) => {
          const catValue = ctx.valueOf(path.projectCategory);
          return catValue === 'IT';
        },
        message: 'Select only IT'
      }),
      applyEach(path.projects, projectsRequiredValidationSchema)
    },
    {
      submission: {
        action: () => {
          return undefined;
        }
      }
    }
  )



  reset() {
    this.projectForm().reset();
    this.projectForm().focusBoundControl();
  }

  focusNextInvvalidField() {
    // this is same as form().value() //🤔 check why this is required 
    console.log(this.projectForm().fieldTree().value());
    const invalidFields = this.projectForm().errorSummary();
    if (invalidFields.length > 0) {
      invalidFields[0].fieldTree().focusBoundControl()
    }
  }

  resetCat() {
    this.projectForm.projectCategory().value.set('');
  }

  addProject(): void {
    this.projects.update((previousProjects) => ({
      ...previousProjects,
      projects: [...previousProjects.projects, '']
    }))
  }

}

interface ProjectsFormI {
  projectName: string;
  projectTitle: string;
  projectCategory: string;
  projects: string[];
}

export const projectsRequiredValidationSchema = schema((projects) => {
  required(projects, {message: 'Projects are Required.'})
}) 