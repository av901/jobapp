import {createConnection, DataSource, In} from "typeorm";
import {mysqlConnectionConfig} from './ormconfig';
import express from "express"
import cors from "cors"
import { Request, Response } from "express"
import {Job, User, Skill} from './entity';

const app: express.Application = express();
app.use(express.json());
app.use(cors());
let connection: DataSource;
createConnection(mysqlConnectionConfig).then(
	(conn: DataSource) => {
		console.log("connected to mysql");
		connection = conn;
	},
	(error: Object) => {
		console.log("Error : could not connect to mysql");
		console.log(error);
	}
);


app.get("/jobs/all", function (req: Request, res: Response) {
    console.log("all job request");
    let jobRepo = connection.manager.getRepository(Job);
	jobRepo.find({relations: {required_skills: true}}).then(
		(data: Job[]) => {
			res.json(data);
		},
		(error: Object) => {
			res.json({"error": error})
		}
	);
})

app.get("/users/:id", function (req: Request, res: Response) {
    console.log("user request");
    let userRepo = connection.manager.getRepository(User);
	userRepo.find({relations: {user_skills: true, applied_jobs: true}}).then(
		(data: User[]) => {
			res.json(data);
		},
		(error: Object) => {
			res.json({"error": error})
		}
	);
})

app.post("/apply", function (req: Request, res: Response) {
    console.log("job apply request");
	let reqData = req.body;
	console.log(reqData);
	let userId: number = reqData.user_id;
	let jobIds: number[] = reqData.job_ids;
    let userRepo = connection.manager.getRepository(User);
	userRepo.find({relations: {applied_jobs: true}, where: {id: userId}}).then(
		(users: User[]) => {
			if(users) {
				let jobRepo = connection.manager.getRepository(Job);
				jobRepo.find({where: {id: In(jobIds)}}).then(
					(jobs: Job[]) => {
					    users[0].applied_jobs = [...users[0].applied_jobs, ...jobs];
						userRepo.save(users[0]);
						res.json({"success": true});
					},
					(error: Object) => {
						res.json({"error": error})
					}
				);
			}else{
				res.json({"success": false, "error": "Internal Server Error"});
			}
		},
		(error: Object) => {
			res.json({"error": error})
		}
	);
})

app.listen(8009);