import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Family, FamilyDocument } from '../families/schema/family.schema';
import {
  MurderMethod,
  MurderMethodDocument,
} from '../murder-methods/schemas/murder-method.schema';
import { Victim, VictimDocument } from '../victims/schema/victim.schema';
import {
  CaseFile,
  CaseFileDocument,
  CaseStatus,
} from '../cases/schema/case-file.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Family.name) private families: Model<FamilyDocument>,
    @InjectModel(MurderMethod.name)
    private methods: Model<MurderMethodDocument>,
    @InjectModel(Victim.name) private victims: Model<VictimDocument>,
    @InjectModel(CaseFile.name) private cases: Model<CaseFileDocument>,
  ) {}

  async run() {
    await Promise.all([
      this.families.deleteMany({}),
      this.methods.deleteMany({}),
      this.victims.deleteMany({}),
      this.cases.deleteMany({}),
    ]);

    // Families
    const [calles, bonet, garzon] = await this.families.create([
      {
        name: 'Calles',
        description: 'Linaje antiguo, símbolo de opulencia.',
        city: 'Las Caris',
      },
      {
        name: 'Bonet',
        description: 'Familia con negocios navieros.',
        city: 'Las Caris',
      },
      {
        name: 'Garzón',
        description: 'Magnates del sector minero.',
        city: 'Las Caris',
      },
    ]);

    // Murder Methods
    const [hangGold, drownGold, yachtPoison] = await this.methods.create([
      {
        name: 'Ahorcamiento con cuerdas doradas',
        description: 'Víctima colgada con cuerdas doradas.',
        symbolism: 'El lujo que estrangula.',
      },
      {
        name: 'Ahogamiento en bañera con monedas de oro',
        description: 'Sumergida entre monedas relucientes.',
        symbolism: 'La riqueza que consume.',
      },
      {
        name: 'Envenenamiento en yate de lujo',
        description: 'Toxinas administradas durante una velada.',
        symbolism: 'Paraíso falso, muerte silenciosa.',
      },
    ]);

    // Case 1
    const case1 = await this.cases.create({
      title: 'El cuarto de estudio de Mariana Calle',
      description: 'Mariana aparece colgada con cuerdas doradas.',
      location: 'Mansión Calle, Las Caris',
      date: new Date('2025-08-10'),
      status: CaseStatus.INVESTIGATING,
      families: [calles._id],
      murderMethod: hangGold._id,
      investigatorName: 'Clara Rolín',
      clues: [
        'Cintas doradas nuevas',
        'Carta encriptada',
        'Cámara apuntando al reloj',
      ],
    });
    const v1 = await this.victims.create({
      firstName: 'Mariana',
      lastName: 'Calle',
      family: calles._id,
      case: case1._id,
      mannerOfDeath: hangGold._id,
      occupation: 'Filántropa',
      bodyDiscoveryDetails: 'Hallada en estudio; cuerdas doradas al techo.',
      dateOfDeath: new Date('2025-08-10T02:13:00Z'),
    });

    // Case 2
    const case2 = await this.cases.create({
      title: 'Bañera de oro en el ático Garzón',
      description:
        'Andrenina aparece ahogada en una bañera con monedas de oro.',
      location: 'Penthouse Garzón, Las Caris',
      date: new Date('2025-08-12'),
      status: CaseStatus.INVESTIGATING,
      families: [garzon._id],
      murderMethod: drownGold._id,
      investigatorName: 'Clara Rolín',
      clues: ['Monedas 24k', 'Aroma a almendras', 'Huella parcial en grifo'],
    });
    const v2 = await this.victims.create({
      firstName: 'Andrenina',
      lastName: 'Garzón',
      family: garzon._id,
      case: case2._id,
      mannerOfDeath: drownGold._id,
      occupation: 'Heredera minera',
      bodyDiscoveryDetails: 'Sumergida por completo; bañera desbordada.',
      dateOfDeath: new Date('2025-08-12T23:41:00Z'),
    });

    // Case 3
    const case3 = await this.cases.create({
      title: 'Sombras en la Laguna Cuba',
      description: 'Miembro Bonet muere en yate; toxinas detectadas.',
      location: 'Laguna Cuba',
      date: new Date('2025-08-14'),
      status: CaseStatus.OPEN,
      families: [bonet._id],
      murderMethod: yachtPoison._id,
      investigatorName: 'Clara Rolín',
      clues: ['Vaso con residuo', 'Tarjeta con eclipse dibujado'],
    });
    const v3 = await this.victims.create({
      firstName: 'Hernando',
      lastName: 'Bonet',
      family: bonet._id,
      case: case3._id,
      mannerOfDeath: yachtPoison._id,
      occupation: 'Empresario naviero',
      bodyDiscoveryDetails: 'Desplomado en cubierta; espuma ligera en labios.',
      dateOfDeath: new Date('2025-08-14T04:20:00Z'),
    });

    // Vincula víctimas en cada caso
    await this.cases.updateOne(
      { _id: case1._id },
      { $set: { victims: [v1._id] } },
    );
    await this.cases.updateOne(
      { _id: case2._id },
      { $set: { victims: [v2._id] } },
    );
    await this.cases.updateOne(
      { _id: case3._id },
      { $set: { victims: [v3._id] } },
    );

    return {
      families: 3,
      methods: 3,
      victims: 3,
      cases: 3,
      message: 'Seed completado',
    };
  }
}