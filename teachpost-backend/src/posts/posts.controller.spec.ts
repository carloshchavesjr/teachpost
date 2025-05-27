import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            findAll: jest.fn(() => Promise.resolve([])),
            findOne: jest.fn(() => Promise.resolve(null)),
            create: jest.fn(() => Promise.resolve({})),
            update: jest.fn(() => Promise.resolve({})),
            delete: jest.fn(() => Promise.resolve({})),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      await expect(controller.findAll()).resolves.toEqual([]);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
