import { dataSource } from "../database/DataSource";
import { Participator } from "../models/Participator";
import { AppError } from "../errors/AppError";

interface Request {
    name: string,
    birthDate: Date;
    courseType: string;
    period?: string;
}

class CreateParticipatorService {
    public async execute({ name, birthDate, courseType, period = '' }: Request) {
        const participatorsRepository = dataSource.getRepository(Participator);
        const minBirthDate = new Date();

        minBirthDate.setFullYear(minBirthDate.getFullYear() - 18);

        if (birthDate.getTime() > minBirthDate.getTime()) {
            throw new AppError("Participator is not of age.", 403);
        }

        if (courseType == 'Presencial' && !period) {
            throw new AppError("Studying in person must define a Period.", 400);
        }

        const participator = participatorsRepository.create({
            name,
            birthDate,
            courseType,
            period,
            registrationDate: new Date()
        });

        await participatorsRepository.save(participator);

        return participator;
    }
}

export default CreateParticipatorService;
