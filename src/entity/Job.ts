import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {Skill} from './Skill';

@Entity({name:"job", synchronize: true})
export class Job {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:"title"})
    title: string;
	
	@ManyToMany(() => Skill)
    @JoinTable()
    required_skills: Skill[]
	
	@Column({name:"min_qualification"})
	min_qualification: string;

    @Column({name:"min_year_exp"})
    min_year_exp: number;

    @Column({name:"max_year_exp"})
    max_year_exp: number;
	
	@Column({name:"min_salary"})
    min_salary: number;

    @Column({name:"max_salary"})
    max_salary: number;
	
	@Column({name:"join_within_days"})
	join_within_days: number;
	
	@Column({name: "job_description"})
	job_description: string;

}
