import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userRepositoryMock } from '../testing/mocks/users-mocks/users-repository.mock';
import { createUserMock } from '../testing/mocks/users-mocks/create-user.mock';
import { usersListMock } from '../testing/mocks/users-mocks/users-list.mock';
import { updateUserMock } from '../testing/mocks/users-mocks/update-user.mock';
import { userProfileMock } from '../testing/mocks/users-mocks/user-profile.mock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return an user', async () => {

      const result = await service.create(createUserMock)

      expect(result).toEqual(usersListMock[0])
    })
  })

  describe('Read', () => {

    describe('findAll', () => {
      it('Should return a list of users', async () => {
        const result = await service.findAll()

        expect(result).toEqual(usersListMock)
      })
    })

    describe('findById', () => {
      it('Should return an user', async () => {
        const result = await service.findById(usersListMock[0].id)

        expect(result).toEqual(usersListMock[0])
      })

      // it('Should return an error if the user is not found', async () => {

      //   (userRepositoryMock.useValue.findOneBy as jest.Mock).mockResolvedValue(null);

      //   const result = await service.findById('1234abcd-a01b-1234-5678-1ab2c34d56e7')

      //   expect(result).toThrow(HttpException)
      // })
    })

    describe('findProfile', () => {
      it('Should return an user profile', async () => {
        const result = await service.findProfile(usersListMock[0].id)

        expect(result).toEqual(userProfileMock)
      })
    })
  })


  describe('Update', () => {
    describe('update', () => {
      it('should update and return an user', async () => {

        (userRepositoryMock.useValue.findOneBy as jest.Mock).mockResolvedValue({ ...usersListMock[0], ...updateUserMock });

        const result = await service.update(usersListMock[0].id, updateUserMock)

        expect(result).toEqual({ ...usersListMock[0], ...updateUserMock })
      })
    })
  })

  describe('Delete', () => {
    describe('softDelete', () => {
      it('should inactivate and return an user', async () => {

        (userRepositoryMock.useValue.update as jest.Mock).mockResolvedValue({ ...usersListMock[0], isActive: false });
        (userRepositoryMock.useValue.findOneBy as jest.Mock).mockResolvedValue({ ...usersListMock[0], isActive: false });

        const result = await service.softDelete(usersListMock[0].id)

        expect(result).toEqual({ ...usersListMock[0], isActive: false })

      })
    })
  })

});
