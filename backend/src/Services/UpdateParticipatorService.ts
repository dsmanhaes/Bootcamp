import { dataSource } from "../database/DataSource";
import { Participator } from "../models/Participator";
import { AppError } from "../errors/AppError";

interface Request {
    id: string;
    name: string;
    birthDate: Date;
    courseType: string;
    period: string;
}

class UpdateParticipatorService {
    public async execute({ id, name, birthDate, courseType, period = '' }: Request) {
        const participatorsRepository = dataSource.getRepository(Participator);
        const participator = await participatorsRepository.findOne({
            where: { id: id }
        });

        if (!participator) {
            throw new AppError("Participator not found.", 400);
        }

        participator.name = name;
        participator.birthDate = birthDate;
        participator.courseType = courseType;
        participator.period = period;
        
        await participatorsRepository.save(participator);

        return participator;
    }
}

export default UpdateParticipatorService;
