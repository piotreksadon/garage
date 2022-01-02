import { Test, TestingModule } from '@nestjs/testing';
import { CarRatingService } from './car-rating.service';

describe('CarRatingService', () => {
  let service: CarRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarRatingService],
    }).compile();

    service = module.get<CarRatingService>(CarRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
