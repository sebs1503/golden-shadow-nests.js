import { Module } from '@nestjs/common';
import { FamiliesModule } from '../families/families.module';
import { MurderMethodsModule } from '../murder-methods/murder-methods.module';
import { VictimsModule } from '../victims/victims.module';
import { CasesModule } from '../cases/cases.module';
import { SeedService } from './seed.service';

@Module({
  imports: [FamiliesModule, MurderMethodsModule, VictimsModule, CasesModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}