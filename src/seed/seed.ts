import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeedService);
  const result = await seeder.run();
  console.log('✅', result);
  await app.close();
}
run().catch((e) => {
  console.error('❌ Seed error', e);
  process.exit(1);
});
