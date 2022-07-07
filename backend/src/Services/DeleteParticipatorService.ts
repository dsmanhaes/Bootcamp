import { dataSource } from "../database/DataSource";
import { Participator } from "../models/Participator";
import { AppError } from "../errors/AppError";

interface Request {
    id: string
}

class DeleteParticipatorService {
    public async execute({ id }: Request) {
        const participatorsRepository = dataSource.getRepository(Participator);
        const participator = await participatorsRepository.findOne({
            where: { id: id }
        });

        if (!participator) {
            throw new AppError("Participator not found.", 400);
        }

        await participatorsRepository.delete({ id: participator.id });
    }
}

export default DeleteParticipatorService;
