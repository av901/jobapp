import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm"
import {Job} from './Job'
import {Skill} from './Skill'

@Entity({name:"user", synchronize: true})
export class User {

    @PrimaryGeneratedColumn()
    id: number
	
	@ManyToMany(() => Job)
    @JoinTable()
    applied_jobs: Job[]
	
	@ManyToMany(() => Skill)
    @JoinTable()
    user_skills: Skill[]

    @Column({name: "first_name"})
    firstName: string

    @Column({name: "last_name"})
    lastName: string
	
	@Column({name: "email"})
    email: string
	
	
}