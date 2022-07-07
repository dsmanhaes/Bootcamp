import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

interface Link {
    href: string;
    rel: string;
    type: string;
}

@Entity('participators')
export class Participator {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('datetime')
    birthDate: Date;

    @Column({
        type: "enum",
        enum: ["Presencial", "EAD"]
    })
    courseType: string;

    @Column({
        type: "enum",
        enum: ["Manhã", "Tarde", "Noite"],
        nullable: true
    })
    period: string;

    @Column('timestamp')
    registrationDate: Date;

    links: Link[];
}
