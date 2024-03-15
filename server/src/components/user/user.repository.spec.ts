import { User } from '@YoSoloPersona/yo-shop-model';

// locals
import { orm } from '../../db';
import { UserRepository } from '../../db/sequalize/user/user.repository';

describe('#components user.repository', () => {
    // root
    const root: User = {
        email: 'yo.solo.persona@gmail.com',
        password: '1234',
        role: 'root'
    };

    // admin
    const admin: User = {
        email: 'admin@mail.ru',
        password: '1234',
        role: 'admin'
    };

    // user
    const user1: User = {
        email: 'user1@mail.ru',
        password: '1234',
        role: 'user'
    };

    let userRepository: UserRepository;

    beforeAll(async () => {
        await orm.init();
        userRepository = orm.createRepositoryUser();
    });

    it('create read update delete', async () => {
        // Arrange

        // Act
        const createdUser = await userRepository.create(user1); // create
        const findedUser = await userRepository.readById(createdUser.id ?? -1); // read
        const affectedCount = await userRepository.update(
            createdUser.id ?? -1,
            { email: 'user1New@mail.ru' }
        ); // update
        const deletedCount = await userRepository.deleteById(
            createdUser.id ?? -1
        ); // delete

        // Assert
        expect(createdUser).toBeDefined();
        expect(createdUser.id).toBeGreaterThan(0);
        expect(findedUser).toEqual(jasmine.objectContaining(createdUser));
        expect(affectedCount).toEqual(1);
        expect(deletedCount).toEqual(1);
    });

    it('create empty user', async () => {
        await expectAsync(userRepository.create({
            email: '',
            role: 'root',
            password: ''
        })).toBeRejected();
    });

    it('read non-existent user', async () => {
        const findedUser = await userRepository.readByEmail('non.existent.email@mail.ru');

        expect(findedUser).toBeUndefined();
    })
});
