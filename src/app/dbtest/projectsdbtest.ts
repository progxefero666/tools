//src\app\dbtest\projectsdbtest.ts

import { ProjectDef } from "@/app_front/projects/model/projectdef";
import { ServiceFrontProjects } from "@/app_front/projects/services/srvprojects";


const testDb = async () => {
    const srvProjects = new ServiceFrontProjects();
    await srvProjects.init(); // Esperar carga de datos
    const projectDefs: ProjectDef[] = srvProjects.projectDefs;
    console.log(projectDefs); // Ahora tiene datos
    alert("return");
}

const testDb2 = async () => {
    const srvProjects = new ServiceFrontProjects();
    await srvProjects.init(); // Esperar carga de datos
    const projectDefs: ProjectDef[] = srvProjects.projectDefs;
    console.log(projectDefs); // Ahora tiene datos
    alert("return");
}   