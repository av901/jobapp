import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:"skill", synchronize: true})
export class Skill {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name:  "skill_name"})
    skillName: string
}