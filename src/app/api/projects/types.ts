//src\app\api\projects\types.ts

import { ProjectDef } from "../../../app_front/projects/model/projectdef"


//Only queries GET)
export type ProjectDefQuery = {
    id?: number
    fname?: string
    fdescription?: string
}
export type ProjectDefFilter = Partial<ProjectDef>