import { Component,Output, OnInit} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {Project} from "./Project"


@Component({
    selector : 'app-project',
    templateUrl: './project.component.html'
})
@Injectable()
export class ProjectComponent {

    newProjectName: string = '';
    projects: Project[] = [];
    private serviceEndPoint = 'http://localhost:3000/projects';
   

    constructor(private httpClient : HttpClient) {

     }
    
    onAddNewClick(newProject:any) {
        this .createNew(this.newProjectName)
            .subscribe(newProject => this.newProjectName);
            this.projects.push(newProject);
     }

    createNew(projectName: string): Observable<Project> {
        const newProject = {
            id: 0,
            name: projectName,            
        };
        return this.save(newProject); 
    }

    onNewProjectCreated(newProject : Project){
        this.projects = [...this.projects, newProject];
    }
    
    getAll() : Observable<Project[]>{
        return this.httpClient
            .get<Project[]>(this.serviceEndPoint);
    }
    
    save(projectData : Project) : Observable<Project>{
        if (projectData.id === 0){
            return this.httpClient
                .post<Project>(this.serviceEndPoint, projectData);
        } else {
            return this.httpClient
                .put<Project>(`${this.serviceEndPoint}/${projectData.id}`, projectData);
        }
    }

    
 }