import { Test, TestingModule } from '@nestjs/testing';
import { ClangdGateway } from './clangd.gateway';

describe('ClangdGateway', () => {
  let gateway: ClangdGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClangdGateway],
    }).compile();

    gateway = module.get<ClangdGateway>(ClangdGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
