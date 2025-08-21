import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { FamiliesModule } from './families/families.module';
import { MurderMethodsModule } from './murder-methods/murder-methods.module';
import { VictimsModule } from './victims/victims.module';
import { CasesModule } from './cases/cases.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>('MONGO_URI'),
        dbName: cfg.get<string>('DB_NAME') || 'golden_shadows',
      }),
      inject: [ConfigService],
    }),
    FamiliesModule,
    MurderMethodsModule,
    VictimsModule,
    CasesModule,
    SeedModule,
  ],
})
export class AppModule {}