import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { applyEach, debounce, form, FormField, FormRoot, PathKind, required, schema, SchemaPathTree, validate } from '@angular/forms/signals';
import { Search } from "../search/search";

@Component({
  selector: 'app-projects',
  imports: [FormField, FormRoot, NgClass, Search],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {

  protected readonly name = signal('');
  http = inject(HttpClient)
  // debouncdeName = debounced(this.name, 10);

  projects = signal<ProjectsFormI>({
    projectName: '',
    projectTitle: '',
    projectCategory: '',
    projects: [''],
    projectsOffering: []
  })

  projectForm = form(
    this.projects,
    (path) => {
      required(path.projectName, { message: 'This is required' })
      required(path.projectCategory, { message: 'This is required' })
      validate(path.projectCategory, (projectCategoryCtx) => {
        return projectCategoryCtx.valueOf(path.projectName) ? undefined : { kind: 'test', message: 'Cross Field Validation...' }
      })
      required(path.projectTitle, {
        when: (ctx) => {
          const catValue = ctx.valueOf(path.projectCategory);
          return catValue === 'IT';
        },
        message: 'Select only IT'
      })
      applyEach(path.projects, projectsRequiredValidationSchema)
      applyEach(path.projectsOffering, (projectsOfferingPath) => {
        required(projectsOfferingPath.clientName, {
          when: (ctx) => {
            const pt = ctx.valueOf(path.projectName)
            return !pt
          },
          message: 'Fill project name Name',
        })
        required(projectsOfferingPath.country, { message: 'Country are Required.' })
      })
    },
    {
      submission: {
        action: async (ctx) => {
          console.log(ctx().value());
          this.http.post('', {body: ctx().value()})

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

  addProjectsOffering(): void {
    this.projects.update((previousProjects) => ({
      ...previousProjects,
      projectsOffering: [...previousProjects.projectsOffering, { clientName: '', country: '' }]
    }))
  }

}

interface ProjectsFormI {
  projectName: string;
  projectTitle: string;
  projectCategory: string;
  projects: string[];
  projectsOffering: ProjectsOfferingI[];
}

interface ProjectsOfferingI {
  clientName: string;
  country: string;

}

export const projectsRequiredValidationSchema = schema<string>((projects) => {
  required(projects, { message: 'Projects are Required.' })
});

export const projectsOfferingValidationSchema = schema<ProjectsOfferingI>((projectsOffering: SchemaPathTree<ProjectsOfferingI, PathKind.Root>) => {
  required(projectsOffering.clientName, { message: 'Client Names are Required.' })
  required(projectsOffering.country, { message: 'Country are Required.' })
});
