import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRatingModule } from './car-rating/car-rating.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    CarModule,
    CarRatingModule,
    CommonModule,
  ],
})
export class AppModule {}
